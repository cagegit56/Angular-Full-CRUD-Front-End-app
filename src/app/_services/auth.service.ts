import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated: any;
  static isUserLoggedIn() {
    throw new Error('Method not implemented.');
  }

  private baseUrl: String = 'https://localhost:7193/api/Authenticate/';
  private isloggedIn: boolean;

  constructor( private http: HttpClient, ) { 
    this.isloggedIn = false;
  }

signUp(user: User){
  return this.http.post(
    'https://localhost:7193/api/Authenticate/register',user,
    {responseType: 'text'}
  );
}

login(user : User): Observable<string>{
  this.isloggedIn = true;
  return this.http.post(
    'https://localhost:7193/api/Authenticate/login',user,
    {responseType: 'text'}
  );

  

  

}

isUserLoggedIn(): boolean {
  return this.isloggedIn;
}



  loggedIn() {
    return !!localStorage.getItem('userToken');
  }



}
