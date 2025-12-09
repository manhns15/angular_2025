import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnDestroy {
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}
  products: any[] = [];
  isLoading: boolean = false;
  errMsg: string = '';
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts() {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errMsg = 'Đã có lỗi xảy ra: ' + err.message;
        this.isLoading = false;
      },
    });
  }
  submitSearch(value: string) {
    if (!value.trim()) {
      this.loadProducts();
      return;
    }
    this.productService.searchProducts(value).subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errMsg = 'Đã có lỗi xảy ra: ' + err.message;
        this.isLoading = false;
      },
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
