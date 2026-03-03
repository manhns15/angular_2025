import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../../../core/models/products.model';
import { ProductsStore } from '../../../store/products.store';

@Component({
  selector: 'app-products-list',
  standalone: false,
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
})
export class ProductsList implements OnDestroy {
  private productsStore = inject(ProductsStore);

  loading$ = this.productsStore.loading$;
  error$ = this.productsStore.error$;

  private destroy$ = new Subject<void>();
  products$ = this.productsStore.productsSearch$;

  searchControl = new FormControl('');

  ngOnInit(): void {
    this.productsStore.loadProducts();
    this.searchControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((q) => this.productsStore.searchProducts(q ?? ''));
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
