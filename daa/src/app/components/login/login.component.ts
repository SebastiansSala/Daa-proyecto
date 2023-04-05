import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { DialogRef } from '@angular/cdk/dialog';

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
    public dialogRef: DialogRef
  ) {}
  hide = true;

  onSubmit() {
    this.authService.signInUser(this.user)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
          this.dialogRef.close();
        },
        err => console.log(err)
      )
  }
}
