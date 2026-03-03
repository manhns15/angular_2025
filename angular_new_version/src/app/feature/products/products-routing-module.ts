import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsList } from './pages/products-list/products-list';
import { ProductsDetail } from './pages/products-detail/products-detail';
import { ProductsForms } from './pages/products-forms/products-forms';

const routes: Routes = [
  { path: '', component: ProductsList }, // GET all
  { path: 'create', component: ProductsForms }, // POST
  { path: ':id', component: ProductsDetail }, // GET by id
  { path: ':id/edit', component: ProductsForms }, // PUT
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
