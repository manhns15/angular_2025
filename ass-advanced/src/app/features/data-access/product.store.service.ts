import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { Product, ProductCreate, ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class ProductStoreService {
  private readonly productsSubject = new BehaviorSubject<Product[]>([]);
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  private readonly errorSubject = new BehaviorSubject<string | null>(null);

  readonly products$ = this.productsSubject.asObservable();
  readonly loading$ = this.loadingSubject.asObservable();
  readonly error$ = this.errorSubject.asObservable();

  constructor(private readonly productsService: ProductsService) {}

  loadProducts(): void {
    this.setLoading(true);
    this.productsService
      .getProducts()
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe({
        next: (products) => {
          this.productsSubject.next(products);
          this.setError(null);
        },
        error: (error) => this.setError(this.getErrorMessage(error)),
      });
  }

  createProduct(payload: ProductCreate): void {
    if (this.loadingSubject.value) {
      return;
    }
    this.setLoading(true);
    this.productsService
      .createProduct(payload)
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe({
        next: (created) => {
          const products = [...this.productsSubject.value];
          const existingIndex = products.findIndex(
            (product) => product.id === created.id
          );

          if (existingIndex >= 0) {
            products[existingIndex] = created;
          } else {
            products.push(created);
          }

          this.productsSubject.next(products);
          this.setError(null);
        },
        error: (error) => this.setError(this.getErrorMessage(error)),
      });
  }

  updateProduct(id: number, payload: Partial<ProductCreate>): void {
    this.setLoading(true);
    this.productsService
      .updateProduct(id, payload)
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe({
        next: (updated) => {
          const products = this.productsSubject.value.map((product) =>
            product.id === id ? updated : product
          );
          this.productsSubject.next(products);
          this.setError(null);
        },
        error: (error) => this.setError(this.getErrorMessage(error)),
      });
  }

  deleteProduct(id: number): void {
    this.setLoading(true);
    this.productsService
      .deleteProduct(id)
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe({
        next: () => {
          const products = this.productsSubject.value.filter(
            (product) => product.id !== id
          );
          this.productsSubject.next(products);
          this.setError(null);
        },
        error: (error) => this.setError(this.getErrorMessage(error)),
      });
  }

  private setLoading(isLoading: boolean): void {
    this.loadingSubject.next(isLoading);
  }

  private setError(message: string | null): void {
    this.errorSubject.next(message);
  }

  private getErrorMessage(error: unknown): string {
    if (error && typeof error === 'object' && 'message' in error) {
      return String(error.message);
    }

    return 'Request failed';
  }
}
