import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductListPageComponent } from './product-list-page/product-list-page.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductCreatePageComponent } from './product-create-page/product-create-page.component';
import { ProductUpdatePageComponent } from './product-update-page/product-update-page.component';
import { ProductCardComponent } from './product-card/product-card.component';



@NgModule({
  declarations: [
    ProductListPageComponent,
    ProductCreatePageComponent,
    ProductUpdatePageComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
