import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Observable } from 'rxjs';
import { Forgotpass } from '../_models/forgotpass';
import { Resetpass } from '../_models/resetpass';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated: any;

  private baseUrl: String = 'https://localhost:7193/api/Authenticate/';
  private userPayload: any;

  constructor( private http: HttpClient, ) {}

signUp(user: User){
  return this.http.post(
    'https://localhost:7193/api/Authenticate/register',user,
    {responseType: 'text'}
  );
}

login(user : User): Observable<string>{
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

roleMatch(allowedRoles: any){
  var isMatch = false;
  var userRole: any = this.getRole();
  allowedRoles.forEach((element: any) => {
    if(userRole == element){
      isMatch = true;
      return false;
    }
    return isMatch;
    
  });

}


getToken(){
  return localStorage.getItem("authToken");
}

decodedToken(){
  const jwtHelper = new JwtHelperService();
  const token = this.getToken()!;
  console.log(jwtHelper.decodeToken(token))
  return jwtHelper.decodeToken(token);
}

  // isloggedIn() {
  //   return !!localStorage.getItem('userToken');
  // }

  getRole() {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken: any = jwtHelper.decodeToken(token);
      return decodedToken.role;
    }
    return null;
  }


}
