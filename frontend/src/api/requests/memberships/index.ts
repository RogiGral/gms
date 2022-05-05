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

  public static async createMembership(
    name: string,
    price: number,
    numberOfMonths: number,
  ) {
    const response = await Api.createClient().post(
      `/membershipType/add?name=${name}&price=${price}&numberOfMonths=${numberOfMonths}`,
    );

    return response.data as undefined;
  }

  public static async editMembership(
    oldName: string,
    newName: string,
    newPrice: number,
    numberOfMonths: number,
  ) {
    const response = await Api.createClient().post(
      `/membershipType/update?oldName=${oldName}&newName=${newName}&newPrice=${newPrice}&numberOfMonths=${numberOfMonths}`,
    );

    return response.data as undefined;
  }

  public static async deleteMembership(id: number) {
    const response = await Api.createClient().delete(
      `/membershipType/delete/${id}`,
    );

    return response.data as undefined;
  }
}
