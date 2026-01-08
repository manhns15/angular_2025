import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductStoreService } from '../../data-access/product.store.service';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss'],
})
export class ProductListPageComponent implements OnInit {
  readonly products$ = this.productStore.products$;
  readonly loading$ = this.productStore.loading$;
  readonly error$ = this.productStore.error$;

  constructor(
    private readonly productStore: ProductStoreService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.productStore.loadProducts();
  }

  deleteProduct(id: number): void {
    if (!confirm('Ban chac chan muon xoa san pham nay?')) {
      return;
    }

    this.productStore.deleteProduct(id);
  }

  editProduct(id: number): void {
    this.router.navigate(['/products', id, 'edit']);
  }
}
