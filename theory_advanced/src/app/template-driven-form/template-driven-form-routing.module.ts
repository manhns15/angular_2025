import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { ProductsFormComponent } from './products-form/products-form.component';
import { GroupFormComponent } from './group-form/group-form.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'product', component: ProductsFormComponent },
  { path: 'gf', component: GroupFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateDrivenFormRoutingModule {}
