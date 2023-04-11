import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationService } from 'src/app/services/reservation.service';

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

  allowedHours = ['6pm', '7pm', '8pm', '9pm'];
  numOfPeopleAllowed = [1, 2, 3, 4];

  reservation = {
    date: '',
    time: '',
    numOfPeople: '',
    email: ''
  };

  constructor(private reservationService: ReservationService, public authService: AuthService) { }

  onSubmit() {
    this.reservation.email = this.authService.getUserEmail();
    this.reservationService.createReservation(this.reservation).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }
}
