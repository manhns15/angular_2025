import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { CanComponentDeactivate } from '../guards/unsaved-changes/unsaved-changes.guard';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.scss'],
})
export class ReactiveFormsComponent implements CanComponentDeactivate {
  hasUnsavedChanges = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.loadUsers();

    this.userService.$user.subscribe((res) =>
      console.log('reactive forms user', res),
    );
  }

  // Implement CanComponentDeactivate
  canDeactivate(): boolean {
    if (this.hasUnsavedChanges) {
      const result = confirm(
        '⚠️ Bạn có thay đổi chưa lưu! Bạn có chắc muốn rời khỏi trang này?',
      );
      console.log(
        result
          ? '✅ UnsavedChangesGuard: Người dùng xác nhận rời trang'
          : '❌ UnsavedChangesGuard: Người dùng hủy rời trang',
      );
      return result;
    }
    return true;
  }

  // Giả lập thay đổi form
  markAsChanged(): void {
    this.hasUnsavedChanges = true;
    console.log('📝 Form đã có thay đổi chưa lưu');
  }

  save(): void {
    this.hasUnsavedChanges = false;
    console.log('💾 Đã lưu thay đổi');
  }
}
