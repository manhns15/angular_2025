import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <div class="admin-container">
      <h2>👨‍💼 Admin Dashboard</h2>
      <p>
        Chào mừng Admin! Bạn đã vượt qua
        <strong>AdminGuard (CanActivateChild)</strong>
      </p>
      <div class="info-box">
        <h3>AdminGuard hoạt động như thế nào?</h3>
        <ul>
          <li>✅ Bảo vệ tất cả child routes trong module admin</li>
          <li>✅ Kiểm tra quyền admin trước khi cho phép truy cập</li>
          <li>✅ Chỉ cần khai báo 1 lần cho parent route</li>
        </ul>
      </div>
      <div class="admin-links">
        <a routerLink="users">👥 Quản lý Users</a>
        <a routerLink="settings">⚙️ Cài đặt</a>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .admin-container {
        max-width: 600px;
        margin: 50px auto;
        padding: 20px;
      }
      .info-box {
        background: #fff3cd;
        padding: 20px;
        border-radius: 8px;
        margin: 20px 0;
      }
      .admin-links {
        display: flex;
        gap: 10px;
        margin: 20px 0;
      }
      .admin-links a {
        padding: 10px 20px;
        background: #28a745;
        color: white;
        text-decoration: none;
        border-radius: 4px;
      }
    `,
  ],
})
export class AdminDashboardComponent {}
