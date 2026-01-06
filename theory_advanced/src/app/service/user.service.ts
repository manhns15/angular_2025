import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getUserById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  addUser(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
  updateUser(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }
  deleteUser(id: any) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
