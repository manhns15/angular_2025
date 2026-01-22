import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailPageComponent } from './pages/post-detail-page/post-detail-page.component';
import { authGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  { path: ':id', component: PostDetailPageComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
