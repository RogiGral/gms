import { UserWorkout, Workout } from '../api/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  GetWorkoutsForUserResponse,
  GetWorkoutsResponse,
} from '../api/requests/workouts/responses';

export interface WorkoutsState {
  workouts: Workout[];
  userWorkoutIds: UserWorkout[];
}

const initialState: WorkoutsState = {
  workouts: [],
  userWorkoutIds: [],
};

export const workoutsSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    loadWorkouts: (state, action: PayloadAction<GetWorkoutsResponse>) => {
      state.workouts = action.payload.map(workout => ({
        ...workout,
        workoutStartDate: new Date(workout.workoutStartDate),
        workoutEndDate: new Date(workout.workoutEndDate),
      }));
    },
    loadUserWorkouts: (state, action: PayloadAction<UserWorkout[]>) => {
      console.log('payload:', action);
      state.userWorkoutIds = action.payload;
    },
  },
});

export const { loadWorkouts, loadUserWorkouts } = workoutsSlice.actions;

export default workoutsSlice.reducer;
