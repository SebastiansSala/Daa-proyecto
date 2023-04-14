import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
interface User{
  _id: string;
  email: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  users: User[] = [];

  constructor(private authService: AuthService) {}

  deleteUser(user: any): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.users.indexOf(user);
        if (index >= 0) {
          this.users.splice(index, 1);
        }
        this.authService
          .eliminarUsuario(user._id)
          .subscribe((res) => {
            this.getAllUsers();
          });
        Swal.fire(
          'Deleted!',
          'Usuario borrado.',
          'success'
        )
      }
    })
  }

  getAllUsers(): void {
    this.authService.getAllUsers().subscribe((users: any) => {
      this.users = users;
      console.log(users);
    },
    (error) => console.log(error)
    );
  }

  ngOnInit(){
    this.getAllUsers()
  }

}
