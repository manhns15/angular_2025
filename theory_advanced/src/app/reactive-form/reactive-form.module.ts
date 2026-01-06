import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormRoutingModule } from './reactive-form-routing.module';
import { ResgisterFormComponent } from './resgister-form/resgister-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ResgisterFormComponent],
  imports: [CommonModule, ReactiveFormRoutingModule, ReactiveFormsModule],
})
export class ReactiveFormModule {}
