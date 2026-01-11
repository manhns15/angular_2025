import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { Post } from 'src/app/core/models/post.model';
import { DummyjsonApiService } from 'src/app/core/services/dummyjson-api.service';

@Injectable({
  providedIn: 'root',
})
export class FeedStoreService {
  constructor(private dummyjsonApiService: DummyjsonApiService) {}

  private readonly feedsSubject = new BehaviorSubject<Post[]>([]);
  private readonly totalSubject = new BehaviorSubject<number>(0);
  private readonly pageSubject = new BehaviorSubject<number>(1);
  private readonly pageSizeSubject = new BehaviorSubject<number>(6);
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);

  readonly $feeds = this.feedsSubject.asObservable();
  readonly $total = this.totalSubject.asObservable();
  readonly $page = this.pageSubject.asObservable();
  readonly $pageSize = this.pageSizeSubject.asObservable();
  readonly $loading = this.loadingSubject.asObservable();

  loadPage(page: number): void {
    const pageSize = this.pageSizeSubject.getValue();
    const skip = (page - 1) * pageSize;

    this.loadingSubject.next(true);

    this.dummyjsonApiService
      .getPostsPaged(pageSize, skip)
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe({
        next: (feeds) => {
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
