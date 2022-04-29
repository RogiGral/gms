import { Membership, Workout } from '../api/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  GetWorkoutsForUserResponse,
  GetWorkoutsResponse,
} from '../api/requests/workouts/responses';
import { GetUserMembershipResponse } from '../api/requests/memberships/responses';

export interface MembershipState {
  membership: Membership | null;
}

const initialState: MembershipState = {
  membership: null,
};

export const membershipSlice = createSlice({
  name: 'membership',
  initialState,
  reducers: {
    loadMembership: (
      state,
      action: PayloadAction<GetUserMembershipResponse>,
    ) => {
      // state.membership = action.payload.map(workout => ({
      //   ...workout,
      //   workoutStartDate: new Date(workout.workoutStartDate),
      //   workoutEndDate: new Date(workout.workoutEndDate),
      // }));
    },
  },
});

export const { loadMembership } = membershipSlice.actions;

export default membershipSlice.reducer;
