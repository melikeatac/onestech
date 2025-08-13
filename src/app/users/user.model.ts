export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'passive';
}

export type UserRole = User['role'];
export type UserStatus = User['status'];


