import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000/products';

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  addProduct(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
