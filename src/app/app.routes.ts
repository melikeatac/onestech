import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'users' },
  {
    path: 'users',
    loadComponent: () => import('./users/users-list/users-list.component').then(m => m.UsersListComponent),
  },
  {
    path: 'users/:id',
    loadComponent: () => import('./users/user-detail/user-detail.component').then(m => m.UserDetailComponent),
    canDeactivate: [() => import('./users/pending-changes.guard').then(m => m.pendingChangesGuard)],
  },
  { path: '**', redirectTo: 'users' },
];
