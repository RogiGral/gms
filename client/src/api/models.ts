export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profileImageUrl: string;
  lastLoginDate: Date | null;
  lastLoginDateDisplay: Date | null;
  joinDate: Date;
  role: string;
  authorities: string[];
  notLocked: boolean;
  active: boolean;
}
