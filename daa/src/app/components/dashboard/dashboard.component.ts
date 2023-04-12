import { Component} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { UploadComponent } from './upload/upload.component';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationService } from 'src/app/services/reservation.service';

Chart.register(...registerables);

interface Reservation {
  id: string;
  date: string;
  numOfPeople: number;
  time: string;
  email: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  reservations: Reservation[] = [];

  constructor(private dialog: MatDialog, public authService: AuthService, private reservationService: ReservationService){}

  editReservation(reservation: Reservation) {
    const dialogRef = this.dialog.open(UploadComponent, {
      data: { reservation }
    });
    dialogRef.afterClosed().subscribe((result: Reservation) => {
      if (result) {
        const updatedReservation: Reservation = { ...reservation, ...result };
        this.reservationService.updateReservation(updatedReservation)
          .subscribe(() => {
            const index = this.reservations.indexOf(reservation);
            this.reservations[index] = updatedReservation;
          });
      }
    });
  }
  

  removeReservation(reservation: any):void {
    const index = this.reservations.indexOf(reservation);
    if (index >= 0) {
      this.reservations.splice(index, 1);
    }
    this.reservationService.eliminarReservacion(reservation).subscribe((res) => {
      this.getAllReservations();
    })
  }
  
  getAllReservations(): void {
    this.reservationService.getAllReservations().subscribe(
      (data: any) => {
        this.reservations = data;
      },
      error => console.log(error)
    );
  }

  ngOnInit() {
    this.getAllReservations();
  }
}
