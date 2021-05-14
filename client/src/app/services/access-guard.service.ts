import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
   providedIn: 'root'
})
export class AccessGuardService implements CanActivate {
   path: ActivatedRouteSnapshot[];
   route: ActivatedRouteSnapshot;
   constructor(private authService: AuthService, private router: Router) { }

   canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
   ): Observable<boolean> | Promise<boolean> | boolean {
      const requiresLogin = route.data.requiresLogin || false;
      if (requiresLogin) {
         if (!this.authService.isLoggedIn()) {
            this.router.navigate(['login']);
         }
      }
      return true;
   }
}
