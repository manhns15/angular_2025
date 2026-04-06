import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-multi-step-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './multi-step-form.html',
  styleUrl: './multi-step-form.scss',
})
export class MultiStepFormComponent {
  private fb = inject(FormBuilder);

  // ── Signal: bước hiện tại ────────────────────────────
  currentStep = signal(1); // 1 | 2 | 3

  // ── Step 1: Thông tin cá nhân ────────────────────────
  step1 = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
  });

  // ── Step 2: Danh sách kỹ năng (FormArray) ────────────
  step2 = this.fb.group({
    skills: this.fb.array([
      this.createSkill(), // 1 row mặc định
    ]),
  });

  // ── Step 3: không có form, chỉ review ────────────────

  // ── Getter tiện lợi ──────────────────────────────────
  get skills(): FormArray {
    return this.step2.get('skills') as FormArray;
  }

  // Tạo 1 FormGroup cho 1 kỹ năng
  createSkill() {
    return this.fb.group({
      name: ['', Validators.required], // tên kỹ năng
      level: ['Beginner', Validators.required], // cấp độ
    });
  }

  // Thêm 1 row kỹ năng mới
  addSkill() {
    this.skills.push(this.createSkill());
  }

  // Xoá row kỹ năng
  removeSkill(index: number) {
    if (this.skills.length > 1) {
      this.skills.removeAt(index);
    }
  }

  // ── Điều hướng step ──────────────────────────────────
  nextStep() {
    if (this.currentStep() === 1 && this.step1.invalid) {
      this.step1.markAllAsTouched();
      return;
    }
    if (this.currentStep() === 2 && this.step2.invalid) {
      this.step2.markAllAsTouched();
      return;
    }
    this.currentStep.update((s) => s + 1);
  }

  prevStep() {
    this.currentStep.update((s) => s - 1);
  }

  // ── Submit ───────────────────────────────────────────
  submitted = signal(false);

  onSubmit() {
    const result = {
      ...this.step1.getRawValue(), // fullName, email
      ...this.step2.getRawValue(), // skills[]
    };
    console.log('✅ Form submitted:', result);
    this.submitted.set(true);
  }

  reset() {
    this.step1.reset();
    this.step2.reset();
    this.skills.clear();
    this.skills.push(this.createSkill());
    this.currentStep.set(1);
    this.submitted.set(false);
  }
}
