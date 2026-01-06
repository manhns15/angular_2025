import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssReactiveFormRoutingModule } from './ass-reactive-form-routing.module';
import { ProductsComponent } from './products/products.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule, AssReactiveFormRoutingModule, ReactiveFormsModule],
})
export class AssReactiveFormModule {}
