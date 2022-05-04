import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import workoutsReducer from './reducers/workoutsReducer';
import membershipReducer from './reducers/membershipReducer';
import usersReducer from './reducers/usersReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workouts: workoutsReducer,
    membership: membershipReducer,
    users: usersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
