import { Component } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-share-replay',
  templateUrl: './share-replay.component.html',
  styleUrls: ['./share-replay.component.scss'],
})
export class ShareReplayComponent {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Gọi loadUsers() để trigger HTTP call
    this.userService.loadUsers();

    this.userService.$user.subscribe((res) =>
      console.log('share replay user', res),
    );
  }
}
