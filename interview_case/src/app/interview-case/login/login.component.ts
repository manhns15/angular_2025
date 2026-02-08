import { Component } from '@angular/core';
import { AuthService } from '../guards/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <h2>🔐 Login Page</h2>
      <div class="login-form">
        <div class="form-group">
          <label>Username:</label>
          <input
            type="text"
            [(ngModel)]="username"
            placeholder="user hoặc admin"
          />
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input
            type="password"
            [(ngModel)]="password"
            placeholder="password hoặc admin"
          />
        </div>
        <div class="button-group">
          <button (click)="login()">Đăng nhập</button>
          <button (click)="logout()" class="secondary">Đăng xuất</button>
        </div>
        <div class="hint">
          <p><strong>Tài khoản test:</strong></p>
          <p>👤 User: username="user", password="password"</p>
          <p>👨‍💼 Admin: username="admin", password="admin"</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .login-container {
        max-width: 400px;
        margin: 50px auto;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
      }
      .form-group {
        margin-bottom: 15px;
      }
      .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }
      .form-group input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .button-group {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
      }
      button {
        flex: 1;
        padding: 10px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      button.secondary {
        background: #6c757d;
      }
      .hint {
        background: #f8f9fa;
        padding: 15px;
        border-radius: 4px;
        font-size: 14px;
      }
    `,
  ],
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login(): void {
    const success = this.authService.login(this.username, this.password);
    if (success) {
      this.router.navigate(['/pipe']);
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
