import Api from '../../Api';
import { AxiosError } from 'axios';
import { LoginResponse } from './responses';

export default class Index {
  public static async register(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
  ) {
    const response = await Api.createClient()
      .post('/user/register', {
        firstName,
        lastName,
        username,
        email,
      })
      .catch((err: AxiosError) => {
        throw new Error(
          err.response?.data.message ||
            'Unknown error when trying to register.',
        );
      });

    return response?.data;
  }

  public static async login(
    username: string,
    password: string,
  ): Promise<LoginResponse> {
    const response = await Api.createClient()
      .post('/user/login', {
        username,
        password,
      })
      .catch((err: AxiosError) => {
        throw new Error(
          err.response?.data.message || 'Unknown error when trying to log in.',
        );
      });

    return response?.data as LoginResponse;
  }
}
