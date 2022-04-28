import { Workout } from '../api/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetWorkoutsForUserResponse } from '../api/requests/workouts/responses';

export interface WorkoutsState {
  workouts: Workout[];
  userWorkoutIds: string[];
}

const initialState: WorkoutsState = {
  workouts: [],
  userWorkoutIds: [],
};

export const workoutsSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    loadWorkouts: (
      state,
      action: PayloadAction<GetWorkoutsForUserResponse>,
    ) => {
      state.workouts = action.payload.map(workout => ({
        ...workout,
        workoutStartDate: new Date(workout.workoutStartDate),
        workoutEndDate: new Date(workout.workoutEndDate),
      }));
    },
    loadUserWorkouts: (state, action: PayloadAction<string[]>) => {
      state.userWorkoutIds = action.payload;
    },
  },
});

export const { loadWorkouts, loadUserWorkouts } = workoutsSlice.actions;

export default workoutsSlice.reducer;
