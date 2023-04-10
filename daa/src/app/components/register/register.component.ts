import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'
import { DialogRef } from '@angular/cdk/dialog';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    email: '',
    password: '',
    role: ''
  }

  constructor(
    public authService: AuthService,
    public router: Router,
    public dialogRef: DialogRef
    ) { }

  hide = true;

  onSubmit(): void {
    this.authService.signUpUser(this.user)
      .subscribe(
        res => {
          console.log(res);
          console.log(this.user)
          localStorage.setItem('token', res.token);
          this.dialogRef.close();
        },
        err => console.log(err)
      )
  }
}
