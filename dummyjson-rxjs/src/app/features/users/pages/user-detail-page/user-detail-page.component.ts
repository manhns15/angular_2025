import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserStoreService } from '../../services/user-store.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-detail-page',
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.scss'],
  standalone: false,
})
export class UserDetailPageComponent implements OnInit {
  readonly user$ = this.userStore.user$;
  readonly loading$ = this.userStore.loading$;

  constructor(
    private route: ActivatedRoute,
    private userStore: UserStoreService,
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(map((params) => params['id'])).subscribe((id) => {
      if (id) {
        this.userStore.loadUser(+id);
      }
    });
  }
}
