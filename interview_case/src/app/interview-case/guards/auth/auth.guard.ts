import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    if (this.authService.isAuthenticated()) {
      console.log('✅ AuthGuard: Cho phép truy cập');
      return true;
    }

    console.log('❌ AuthGuard: Chặn truy cập - Chưa đăng nhập');
    alert('Bạn cần đăng nhập để truy cập trang này!');
    this.router.navigate(['/login']);
    return false;
  }
}
