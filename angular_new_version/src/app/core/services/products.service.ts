import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  // =====================
  // READ - Lấy tất cả
  // =====================
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  // =====================
  // READ - Lấy theo id
  // =====================
  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  // =====================
  // CREATE - Tạo mới
  // =====================
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(catchError(this.handleError));
  }

  // =====================
  // UPDATE - Cập nhật toàn bộ
  // =====================
  update(id: string, product: Product): Observable<Product> {
    return this.http
      .put<Product>(`${this.apiUrl}/${id}`, product)
      .pipe(catchError(this.handleError));
  }

  // =====================
  // UPDATE - Cập nhật 1 phần
  // =====================
  patch(id: string, partial: Partial<Product>): Observable<Product> {
    return this.http
      .patch<Product>(`${this.apiUrl}/${id}`, partial)
      .pipe(catchError(this.handleError));
  }

  // =====================
  // DELETE - Xóa
  // =====================
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  // =====================
  // Error Handler
  // =====================
  private handleError(error: any): Observable<never> {
    return throwError(() => new Error(error.message || 'Lỗi server'));
  }

  // =====================
  // Search
  // =====================
  search(query: string): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${this.apiUrl}?name=${query}`)
      .pipe(catchError(this.handleError));
  }
  // =====================
  // Filter by category
  // =====================
  getByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?category=${category}`);
  }
}
