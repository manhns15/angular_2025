import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-multi-step-form-classic',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './multi-step-form-classic.html',
  styleUrl: './multi-step-form-classic.scss',
})
export class MultiStepFormClassicComponent {
  private fb = inject(FormBuilder);

  // ── Biến thường (không dùng Signal) ─────────────────
  currentStep = 1; // 👈 chỉ là số bình thường
  submitted = false;

  // ── Step 1: Thông tin cá nhân ────────────────────────
  step1 = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
  });

  // ── Step 2: Kỹ năng — FormArray ──────────────────────
  step2 = this.fb.group({
    skills: this.fb.array([
      this.createSkill(), // 1 row mặc định
    ]),
  });

  get skills(): FormArray {
    return this.step2.get('skills') as FormArray;
  }

  createSkill() {
    return this.fb.group({
      name: ['', Validators.required],
      level: ['Beginner'],
    });
  }

  addSkill() {
    this.skills.push(this.createSkill());
  }

  removeSkill(index: number) {
    if (this.skills.length > 1) {
      this.skills.removeAt(index);
    }
  }

  // ── Điều hướng step ──────────────────────────────────
  nextStep() {
    if (this.currentStep === 1 && this.step1.invalid) {
      this.step1.markAllAsTouched();
      return;
    }
    if (this.currentStep === 2 && this.step2.invalid) {
      this.step2.markAllAsTouched();
      return;
    }
    this.currentStep++; // 👈 tăng trực tiếp
  }

  prevStep() {
    this.currentStep--; // 👈 giảm trực tiếp
  }

  onSubmit() {
    const result = {
      ...this.step1.getRawValue(),
      ...this.step2.getRawValue(),
    };
    console.log('✅ Submit:', result);
    this.submitted = true; // 👈 gán trực tiếp
  }

  reset() {
    this.step1.reset();
    this.skills.clear();
    this.skills.push(this.createSkill());
    this.currentStep = 1; // 👈 reset trực tiếp
    this.submitted = false;
  }
}
