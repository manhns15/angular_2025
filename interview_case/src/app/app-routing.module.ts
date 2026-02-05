import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'interview-case',
    pathMatch: 'full',
  },
  {
    path: 'interview-case',
    loadChildren: () =>
      import('./interview-case/interview-case.module').then(
        (m) => m.InterviewCaseModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
