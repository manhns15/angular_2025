import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../../../../core/models/products.model';
import { ProductsStore } from '../../../store/products.store';

@Component({
  selector: 'app-products-list',
  standalone: false,
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
})
export class ProductsList implements OnInit, OnDestroy {
  // inject() cho phép dùng service ngay tại field initializer
  // Khác với constructor injection — service đã có sẵn trước khi field được khởi tạo
  private productsStore = inject(ProductsStore);

  // Gán Observable trực tiếp → dùng async pipe trong template
  // Không cần subscribe thủ công → không cần unsubscribe → không lo memory leak
  products$ = this.productsStore.products$;
  loading$ = this.productsStore.loading$;
  error$ = this.productsStore.error$;

  // Vẫn giữ destroy$ nếu cần takeUntil cho các subscription thủ công sau này
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.productsStore.loadProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDelete(id: string): void {
    this.productsStore.deleteProduct(id);
  }

  trackById(_: number, product: Product): string {
    return product.id!;
  }
}
