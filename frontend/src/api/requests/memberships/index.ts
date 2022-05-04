import Api from '../../Api';
import { GetMembershipsResponse, GetUserMembershipResponse } from './responses';

export default class Memberships {
  public static async getMembership(userId: number) {
    const response = await Api.createClient().get(
      `/userMembership/list?userId=${userId}`,
    );

    return response.data as GetUserMembershipResponse;
  }

  public static async getMemberships() {
    const response = await Api.createClient().get('/membershipType/list');

    console.log('response.data:', response);
    return response.data as GetMembershipsResponse;
  }

  public static async assignMembership(
    userId: number,
    membershipTypeId: number,
  ) {
    const response = await Api.createClient().post(
      `/userMembership/add?userId=${userId}&membershipTypeId=${membershipTypeId}`,
    );

    return response.data as undefined;
  }
}
