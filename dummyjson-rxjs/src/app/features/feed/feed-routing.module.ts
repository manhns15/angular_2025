import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedPageComponent } from './pages/feed-page/feed-page.component';
import { authGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: FeedPageComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedRoutingModule {}
