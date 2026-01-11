import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { FeedPageComponent } from './pages/feed-page/feed-page.component';
import { ShareModule } from 'src/app/share/share.module';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@NgModule({
  declarations: [FeedPageComponent],
  imports: [CommonModule, FeedRoutingModule, ShareModule, NzPaginationModule],
})
export class FeedModule {}
