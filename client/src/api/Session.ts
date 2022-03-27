import jwtDecode from 'jwt-decode';
const STORAGE_ACCESS_TOKEN_KEY = 'gms/accessToken';

export default class Session {
  public static saveSession(token: string): void {
    localStorage.setItem(STORAGE_ACCESS_TOKEN_KEY, token);
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

  public static checkIfTokenExpired(token: string): boolean {
    const decoded = jwtDecode(token);
    console.log('decoded: ', decoded);
    return true;
  }
}
