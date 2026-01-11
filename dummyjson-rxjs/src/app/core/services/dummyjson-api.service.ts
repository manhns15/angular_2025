import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse } from '../models/login.model';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class DummyjsonApiService {
  private readonly baseUrl = environment.apiBase;

  constructor(private readonly http: HttpClient) {}

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, payload);
  }
  getPosts(): Observable<{ posts: Post[] }> {
    return this.http.get<{ posts: Post[] }>(`${this.baseUrl}/posts`);
  }
  getPostsPaged(
    limit: number,
    skip: number
  ): Observable<{ posts: Post[]; total: number; skip: number; limit: number }> {
    return this.http.get<{
      posts: Post[];
      total: number;
      skip: number;
      limit: number;
    }>(`${this.baseUrl}/posts?limit=${limit}&skip=${skip}`);
  }
  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`);
  }
  searchPosts(q: string): Observable<{ posts: Post[] }> {
    return this.http.get<{ posts: Post[] }>(
      `${this.baseUrl}/posts/search?q=${q}`
    );
  }
  getPostComments(postId: number): Observable<{ comments: any[] }> {
    return this.http.get<{ comments: any[] }>(
      `${this.baseUrl}/posts/${postId}/comments`
    );
  }
  getUser(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${userId}`);
  }
  getUserPosts(userId: number): Observable<{ posts: Post[] }> {
    return this.http.get<{ posts: Post[] }>(
      `${this.baseUrl}/users/${userId}/posts`
    );
  }
}
