import { LoginRequest } from '../../../../core/models/login.model';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  standalone: false,
})
export class LoginPageComponent {
  // Inject các dependencies cần thiết:
  // - FormBuilder: để tạo Reactive Form
  // - AuthService: service xử lý logic xác thực (API login)
  // - Router: để điều hướng trang sau khi login thành công
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  // Khởi tạo Login Form với 2 trường username và password
  // Validators.required: Bắt buộc phải nhập dữ liệu
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  // Hàm xử lý khi người dùng ấn nút Login
  handleLogin() {
    // 1. Kiểm tra form có hợp lệ không (đã nhập đủ username/pass chưa)
    // Nếu invalid -> đánh dấu các field là touched để hiển thị lỗi UI -> dừng lại
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // 2. Lấy giá trị từ form
    const value = this.loginForm.getRawValue();

    // 3. Chuẩn bị payload gửi lên server
    const payload: LoginRequest = {
      username: value.username ?? '', // Dùng toán tử ?? để đảm bảo không bị null/undefined
      password: value.password ?? '',
    };

    // 4. Gọi API login qua AuthService
    this.authService.login(payload).subscribe({
      next: (value) => {
        // Login thành công
        console.log('Login success', value);
        // Điều hướng người dùng sang trang Feed
        this.router.navigate(['/feed']);
      },
      error: (err) => {
        // Login thất bại (sai pass, lỗi server...)
        console.log('Login error', err);
        // Có thể thêm logic hiển thị thông báo lỗi cho user ở đây
      },
    });
  }
}
