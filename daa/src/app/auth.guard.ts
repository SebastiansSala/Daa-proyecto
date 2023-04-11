import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles'];
    const userRole = this.authService.getUserRole();
  
    if (this.authService.loggedIn() && expectedRoles.includes(userRole)) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
  
  
}
