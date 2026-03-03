import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../core/models/products.model';
import { ProductsService } from '../../core/services/products.service';

@Injectable()
export class ProductsStore {
  // ── Private State ──────────────────────────────────────────────────────────
  // BehaviorSubject giữ state nội bộ — bên ngoài KHÔNG được .next() trực tiếp
  private readonly _products = new BehaviorSubject<Product[]>([]);
  private readonly _product = new BehaviorSubject<Product | null>(null);
  private readonly _loading = new BehaviorSubject<boolean>(false);
  private readonly _error = new BehaviorSubject<string>('');

  // ── Public Selectors (read-only) ───────────────────────────────────────────
  // asObservable() ngăn component gọi .next() từ bên ngoài
  readonly products$: Observable<Product[]> = this._products.asObservable();
  readonly product$: Observable<Product | null> = this._product.asObservable();
  readonly loading$: Observable<boolean> = this._loading.asObservable();
  readonly error$: Observable<string> = this._error.asObservable();

  // Derived selector — tính từ state, không cần BehaviorSubject riêng
  readonly totalProducts$: Observable<number> = this._products.pipe(map((list) => list.length));

  constructor(private readonly productService: ProductsService) {}

  // ── Actions ────────────────────────────────────────────────────────────────

  /** Lấy danh sách tất cả sản phẩm từ API */
  loadProducts(): void {
    this._loading.next(true);
    this._error.next('');

    this.productService.getAll().subscribe({
      next: (products) => {
        this._products.next(products);
        this._loading.next(false);
      },
      error: (err) => {
        this._error.next('Không thể tải dữ liệu!');
        this._loading.next(false);
      },
    });
  }

  /** Lấy chi tiết 1 sản phẩm theo id */
  loadProduct(id: string): void {
    this._loading.next(true);
    this._error.next('');
    this._product.next(null); // reset product cũ trước khi load mới

    this.productService.getById(id).subscribe({
      next: (product) => {
        this._product.next(product);
        this._loading.next(false);
      },
      error: () => {
        this._error.next('Không tìm thấy sản phẩm!');
        this._loading.next(false);
      },
    });
  }

  /**
   * Xóa sản phẩm — Chiến lược: RELOAD
   * Sau khi xóa thành công → gọi lại loadProducts() để đồng bộ với server.
   */
  deleteProduct(id: string): void {
    this._loading.next(true);

    this.productService.delete(id).subscribe({
      next: () => this.loadProducts(),
      error: () => {
        this._error.next('Xóa thất bại, vui lòng thử lại!');
        this._loading.next(false);
      },
    });
  }

  /**
   * Xóa sản phẩm — Chiến lược: OPTIMISTIC UPDATE
   * Cập nhật UI ngay lập tức, rollback nếu server lỗi.
   *
   * Checklist:
   *  [1] Luôn lưu backup trước khi cập nhật
   *  [2] Xóa khỏi state ngay (không chờ API)
   *  [3] Không cần xử lý next() — UI đã đúng
   *  [4] Rollback + thông báo lỗi nếu server thất bại
   */
  deleteProductOptimistic(id: string): void {
    const backup = this._products.getValue(); // [1] backup

    this._products.next(backup.filter((p) => p.id !== id)); // [2] optimistic

    this.productService.delete(id).subscribe({
      // [3] next: không cần làm gì thêm
      error: () => {
        this._products.next(backup); // [4] rollback
        this._error.next('Xóa thất bại! Dữ liệu được khôi phục.');
      },
    });
  }

  /**
   * Tạo mới sản phẩm — Chiến lược: RELOAD
   * Dùng loadProducts() sau khi tạo thành công thay vì push optimistic.
   *
   * Lý do: Nếu navigate('/products') xảy ra TRƯỚC khi POST về,
   * ProductsList sẽ gọi loadProducts() → GET về trước → store có data đúng.
   * Sau đó POST về → nếu push thêm vào store → DUPLICATE ❌
   * Dùng reload: cả hai GET đều trả về cùng data từ server → không duplicate ✅
   */
  createProduct(product: Product): void {
    this._loading.next(true);
    this._error.next('');

    this.productService.create(product).subscribe({
      next: (created) => {
        this._product.next(created);
        this._loading.next(false);
      },
      error: () => {
        this._error.next('Tạo sản phẩm thất bại!');
        this._loading.next(false);
      },
    });
  }

  /** Cập nhật sản phẩm theo id — PUT */
  updateProduct(id: string, product: Product): void {
    this._loading.next(true);
    this._error.next('');

    this.productService.update(id, product).subscribe({
      next: (updated) => {
        this._product.next(updated);
        this._loading.next(false);
      },
      error: () => {
        this._error.next('Cập nhật thất bại!');
        this._loading.next(false);
      },
    });
  }
}
