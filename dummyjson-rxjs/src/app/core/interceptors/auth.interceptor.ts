import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

/**
 * AuthInterceptor
 *
 * Interceptor này chịu trách nhiệm tự động chèn Access Token vào header của mọi HTTP request gửi đi.
 * Điều này giúp xác thực người dùng với server mà không cần thêm token thủ công ở từng service.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly tokenService: TokenService) {}

  /**
   * Phương thức intercept được gọi tự động cho mỗi HTTP request.
   *
   * @param request - Request gốc đang được gửi đi.
   * @param next - HttpHandler để chuyển tiếp request sang interceptor tiếp theo hoặc gửi đến server.
   * @returns Observable<HttpEvent<unknown>> - Stream sự kiện HTTP trả về từ server.
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    // 1. Lấy token hiện tại từ TokenService (thường lưu trong LocalStorage/Cookie)
    const token = this.tokenService.getToken();

    // 2. Kiểm tra nếu có token hợp lệ
    if (token) {
      // HttpRequest là bất biến (immutable), nên cần clone ra một bản sao mới
      // và đính kèm header Authorization với định dạng 'Bearer <token>'
      const authRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
      // Chuyển tiếp request đã được chỉnh sửa
      return next.handle(authRequest);
    }

    // 3. Nếu không có token (ví dụ: user chưa login), gửi request gốc đi bình thường
    return next.handle(request);
  }
}
