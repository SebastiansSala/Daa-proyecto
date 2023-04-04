import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<LoginComponent>,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  hide = true;

  onSubmit(): void {
    const { email, password } = this.loginForm.value;
    this.http.post('/login', { email, password })
      .subscribe((response: any) => {
        console.log(response);
      }, error => {
        console.error(error);
      });
  }

  cancel() {
    this.dialogRef.close();
  }
}
