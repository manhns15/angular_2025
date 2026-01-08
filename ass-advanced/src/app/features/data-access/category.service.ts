import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Category {
  id: number;
  name: string;
  image?: string;
}

export interface CategoryCreate {
  name: string;
  image?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly baseUrl = `${environment.apiBaseUrlDBJson}/categories`;

  constructor(private readonly http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${id}`);
  }

  createCategory(payload: CategoryCreate): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, payload);
  }

  updateCategory(
    id: number,
    payload: Partial<CategoryCreate>
  ): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/${id}`, payload);
  }

  deleteCategory(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`);
  }
}
