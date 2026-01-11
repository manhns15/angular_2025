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
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  handleLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const value = this.loginForm.getRawValue();
    const payload: LoginRequest = {
      username: value.username ?? '',
      password: value.password ?? '',
    };
    this.authService.login(payload).subscribe({
      next: (value) => {
        console.log('value', value);
        this.router.navigate(['/feed']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
