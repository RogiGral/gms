import axios, { AxiosInstance } from 'axios';
import Session from './Session';
import Auth from './requests/auth';

export const BASE_API_URL = 'http://localhost:8081';

export default class Api {
  public static Auth = Auth;

  public static createClient(): AxiosInstance {
    const headers = Api.getHeaders();

    const instance = axios.create({
      baseURL: BASE_API_URL,
      timeout: 10000,
      headers,
    });

    // instance.interceptors.request.use(config => {
    //   if (!Session.isSessionActive()) {
    //     Session.clearSession();
    //     window.location.reload();
    //   } else {65
    //     Session.updateSessionExpTime();
    //   }
    //   return config;
    // });

    return instance;
  }

  public static getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    } as Record<string, string>;
    const token = Session.getSessionToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  }
}
