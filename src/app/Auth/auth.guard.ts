import { Injectable, inject, ɵɵinject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';



@Injectable({
  providedIn: 'root'
})



class myAuth{
  constructor( private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
     
      if(localStorage.getItem('authToken') ){
      return true;
      }
      return false;
    
    }
  
}

export const authGuard: CanActivateFn = (route, state) => {
  
  return inject(myAuth).canActivate(route, state);
};


