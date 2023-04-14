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
      const user = {
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        role: this.userForm.value.role
      };
      this.authService.signUpUser(user)
        .subscribe(
          res => {
            localStorage.setItem('token', res.token);
            this.dialogRef.close();
          },
          err => console.log(err)
        );
  }
}
}
