export interface LoginResponse {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profileImageUrl: string;
  lastLoginDate: string | null;
  lastLoginDateDisplay: string | null;
  joinDate: string;
  role: string;
  authorities: string[];
  notLocked: boolean;
  active: boolean;
}
