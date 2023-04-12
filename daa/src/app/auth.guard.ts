import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';
import { INDEX_COMPONENT } from './index/index.component';
import { LoginComponent } from './components/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { IndexComponent } from './index/index.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, @Inject(INDEX_COMPONENT) private index: IndexComponent, private dialog: MatDialog) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles'];
    const userRole = this.authService.getUserRole();
    if (this.authService.loggedIn() && expectedRoles.includes(userRole)) {
      return true;
    } else {
      this.index.hide = true
      this.dialog.open(LoginComponent, {});
      return false;
    }
  }
}
