import Api from '../../Api';
import { GetUserMembershipResponse } from './responses';

export default class Memberships {
  public static async getMembership(userId: number) {
    const response = await Api.createClient().get(
      `/userMembership/list?userId=${userId}`,
    );

    return response.data as GetUserMembershipResponse;
  }
}
