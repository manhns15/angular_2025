import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResgisterFormComponent } from './resgister-form/resgister-form.component';

const routes: Routes = [
  { path: 'resgister', component: ResgisterFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReactiveFormRoutingModule {}
