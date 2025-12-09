import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categories`);
  }
  searchProducts(keywork: string): Observable<any[]> {
    return new Observable((observer) => {
      this.getAllProducts().subscribe((all) => {
        const result = all.filter((p) => {
          return p.title.toLowerCase().includes(keywork.toLowerCase());
        });
        observer.next(result);
        observer.complete();
      });
    });
  }
}
