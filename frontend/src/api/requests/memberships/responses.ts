import { MembershipType, UserMembership } from '../../models';

export interface GetUserMembershipResponse {
  membershipTypeId: UserMembership;
  endDate: string;
  startDate: string;
}

export type GetMembershipsResponse = MembershipType[];
