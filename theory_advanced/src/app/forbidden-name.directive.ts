import { Directive } from '@angular/core'; // Import decorator Directive từ Angular core
import {
  AbstractControl, // Kiểu dữ liệu đại diện cho một control trong form
  NG_VALIDATORS, // Token để đăng ký validator custom vào Angular
  ValidationErrors, // Kiểu dữ liệu cho lỗi validate
  Validator, // Interface cho custom validator
} from '@angular/forms';

@Directive({
  selector: '[skuValidator]', // Định nghĩa selector để dùng directive này qua thuộc tính forbiddenName trên input
  providers: [
    {
      provide: NG_VALIDATORS, // Đăng ký directive này như một validator
      useExisting: ForbiddenNameDirective, // Sử dụng chính class này làm validator
      multi: true, // Cho phép nhiều validator cùng lúc
    },
  ],
})
export class ForbiddenNameDirective implements Validator {
  // Class implement interface Validator
  validate(control: AbstractControl) {
    // Hàm validate, nhận vào control của form
    if (!control.value) return null; // Nếu không có giá trị thì không lỗi
    const skuPattern = /^[A-Z]{3}-\d{4}$/;
    return skuPattern.test(control.value) ? null : { skuValidator: true };
  }
}
