import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  // Key lưu access token trong localStorage
  private readonly accessTokenKey = 'access_token';

  // Key lưu refresh token trong localStorage (nếu có)
  private readonly refreshTokenKey = 'refresh_token';

  constructor() { }

  // Lưu token sau khi đăng nhập thành công
  setToken(accessToken: string, refreshToken?: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);

    if (refreshToken) {
      localStorage.setItem(this.refreshTokenKey, refreshToken);
    }
  }

  // Lấy access token để gắn vào request
  getToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  // Lấy refresh token khi cần làm mới access token
  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  // Xóa token khi logout
  clearToken(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  // Kiểm tra người dùng đã đăng nhập hay chưa
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
