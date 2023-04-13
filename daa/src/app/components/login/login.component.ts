import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: '',
  };

  constructor(  
    private authService: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<LoginComponent>,
    private dialog: MatDialog
  ) {}
  hide = true;

  onSubmit() {
    this.authService.signInUser(this.user)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this.authService.setUserEmail(this.user.email);
          this.dialogRef.close();
          this.authService.getUserRole() === 'client' ? this.router.navigate(['/reservar']) : this.router.navigate(['/dashboard']);
        },
        err => console.log(err)
      )
  }

  openSignupDialog(): void {
    this.dialogRef.close();
    this.dialog.open(RegisterComponent, {});
  }

}
