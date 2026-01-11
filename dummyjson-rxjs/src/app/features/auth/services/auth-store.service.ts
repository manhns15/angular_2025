import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { LoginResponse } from '../../../core/models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {
  // Lưu trạng thái user hiện tại trong bộ nhớ của app
  private readonly userSubject = new BehaviorSubject<LoginResponse | null>(null);

  // Stream public để component subscribe khi cần
  readonly user$: Observable<LoginResponse | null> = this.userSubject.asObservable();

  // Stream kiểm tra đăng nhập (true/false)
  readonly isLoggedIn$: Observable<boolean> = this.user$.pipe(
    map((user) => !!user)
  );

  constructor() {}

  // Cập nhật user sau khi đăng nhập thành công
  setUser(user: LoginResponse): void {
    this.userSubject.next(user);
  }

  // Xóa user khi logout hoặc token hết hạn
  clearUser(): void {
    this.userSubject.next(null);
  }

  // Lấy nhanh giá trị hiện tại (dùng khi cần sync)
  getSnapshot(): LoginResponse | null {
    return this.userSubject.getValue();
  }
}
