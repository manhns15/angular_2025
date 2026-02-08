import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isAdminSubject = new BehaviorSubject<boolean>(false);

  readonly $isAuthenticated: Observable<boolean> =
    this.isAuthenticatedSubject.asObservable();
  readonly $isAdmin: Observable<boolean> = this.isAdminSubject.asObservable();

  constructor() {}

  // Giả lập đăng nhập
  login(username: string, password: string): boolean {
    if (username === 'user' && password === 'password') {
      this.isAuthenticatedSubject.next(true);
      this.isAdminSubject.next(false);
      console.log('✅ Đăng nhập thành công với quyền USER');
      return true;
    } else if (username === 'admin' && password === 'admin') {
      this.isAuthenticatedSubject.next(true);
      this.isAdminSubject.next(true);
      console.log('✅ Đăng nhập thành công với quyền ADMIN');
      return true;
    }
    console.log('❌ Đăng nhập thất bại');
    return false;
  }

  // Đăng xuất
  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.isAdminSubject.next(false);
    console.log('👋 Đã đăng xuất');
  }

  // Kiểm tra trạng thái đăng nhập
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.getValue();
  }

  // Kiểm tra quyền admin
  isAdmin(): boolean {
    return this.isAdminSubject.getValue();
  }
}
