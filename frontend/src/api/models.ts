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

export interface UserWorkout {
  id: number;
  workoutId: number;
  userId: number;
}

export interface UserMembership {
  id: number;
  name: string;
  price: number;
  numberOfMonths: 6;
  startDate: Date;
  endDate: Date;
}

export interface MembershipType {
  id: number;
  name: string;
  numberOfMonths: number;
  price: number;
}
