import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, ɵafterNextNavigation } from '@angular/router';
import { AuthService } from '../_services/auth.service';




@Injectable({
  providedIn: 'root'
})


class myAuth{
  constructor( private router: Router, private auth: AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
  
      if(localStorage.getItem('authToken') ){
        let roles = route.data["roles"] as Array<string>;
        if(roles){
          var match: any = this.auth.roleMatch(roles);
          if(match) return true;
          else{
            this.router.navigate(['/shopping']);
            return false;
          }
        }
          return true;
              
      }
      return false;
    
    }
  
}

export const authGuard: CanActivateFn = (route, state) => {
  
  return inject(myAuth).canActivate(route, state);
};


