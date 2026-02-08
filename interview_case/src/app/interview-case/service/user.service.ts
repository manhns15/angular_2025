import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private userSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private isLoaded = false;

  readonly $user: Observable<any[]> = this.userSubject.asObservable();
  readonly $loading: Observable<boolean> = this.loadingSubject.asObservable();

  loadUsers(): void {
    if (this.isLoaded) {
      console.log('Users already loaded, using cached data');
      return;
    }

    this.loadingSubject.next(true);
    this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(
        tap(() => console.log('HTTP CALLED')),
        shareReplay(1),
      )
      .subscribe({
        next: (users) => {
          this.userSubject.next(users);
          this.isLoaded = true;
          this.loadingSubject.next(false);
        },
        error: (err) => {
          console.error('Error loading users:', err);
          this.loadingSubject.next(false);
        },
      });
  }

  // Phương thức để refresh data nếu cần
  refreshUsers(): void {
    this.isLoaded = false;
    this.loadUsers();
  }
}
