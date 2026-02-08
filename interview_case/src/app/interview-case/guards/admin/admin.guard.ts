import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    if (this.authService.isAdmin()) {
      console.log('✅ AdminGuard: Cho phép truy cập child route (Admin)');
      return true;
    }

    console.log('❌ AdminGuard: Chặn truy cập - Không có quyền Admin');
    alert('Bạn cần quyền Admin để truy cập trang này!');
    this.router.navigate(['/']);
    return false;
  }
}
