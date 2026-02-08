import { Component } from '@angular/core';

@Component({
  selector: 'app-protected',
  template: `
    <div class="protected-container">
      <h2>🔒 Protected Page</h2>
      <p>Chúc mừng! Bạn đã vượt qua <strong>AuthGuard (CanActivate)</strong></p>
      <p>Trang này chỉ hiển thị khi bạn đã đăng nhập.</p>
      <div class="info-box">
        <h3>AuthGuard hoạt động như thế nào?</h3>
        <ul>
          <li>
            ✅ Kiểm tra trạng thái đăng nhập trước khi cho phép truy cập route
          </li>
          <li>✅ Nếu chưa đăng nhập → Chuyển hướng về trang login</li>
          <li>✅ Nếu đã đăng nhập → Cho phép truy cập</li>
        </ul>
      </div>
    </div>
  `,
  styles: [
    `
      .protected-container {
        max-width: 600px;
        margin: 50px auto;
        padding: 20px;
      }
      .info-box {
        background: #e7f3ff;
        padding: 20px;
        border-radius: 8px;
        margin-top: 20px;
      }
      .info-box h3 {
        margin-top: 0;
      }
      .info-box ul {
        margin: 10px 0;
      }
    `,
  ],
})
export class ProtectedComponent {}
