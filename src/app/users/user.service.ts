import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { delay, map, of } from 'rxjs';
import { User } from './user.model';
import { MOCK_USERS } from './mock-users';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly usersState = signal<User[] | null>(null);
  private readonly loadingState = signal<boolean>(false);

  readonly users: Signal<User[] | null> = this.usersState.asReadonly();
  readonly isLoading: Signal<boolean> = this.loadingState.asReadonly();

  loadUsers(): void {
    if (this.usersState() !== null) return;
    this.loadingState.set(true);
    of(MOCK_USERS)
      .pipe(delay(500))
      .subscribe({
        next: (data) => this.usersState.set(data),
        complete: () => this.loadingState.set(false),
      });
  }

  getUserById(id: number) {
    // Simulate http with delay as observable
    return of(MOCK_USERS.find((u) => u.id === id) ?? null).pipe(delay(300));
  }

  updateUser(updated: User) {
    // In-memory update to mock data for demo purposes
    const current = this.usersState();
    if (!current) return of(false).pipe(delay(200));
    const index = current.findIndex((u) => u.id === updated.id);
    if (index === -1) return of(false).pipe(delay(200));
    const next = current.slice();
    next[index] = { ...updated };
    this.usersState.set(next);
    return of(true).pipe(delay(200));
  }

  readonly totalCount: Signal<number> = computed(() => this.usersState()?.length ?? 0);
}


