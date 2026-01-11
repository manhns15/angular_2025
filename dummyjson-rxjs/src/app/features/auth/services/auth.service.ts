import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DummyjsonApiService } from '../../../core/services/dummyjson-api.service';
import { TokenService } from '../../../core/services/token.service';
import { LoginRequest, LoginResponse } from '../../../core/models/login.model';
import { AuthStoreService } from './auth-store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Service xử lý nghiệp vụ đăng nhập/đăng xuất
  constructor(
    private readonly api: DummyjsonApiService,
    private readonly tokenService: TokenService,
    private readonly authStore: AuthStoreService
  ) {}

  // Gọi API đăng nhập và lưu token + user vào store
  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.api.login(payload).pipe(
      tap((response) => {
        this.tokenService.setToken(response.accessToken, response.refreshToken);
        this.authStore.setUser(response);
      })
    );
  }

  // Đăng xuất: xóa token và reset trạng thái user
  logout(): void {
    this.tokenService.clearToken();
    this.authStore.clearUser();
  }
}
