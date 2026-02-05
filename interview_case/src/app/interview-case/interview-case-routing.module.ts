import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PipesComponentComponent } from './pipes-component/pipes-component.component';
import { ReactiveFormsComponent } from './reactive-forms/reactive-forms.component';

const routes: Routes = [
  {
    path: 'pipe',
    component: PipesComponentComponent,
  },
  {
    path: 'reactive-forms',
    component: ReactiveFormsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterviewCaseRoutingModule {}
