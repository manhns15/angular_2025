import { Component, OnInit } from '@angular/core';
import { AuthService } from './features/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  title = 'dummyjson-rxjs';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.restoreUserFromToken().subscribe();
  }
}
