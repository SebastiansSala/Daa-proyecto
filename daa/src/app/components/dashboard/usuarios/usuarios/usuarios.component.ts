import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  users: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.authService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  deleteUser(user: any) {
    this.authService.eliminarUsers(user).subscribe(() => {
      this.users = this.users.filter(u => u !== user);
    });
  }

}
