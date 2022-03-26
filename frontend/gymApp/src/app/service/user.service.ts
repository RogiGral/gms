import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user_model";
import {CustomHttpRespone} from "../model/custom-http-response_model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host = environment.apiUrl

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[] | HttpErrorResponse>{
    return  this.http.get<User[]>(`${this.host}/user/list`);
  }
  public addUser(formdata: FormData): Observable<User | HttpErrorResponse>{
    return  this.http.post<User>(`${this.host}/user/add`,formdata);
  }
  public updateUser(formdata: FormData): Observable<User | HttpErrorResponse>{
    return  this.http.post<User>(`${this.host}/user/update`,formdata);
  }
  public resetPassword(email: string): Observable<CustomHttpRespone | HttpErrorResponse>{
    return this.http.get<CustomHttpRespone>(`${this.host}/user/resetpassword/${email}`)
  }
  public setPassword(email: string, password: string): Observable<any | HttpErrorResponse>{
    return this.http.get<any>(`${this.host}/user/setpassword/${email}/${password}`)
  }
  public deleteUser(userId: number): Observable<CustomHttpRespone | HttpErrorResponse>{
    return this.http.delete<CustomHttpRespone>(`${this.host}/user/resetpassword/${userId}`)
  }
  public addUsersToLocalCache(users: User[]): void{
    localStorage.setItem('users',JSON.stringify(users));
  }
  public getUsersFromLocalStorage(): User[] | null{
    if(localStorage.getItem('users')){
      return JSON.parse(localStorage.getItem('users') || '{}');
    }
    return null;
  }

  public createUserFormDate(loggedInUsername: string, user: User, profileImage: File): FormData {
      const formData = new FormData();
      formData.append('currentUsername', loggedInUsername);
      formData.append('firstName', user.firstName);
      formData.append('lastName', user.lastName);
      formData.append('username', user.username);
      formData.append('email', user.email);
      formData.append('role', user.role);
      formData.append('profileImage', profileImage);
      formData.append('isActive', JSON.stringify(user.active));
      formData.append('isNonLocked', JSON.stringify(user.notLocked));
      return formData;
   }


}
