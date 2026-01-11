import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  // Lấy service bằng inject để dùng trong functional guard
  const tokenService = inject(TokenService);
  const router = inject(Router);

  // Kiểm tra đã có token đăng nhập hay chưa
  const isLoggedIn = tokenService.isLoggedIn();
  if (isLoggedIn) {
    return true;
  }

  // Chưa đăng nhập thì chuyển về trang login
  // Lưu lại url để sau login quay lại đúng trang
  // Lưu ý: đổi đường dẫn '/auth/login' theo route thực tế của dự án
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url },
  });
};
