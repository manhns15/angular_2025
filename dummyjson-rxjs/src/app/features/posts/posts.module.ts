import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostDetailPageComponent } from './pages/post-detail-page/post-detail-page.component';
import { ShareModule } from 'src/app/share/share.module';

@NgModule({
  declarations: [PostDetailPageComponent],
  imports: [CommonModule, PostsRoutingModule, ShareModule],
})
export class PostsModule {}
