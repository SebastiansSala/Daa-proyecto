import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'
import { DialogRef } from '@angular/cdk/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('client')
  });

  constructor(
    public authService: AuthService,
    public router: Router,
    public dialogRef: DialogRef
  ) { }

  hide = true;

  onSubmit(): void {
    if (this.userForm.valid) {
      this.authService.signUpUser(this.userForm.value)
        .subscribe(
          res => {
            console.log(res);
            console.log(this.userForm.value)
            localStorage.setItem('token', res.token);
            this.dialogRef.close();
          },
          err => console.log(err)
        );
    }
  }
}
