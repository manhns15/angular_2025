import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssTempDrivenFormComponent } from './ass-temp-driven-form.component';

const routes: Routes = [
  { path: 'users', component: AssTempDrivenFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssTempDrivenFormRoutingModule {}
