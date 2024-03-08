import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Observable } from 'rxjs';
import { Forgotpass } from '../_models/forgotpass';
import { Resetpass } from '../_models/resetpass';


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

passwordRecovery(forgotpass: Forgotpass){
  return this.http.post(
    'https://localhost:7193/api/Authenticate/ForgotPassword',forgotpass,
    {responseType: 'text'}
  );
}

resetPassword(resetpass: Resetpass){
  return this.http.post(
    'https://localhost:7193/api/Authenticate/ResetPassword',resetpass,
    {observe : 'response'}
  );
}

// isUserLoggedIn(): boolean {
//   return this.isloggedIn;
// }

  // loggedIn() {
  //   return !!localStorage.getItem('userToken');
  // }



}
