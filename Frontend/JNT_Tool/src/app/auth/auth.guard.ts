// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
 
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router) {
   
  }
 
  canActivate(){
    if(this.auth.isLoggedIn())
    {
      return true;
    }
   
    this.router.navigate(['/login']);
    return false;
   
  }
}
