import { ChangeDetectionStrategy, Component, OnInit, Signal, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  readonly pageSizeOptions = [5, 10, 20] as const;
  readonly pageSize = signal<number>(10);
  readonly pageIndex = signal<number>(0);
  readonly search = signal<string>('');
  readonly roleFilter = signal<'all' | 'admin' | 'user'>('all');
  readonly statusFilter = signal<'all' | 'active' | 'passive'>('all');
  readonly sortKey = signal<'id' | 'name' | 'email'>('id');
  readonly sortDir = signal<'asc' | 'desc'>('asc');

  readonly isLoading = this.userService.isLoading;

  readonly users = this.userService.users;

  readonly filteredUsers: Signal<User[]> = computed(() => {
    let list = this.users() ?? [];
    const q = this.search().trim().toLowerCase();
    if (q) {
      list = list.filter(u => {
        const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
        return fullName.includes(q) || u.email.toLowerCase().includes(q) || String(u.id).includes(q);
      });
    }
    const rf = this.roleFilter();
    const sf = this.statusFilter();
    if (rf !== 'all') list = list.filter(u => u.role === rf);
    if (sf !== 'all') list = list.filter(u => u.status === sf);
    const key = this.sortKey();
    const dir = this.sortDir();
    const factor = dir === 'asc' ? 1 : -1;
    list = [...list].sort((a, b) => {
      if (key === 'id') return (a.id - b.id) * factor;
      if (key === 'name') return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`) * factor;
      return a.email.localeCompare(b.email) * factor;
    });
    return list;
  });

  readonly pagedUsers: Signal<User[]> = computed(() => {
    const list = this.filteredUsers();
    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize();
    return list.slice(start, end);
  });

  readonly total = computed(() => this.filteredUsers().length);
  readonly totalPages = computed(() => {
    const pages = Math.ceil(this.total() / this.pageSize());
    return pages > 0 ? pages : 1;
  });

  ngOnInit(): void {
    this.userService.loadUsers();
  }

  onPageChange(index: number): void {
    this.pageIndex.set(index);
  }

  onPageSizeChange(size: number | string): void {
    this.pageSize.set(Number(size));
    this.pageIndex.set(0);
  }

  fullName(user: User): string {
    return `${user.firstName} ${user.lastName}`;
  }

  trackByUserId(index: number, user: User): number {
    return user.id;
  }

  goto(user: User): void {
    this.router.navigate(['/users', user.id]);
  }

  onSearchChange(value: string): void {
    this.search.set(value);
    this.pageIndex.set(0);
  }

  onRoleFilterChange(value: 'all' | 'admin' | 'user') {
    this.roleFilter.set(value);
    this.pageIndex.set(0);
  }

  onStatusFilterChange(value: 'all' | 'active' | 'passive') {
    this.statusFilter.set(value);
    this.pageIndex.set(0);
  }

  onSort(key: 'id' | 'name' | 'email') {
    if (this.sortKey() === key) {
      this.sortDir.set(this.sortDir() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortKey.set(key);
      this.sortDir.set('asc');
    }
  }

  initials(user: User): string {
    const f = user.firstName?.[0] ?? '';
    const l = user.lastName?.[0] ?? '';
    return (f + l).toUpperCase();
  }
}


