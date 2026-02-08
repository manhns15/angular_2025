import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PipesComponentComponent } from './pipes-component/pipes-component.component';
import { ReactiveFormsComponent } from './reactive-forms/reactive-forms.component';
import { ShareReplayComponent } from './share-replay/share-replay.component';
import { LoginComponent } from './login/login.component';
import { ProtectedComponent } from './protected/protected.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { AdminGuard } from './guards/admin/admin.guard';
import { UnsavedChangesGuard } from './guards/unsaved-changes/unsaved-changes.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'pipe',
    component: PipesComponentComponent,
  },
  {
    path: 'reactive-forms',
    component: ReactiveFormsComponent,
    canDeactivate: [UnsavedChangesGuard], // CanDeactivate Guard
  },
  {
    path: 'share-replay',
    component: ShareReplayComponent,
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [AuthGuard], // CanActivate Guard
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard], // Phải đăng nhập
    canActivateChild: [AdminGuard], // CanActivateChild Guard cho child routes
    children: [
      {
        path: 'users',
        component: ShareReplayComponent, // Tái sử dụng component
      },
      {
        path: 'settings',
        component: PipesComponentComponent, // Tái sử dụng component
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterviewCaseRoutingModule {}
