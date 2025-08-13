import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User, UserRole, UserStatus } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);

  readonly isLoading = signal<boolean>(true);
  readonly user = signal<User | null>(null);

  readonly form = this.fb.nonNullable.group({
    id: [{ value: 0, disabled: true }],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    role: ['user' as UserRole, [Validators.required]],
    status: ['active' as UserStatus, [Validators.required]],
  });

  readonly isAdmin = computed(() => this.user()?.role === 'admin');
  readonly roleBadgeClass = computed(() => this.user()?.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700');
  readonly statusBadgeClass = computed(() => this.user()?.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700');

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.isLoading.set(true);
    this.userService.getUserById(id).subscribe((u) => {
      this.user.set(u);
      if (u) {
        this.form.reset({
          id: u.id,
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
          role: u.role,
          status: u.status,
        });
        if (u.role === 'admin') {
          this.form.disable();
        } else {
          this.form.enable();
          this.form.controls.id.disable();
        }
      }
      this.isLoading.set(false);
    });
  }

  save(): void {
    if (this.isAdmin() || this.form.invalid || !this.user()) return;
    const updated: User = {
      ...(this.user() as User),
      ...this.form.getRawValue(),
    } as User;
    this.userService.updateUser(updated).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }

  back(): void {
    this.router.navigate(['/users']);
  }
}


