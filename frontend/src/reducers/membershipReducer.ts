import { MembershipType, UserMembership } from '../api/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  GetMembershipsResponse,
  GetUserMembershipResponse,
} from '../api/requests/memberships/responses';

export interface MembershipState {
  userMembership: UserMembership | null;
  memberships: MembershipType[];
}

const initialState: MembershipState = {
  userMembership: null,
  memberships: [],
};

export const membershipSlice = createSlice({
  name: 'membership',
  initialState,
  reducers: {
    loadUserMembership: (
      state,
      action: PayloadAction<GetUserMembershipResponse>,
    ) => {
      if (!action.payload) {
        state.userMembership = null;
      } else {
        state.userMembership = {
          ...action.payload.membershipTypeId,
          startDate: new Date(action.payload.startDate),
          endDate: new Date(action.payload.endDate),
        };
      }
    },
    loadMemberships: (state, action: PayloadAction<GetMembershipsResponse>) => {
      state.memberships = action.payload;
    },
  },
});

export const { loadUserMembership, loadMemberships } = membershipSlice.actions;

export default membershipSlice.reducer;
