import { Component, OnInit } from '@angular/core';
import { FeedStoreService } from '../../services/feed-store.service';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss'],
  standalone: false,
})
export class FeedPageComponent implements OnInit {
  readonly posts = this.feedStoreService.$feeds;
  readonly total = this.feedStoreService.$total;
  readonly page = this.feedStoreService.$page;
  readonly pageSize = this.feedStoreService.$pageSize;

  constructor(private feedStoreService: FeedStoreService) {}

  ngOnInit(): void {
    this.feedStoreService.loadPage(1);
  }

  handlePageChange(nextPage: number): void {
    this.feedStoreService.loadPage(nextPage);
  }

  loadUser(userId: number): void {
    this.feedStoreService.loadUser(userId);
  }

  trackByPostId(_: number, post: { id: number }): number {
    return post.id;
  }
}
