import { Component } from '@angular/core';

interface LoginForm {
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  model: LoginForm = {
    username: '',
    email: '',
    password: '',
  };
  onSubmit(data: LoginForm) {
    console.log(data);
  }
}
