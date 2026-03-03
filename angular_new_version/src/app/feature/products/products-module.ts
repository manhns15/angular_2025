import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProductsRoutingModule } from './products-routing-module';
import { ProductsList } from './pages/products-list/products-list';
import { ProductsDetail } from './pages/products-detail/products-detail';
import { ProductsForms } from './pages/products-forms/products-forms';
import { ProductsStore } from '../store/products.store';

@NgModule({
  declarations: [ProductsList, ProductsDetail, ProductsForms],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ProductsRoutingModule],
  // Store đăng ký ở module level → tồn tại suốt vòng đời module
  // Không bị destroy khi navigate giữa các route trong module
  providers: [ProductsStore],
})
export class ProductsModule {}
