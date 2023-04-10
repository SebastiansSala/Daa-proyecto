import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

interface Persona {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {

  horarios: any[] = [];
  horarioSeleccionado = '';
  numPersonas: number[] = [1, 2, 3, 4, 5];;

  constructor(private http: HttpClient, public authService: AuthService){
    
  }
}
