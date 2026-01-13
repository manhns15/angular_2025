import { Component } from '@angular/core';

@Component({
  selector: 'app-user-detail-page',
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.scss'],
  standalone: false,
})
export class UserDetailPageComponent {
  /* 
    - call api postDetail 
    - call api get thông tin user theo userId từ postDetail
    - call api comment theo postId
    - input comment khi đã đăng nhập, nếu chưa đăng nhập sẽ không hiển thị ô nhập comment
    - add comment và edit comment trên giao diện theo user đã đăng nhập
  */
}
