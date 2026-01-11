import { FeedStoreService } from '../../services/feed-store.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss'],
  standalone: false,
})
export class FeedPageComponent implements OnInit {
  constructor(private feedStoreService: FeedStoreService) {}
  readonly posts = this.feedStoreService.$feeds;
  readonly total = this.feedStoreService.$total;
  readonly page = this.feedStoreService.$page;
  readonly pageSize = this.feedStoreService.$pageSize;

  ngOnInit(): void {
    this.feedStoreService.loadPage(1);
  }

  handlePageChange(nextPage: number): void {
    this.feedStoreService.loadPage(nextPage);
  }
}
