import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  images?: string[];
  categoryId?: number;
}

export interface ProductCreate {
  title: string;
  price: number;
  description?: string;
  images?: string[];
  categoryId?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly baseUrl = `${environment.apiBaseUrlDBJson}/products`;

  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  createProduct(payload: ProductCreate): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, payload);
  }

  updateProduct(
    id: number,
    payload: Partial<ProductCreate>
  ): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, payload);
  }

  deleteProduct(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`);
  }
}
