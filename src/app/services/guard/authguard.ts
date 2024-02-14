
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationServiceService} from '../../services/authentication-service.service';

@Injectable({
    providedIn: 'root'
 })
export class AuthGuard implements CanActivate  {
    
    constructor (public _authService: AuthenticationServiceService,public router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
       
        if (!this._authService.getIsLoggedIn()) {
            this.router.navigate(['login']);  
            return false;
          }
    
          return true;
    }

}