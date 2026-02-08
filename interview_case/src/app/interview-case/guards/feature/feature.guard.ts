import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FeatureGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (this.authService.isAuthenticated()) {
      console.log('✅ FeatureGuard: Cho phép lazy load module');
      return true;
    }

    console.log('❌ FeatureGuard: Chặn lazy load - Chưa đăng nhập');
    alert('Bạn cần đăng nhập để truy cập module này!');
    this.router.navigate(['/login']);
    return false;
  }
}
