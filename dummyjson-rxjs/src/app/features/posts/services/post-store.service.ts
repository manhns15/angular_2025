import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, switchMap } from 'rxjs';
import { Comment } from 'src/app/core/models/comment.model';
import { Post } from 'src/app/core/models/post.model';
import { User } from 'src/app/core/models/user.model';
import { DummyjsonApiService } from 'src/app/core/services/dummyjson-api.service';

interface PostDetailState {
  post: Post;
  user: User;
  comments: Comment[];
}

@Injectable({
  providedIn: 'root',
})
export class PostStoreService {
  private readonly postDetailSubject =
    new BehaviorSubject<PostDetailState | null>(null);

  readonly $postDetail = this.postDetailSubject.asObservable();
  constructor(private dummyjsonApiService: DummyjsonApiService) {}

  loadPostDetail(postId: number): void {
    const timeLabel = `post:detail:${postId}`;
    console.time(timeLabel);
    // B1: Gọi API lấy post detail theo id từ URL
    this.dummyjsonApiService
      .getPostById(postId)
      .pipe(
        switchMap((post) =>
          // B2: Sau khi có post, gọi song song:
          // - getUser theo userId của post
          // - getPostComments theo postId
          forkJoin({
            user: this.dummyjsonApiService.getUser(post.userId),
            comments: this.dummyjsonApiService.getPostComments(post.id),
          }).pipe(
            // B3: Gộp dữ liệu thành một object thống nhất để UI dùng
            map(({ user, comments }) => ({
              post,
              user,
              comments: comments.comments,
            }))
          )
        )
      )
      .subscribe({
        next: (detail) => {
          // B4: Cập nhật state tổng hợp cho trang detail
          // UI chỉ cần subscribe $postDetail là đủ
          this.postDetailSubject.next(detail);
          console.timeEnd(timeLabel);
        },
        error: (error) => {
          console.error('Failed to load post detail', error);
          console.timeEnd(timeLabel);
        },
      });
  }
  addComment(postId: number, userId: number, body: string): void {
    const current = this.postDetailSubject.getValue();
    if (!current) {
      return;
    }

    this.dummyjsonApiService
      .postComment(postId, userId, body)
      .subscribe((comment) => {
        this.postDetailSubject.next({
          ...current,
          comments: [comment, ...current.comments],
        });
        console.log('comment', current.comments);
      });
  }
}
