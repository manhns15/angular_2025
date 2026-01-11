import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'feed',
    loadChildren: () =>
      import('./features/feed/feed.module').then((m) => m.FeedModule),
  },
  {
    path: 'post',
    loadChildren: () =>
      import('./features/posts/posts.module').then((m) => m.PostsModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./features/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: '',
    redirectTo: 'feed',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
