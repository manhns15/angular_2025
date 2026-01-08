import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListPageComponent } from './product-list-page/product-list-page.component';
import { ProductCreatePageComponent } from './product-create-page/product-create-page.component';
import { ProductUpdatePageComponent } from './product-update-page/product-update-page.component';

const routes: Routes = [
  { path: '', component: ProductListPageComponent },
  { path: 'create', component: ProductCreatePageComponent },
  { path: ':id/edit', component: ProductUpdatePageComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
