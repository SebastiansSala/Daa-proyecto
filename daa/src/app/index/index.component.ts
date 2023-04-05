import { Component } from '@angular/core';
import { LoginComponent } from '../components/login/login.component';
import { MatDialog} from '@angular/material/dialog';
import { RegisterComponent } from '../components/register/register.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent {
  
  constructor(private dialog: MatDialog){
  }

  hide = true;
  openLoginDialog() {
    this.dialog.open(LoginComponent, {
    });
  }
  openRegisterDialog() {
    this.dialog.open(RegisterComponent, {
    });
  }
}
