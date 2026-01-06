import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

interface UserForm {
  id: number;
  account: {
    username: string;
    password: string;
  };
  profile: {
    fullName: string;
    email: string;
    phone: string;
  };
  role: 'admin' | 'user';
  active: boolean;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  constructor(private userService: UserService) {}
  handleSubmit(data: UserForm) {
    this.userService.addUser(data).subscribe({
      next(res) {
        console.log(res);
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
