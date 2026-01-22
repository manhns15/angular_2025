import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TokenService } from 'src/app/core/services/token.service';
import { PostStoreService } from '../../services/post-store.service';
import { AuthStoreService } from 'src/app/features/auth/services/auth-store.service';
import { LoginResponse } from 'src/app/core/models/login.model';

/* 
  - call api postDetail -> done
  - call api get thông tin user theo userId từ postDetail -> done
  - call api comment theo postId -> done
  - input comment khi đã đăng nhập, nếu chưa đăng nhập sẽ không hiển thị ô nhập comment -> done
  - add comment và edit comment trên giao diện theo user đã đăng nhập
*/
@Component({
  selector: 'app-post-detail-page',
  templateUrl: './post-detail-page.component.html',
  styleUrls: ['./post-detail-page.component.scss'],
  standalone: false,
})
export class PostDetailPageComponent implements OnInit, OnDestroy {
  constructor(
    private postStoreService: PostStoreService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private tokenService: TokenService,
    private authStore: AuthStoreService
  ) {}

  // Stream dữ liệu post detail từ store (UI dùng async pipe để render)
  readonly postDetail = this.postStoreService.$postDetail;

  // Subject dùng để hủy subscription khi component bị destroy (tránh memory leak)
  private readonly destroy$ = new Subject<void>();

  // Form nhập comment mới, có validate để tránh gửi rỗng hoặc quá dài
  commentForm = this.fb.group({
    body: ['', [Validators.required, Validators.maxLength(500)]],
  });

  currentUser: LoginResponse | null = null;
  // Lưu postId hiện tại để dùng khi submit comment
  currentPostId: number | null = null;

  // Check đăng nhập nhanh bằng token (không phụ thuộc store nên không mất khi refresh)
  get isLoggedIn(): boolean {
    return this.tokenService.isLoggedIn();
  }

  ngOnInit(): void {
    // Lắng nghe user đang đăng nhập để lấy userId khi thêm comment
    this.authStore.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.currentUser = user;
      console.log('Current user in PostDetailPage:', user);
    });

    // Lấy postId từ URL (paramMap) và gọi store load dữ liệu detail
    // takeUntil để auto unsubscribe khi component bị destroy
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      // id có thể null => Number(null) = 0, nên cần đảm bảo route có id hợp lệ
      const postId = Number(params.get('id'));
      this.currentPostId = postId;
      this.postStoreService.loadPostDetail(postId);
    });
  }

  ngOnDestroy(): void {
    // Hủy tất cả subscription đang lắng nghe
    this.destroy$.next();
    this.destroy$.complete();
  }
  onSubmitComment(): void {
    if (this.commentForm.invalid || !this.currentUser || !this.currentPostId) {
      return;
    }

    const body = this.commentForm.getRawValue().body?.trim();
    if (!body) {
      return;
    }

    // Lấy userId từ user đang đăng nhập và gọi store add comment
    this.postStoreService.addComment(
      this.currentPostId,
      this.currentUser.id,
      body
    );
    this.commentForm.reset();
  }
}
