import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { DummyjsonApiService } from 'src/app/core/services/dummyjson-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private readonly userSubject = new BehaviorSubject<User | null>(null);
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);

  readonly user$ = this.userSubject.asObservable();
  readonly loading$ = this.loadingSubject.asObservable();

  constructor(private dummyjsonApiService: DummyjsonApiService) {}

  loadUser(userId: number): void {
    this.loadingSubject.next(true);
    // Reset user data when loading new user to avoid showing old data
    this.userSubject.next(null);

    this.dummyjsonApiService
      .getUser(userId)
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe({
        next: (user) => {
          this.userSubject.next(user);
        },
        error: (err) => {
          console.error('Error loading user:', err);
        },
      });
  }
}
