import Api from '../../Api';
import { AxiosError } from 'axios';
import {
  FetchUserResponse,
  LoginResponse,
  RegisterResponse,
  ResetPasswordResponse,
} from './responses';

export default class Auth {
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

    return response?.data as RegisterResponse;
  }

  public static async login(
    username: string,
    password: string,
  ): Promise<[LoginResponse, string]> {
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

    console.log('RESPONSE:', response);
    return [response?.data, response?.headers['jwt-token']] as [
      LoginResponse,
      string,
    ];
  }

  public static async fetchUser(username: string) {
    const response = await Api.createClient()
      .get(`/user/find/${username}`)
      .catch((err: AxiosError) => {
        throw new Error(
          err.response?.data.message || 'Unknown error when fetching user.',
        );
      });

    return response?.data as FetchUserResponse;
  }

  public static async resetPassword(email: string) {
    const response = await Api.createClient()
      .get(`/user/resetpassword/${email}`)
      .catch((err: AxiosError) => {
        throw new Error(
          err.response?.data.message ||
            'Unknown error when resetting password.',
        );
      });

    return response?.data as ResetPasswordResponse;
  }
}
