import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, forkJoin, map, of, switchMap } from 'rxjs';
import { Post } from 'src/app/core/models/post.model';
import { User } from 'src/app/core/models/user.model';
import { DummyjsonApiService } from 'src/app/core/services/dummyjson-api.service';

interface FeedPost extends Post {
  user?: User;
}

@Injectable({
  providedIn: 'root',
})
export class FeedStoreService {
  constructor(private dummyjsonApiService: DummyjsonApiService) {}

  private readonly feedsSubject = new BehaviorSubject<FeedPost[]>([]);
  private readonly totalSubject = new BehaviorSubject<number>(0);
  private readonly pageSubject = new BehaviorSubject<number>(1);
  private readonly pageSizeSubject = new BehaviorSubject<number>(6);
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  private readonly userSubject = new BehaviorSubject<string>('');

  readonly $feeds = this.feedsSubject.asObservable();
  readonly $total = this.totalSubject.asObservable();
  readonly $page = this.pageSubject.asObservable();
  readonly $pageSize = this.pageSizeSubject.asObservable();
  readonly $loading = this.loadingSubject.asObservable();
  readonly $user = this.userSubject.asObservable();

  loadPage(page: number): void {
    // Tính tham số phân trang
    const pageSize = this.pageSizeSubject.getValue();
    const skip = (page - 1) * pageSize;

    // Bật trạng thái loading trước khi gọi API
    this.loadingSubject.next(true);

    this.dummyjsonApiService
      .getPostsPaged(pageSize, skip)
      .pipe(
        switchMap((feeds) => {
          // switchMap: nhận feeds, rồi chuyển sang luồng gọi users
          // Khi đổi trang nhanh, switchMap sẽ hủy luồng cũ và chỉ giữ luồng mới nhất
          // Lấy danh sách userId duy nhất để tránh gọi trùng
          const userIds = Array.from(
            new Set(feeds.posts.map((post) => post.userId))
          );

          if (userIds.length === 0) {
            // Không có userId thì trả luôn feeds
            return of({ feeds, users: [] });
          }

          // Gọi API user song song theo từng userId
          // forkJoin: chạy tất cả request user song song và đợi tất cả xong mới emit
          return forkJoin(
            userIds.map((userId) => this.dummyjsonApiService.getUser(userId))
          ).pipe(map((users) => ({ feeds, users })));
        }),
        map(({ feeds, users }) => {
          // Tạo map để gắn nhanh user vào từng post
          // reduce: duyệt users và xây Map theo dạng id -> user
          const userMap = users.reduce(
            (map, user) => map.set(user.id, user),
            new Map<number, User>()
          );

          // Gắn user tương ứng vào mỗi post
          const posts = feeds.posts.map((post) => ({
            ...post,
            user: userMap.get(post.userId),
          }));
          return { ...feeds, posts };
        }),
        // Tắt loading khi hoàn tất hoặc lỗi
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe({
        next: (feeds) => {
          // Cập nhật state cho UI
          this.feedsSubject.next(feeds.posts);
          this.totalSubject.next(feeds.total);
          this.pageSubject.next(page);
        },
        error: (err) => {
          console.log('error', err);
        },
      });
  }
}
