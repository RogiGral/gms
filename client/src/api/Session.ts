import jwtDecode from 'jwt-decode';
const STORAGE_ACCESS_TOKEN_KEY = 'gms/accessToken';
const STORAGE_TOKEN_EXP_DATE_KEY = 'gms/tokenExpDate';

export default class Session {
  public static saveSession(token: string): void {
    localStorage.setItem(STORAGE_ACCESS_TOKEN_KEY, token);

    const decoded = jwtDecode(token);
    console.log('decoded token:', decoded);

    // @ts-ignore
    localStorage.setItem(STORAGE_TOKEN_EXP_DATE_KEY, decoded.exp);
  }

  public static clearSession(): void {
    localStorage.clear();
  }

  public static getSessionToken(): string | null {
    const token = localStorage.getItem(STORAGE_ACCESS_TOKEN_KEY);
    if (token === 'undefined' || !token) {
      return null;
    }
    return token;
  }

  public static checkIfTokenExpired(): boolean {
    const expDate = localStorage.getItem(STORAGE_TOKEN_EXP_DATE_KEY);

    if (expDate) {
      return new Date(expDate) < new Date();
    }

    return true;
  }
}
