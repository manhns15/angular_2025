import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsStore } from '../../../store/products.store';

@Component({
  selector: 'app-products-detail',
  standalone: false,
  templateUrl: './products-detail.html',
  styleUrl: './products-detail.scss',
})
export class ProductsDetail implements OnInit {
  // inject() → nhất quán với ProductsList, không cần constructor
  private productStore = inject(ProductsStore);
  private route = inject(ActivatedRoute);

  // Gán Observable trực tiếp → dùng async pipe trong template
  product$ = this.productStore.product$;
  loading$ = this.productStore.loading$;
  error$ = this.productStore.error$;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('id', id);

    if (id) {
      this.productStore.loadProduct(id);
    }
  }
}
