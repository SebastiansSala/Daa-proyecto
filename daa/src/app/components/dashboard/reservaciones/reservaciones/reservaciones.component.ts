import { Component } from '@angular/core';
import { UploadComponent } from './upload/upload.component';
import { MatDialog } from '@angular/material/dialog';
import { ReservationService } from 'src/app/services/reservation.service';

interface Reservation {
  _id: string;
  date: string;
  numOfPeople: number;
  time: string;
  email: string;
}


@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.css']
})

export class ReservacionesComponent {

  colors: string[] = ['#F44336', '#FF9800', '#2196F3', '#4CAF50'];
  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService, private dialog: MatDialog){}

  editReservation(reservation: Reservation) {
    const dialogRef = this.dialog.open(UploadComponent, {
      data: { reservation }
    });
    dialogRef.afterClosed().subscribe((result: Reservation) => {
      if (result) {
        const updatedFields = { numOfPeople: result.numOfPeople, time: result.time };
        console.log(reservation)
        console.log(updatedFields)
        this.reservationService.updateReservation(reservation._id, updatedFields)
          .subscribe(() => {
            const index = this.reservations.findIndex(r => r._id === reservation._id);
            if (index >= 0) {
              const updatedReservation: Reservation = { ...reservation, ...updatedFields };
              this.reservations[index] = updatedReservation;
            }
          });
      }
    });
  }

  removeReservation(reservation: any): void {
    const index = this.reservations.indexOf(reservation);
    if (index >= 0) {
      this.reservations.splice(index, 1);
    }
    this.reservationService
      .eliminarReservacion(reservation)
      .subscribe((res) => {
        this.getAllReservations();
      });
  }

  getAllReservations(): void {
    this.reservationService.getAllReservations().subscribe(
      (data: any) => {
        this.reservations = data;
      },
      (error) => console.log(error)
    );
  }

  ngOnInit() {
    this.getAllReservations();
  }

}
