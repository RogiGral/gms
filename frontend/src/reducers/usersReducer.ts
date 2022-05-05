import { User } from '../api/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetUsersResponse } from '../api/requests/users/responses';

export interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loadUsers: (state, action: PayloadAction<GetUsersResponse>) => {
      state.users = action.payload;
    },
  },
});

export const { loadUsers } = usersSlice.actions;

export default usersSlice.reducer;
