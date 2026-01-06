import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateDrivenFormRoutingModule } from './template-driven-form-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { ProductsFormComponent } from './products-form/products-form.component';
import { ForbiddenNameDirective } from '../forbidden-name.directive';
import { GroupFormComponent } from './group-form/group-form.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    ProductsFormComponent,
    ForbiddenNameDirective,
    GroupFormComponent,
  ],
  imports: [CommonModule, TemplateDrivenFormRoutingModule, FormsModule],
})
export class TemplateDrivenFormModule {}
