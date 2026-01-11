import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // Interceptor để tự động gắn token vào request
  constructor(private readonly tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Lấy token từ TokenService
    const token = this.tokenService.getToken();

    // Nếu có token thì clone request và gắn Authorization header
    if (token) {
      const authRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
      return next.handle(authRequest);
    }

    // Không có token thì gửi request như bình thường
    return next.handle(request);
  }
}
