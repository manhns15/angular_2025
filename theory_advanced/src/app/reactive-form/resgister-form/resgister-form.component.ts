import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-resgister-form',
  templateUrl: './resgister-form.component.html',
  styleUrls: ['./resgister-form.component.scss'],
})
export class ResgisterFormComponent {
  constructor(private fb: FormBuilder) {}

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  contactForm = this.fb.group({
    name: ['', Validators.required],
    phones: this.fb.array([this.fb.control('', Validators.required)]),
  });

  get phones(): FormArray {
    return this.contactForm.get('phones') as FormArray;
  }
  addPhone() {
    this.phones.push(this.fb.control('', Validators.required));
  }

  removePhone(index: number) {
    this.phones.removeAt(index);
  }

  submitPhone() {
    const phones = this.phones.value.map((phone: string) => {
      return phone.startsWith('+84') ? phone : '+84' + phone;
    });

    console.log({ ...this.contactForm.value, phones: phones });
  }

  submit() {
    console.log(this.registerForm.value);
  }
}
