import Api from '../../Api';
import { GetUsersResponse } from './responses';
import { User, UserRole } from '../../models';

export default class Users {
  public static async getUsers() {
    const response = await Api.createClient().get('/user/list');

    return response.data as GetUsersResponse;
  }

  public static async updateUser(
    username: string,
    firstName: string,
    lastName: string,
    newUsername: string,
    email: string,
    role: UserRole,
    isActive: boolean,
    isNonLocked: boolean,
  ) {
    const response = await Api.createClient().post(
      `/user/update?currentUsername=${username}&firstName=${firstName}&lastName=${lastName}&username=${newUsername}&email=${email}&role=${role}&isActive=${isActive}&isNonLocked=${isNonLocked}`,
    );

    return response.data as undefined;
  }

  public static async deleteUser(id: number) {
    const response = await Api.createClient().delete(`/user/delete/${id}`);

    return response.data as undefined;
  }

  public static async createUser(
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    role: UserRole,
    isActive: boolean,
    isNonLocked: boolean,
  ) {
    const response = await Api.createClient().post(
      `/user/add?username=${username}&firstName=${firstName}&lastName=${lastName}&email=${email}&role=${role}&isActive=${isActive}&isNotLocked=${isNonLocked}`,
    );

    return response.data as undefined;
  }
}
