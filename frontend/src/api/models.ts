export enum UserRole {
  ROLE_USER = 'ROLE_USER',
  ROLE_COACH = 'ROLE_COACH',
  ROLE_ADMIN = 'ROLE_ADMIN',
  // ROLE_SUPER_ADMIN = 'ROLE_SUPER_ADMIN',
}

export interface User {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profileImageUrl: string;
  lastLoginDate: Date | null;
  lastLoginDateDisplay: Date | null;
  joinDate: Date;
  role: UserRole;
  authorities: string[];
  notLocked: boolean;
  active: boolean;
}

export interface Workout {
  id: number;
  workoutName: string;
  trainerUsername: string;
  roomNumber: string;
  workoutStartDate: Date;
  workoutEndDate: Date;
  capacity: number;
  participantsNumber: number;
}

export interface Membership {
  id: number;
  monthlyPayment: number;
  name: string;
  price: number;
}
