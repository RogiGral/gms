export interface FetchUserResponse {
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

export type LoginResponse = FetchUserResponse;
export type RegisterResponse = FetchUserResponse;

export interface ResetPasswordResponse {
  timeStamp: string;
  message: string;
}
