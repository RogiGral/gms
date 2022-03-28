import { User } from '../api/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse } from '../api/requests/auth/responses';

export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadUser: (state, action: PayloadAction<LoginResponse>) => {
      state.user = {
        ...action.payload,
        lastLoginDate: action.payload.lastLoginDate
          ? new Date(action.payload.lastLoginDate)
          : null,
        lastLoginDateDisplay: action.payload.lastLoginDateDisplay
          ? new Date(action.payload.lastLoginDateDisplay)
          : null,
        joinDate: new Date(action.payload.joinDate),
      };
    },
  },
});

export const { loadUser } = authSlice.actions;

export default authSlice.reducer;
