import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      const userRole = this.authService.getUserRole();
      if (userRole === 'client') {
        this.router.navigate(['/reservar']);
      } else if (userRole === 'admin') {
        this.router.navigate(['/dashboard']);
      }
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}