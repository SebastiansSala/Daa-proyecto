import { Component } from '@angular/core';
import { UploadComponent } from './upload/upload.component';
import { MatDialog } from '@angular/material/dialog';
import { ReservationService } from 'src/app/services/reservation.service';
import Swal from 'sweetalert2';

interface Reservation {
  _id: string;
  name: string;
  date: string;
  numOfPeople: number;
  time: string;
  email: string;
}

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.css'],
})
export class ReservacionesComponent {
  colors: string[] = ['#F44336', '#FF9800', '#2196F3', '#4CAF50'];
  reservations: Reservation[] = [];

  constructor(
    private reservationService: ReservationService,
    private dialog: MatDialog
  ) {}

  editReservation(reservation: Reservation) {
    const dialogRef = this.dialog.open(UploadComponent, {
      data: { reservation },
    });
    dialogRef.afterClosed().subscribe((result: Reservation) => {
      if (result) {
        const updatedFields = {
          numOfPeople: result.numOfPeople,
          time: result.time,
        };
        this.reservationService
          .updateReservation(reservation._id, updatedFields)
          .subscribe(() => {
            const index = this.reservations.findIndex(
              (r) => r._id === reservation._id
            );
            if (index >= 0) {
              const updatedReservation: Reservation = {
                ...reservation,
                ...updatedFields,
              };
              this.reservations[index] = updatedReservation;
            }
          });
      }
    });
  }

  removeReservation(reservation: any): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar!',
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.reservations.indexOf(reservation);
        if (index >= 0) {
          this.reservations.splice(index, 1);
        }
        this.reservationService
          .eliminarReservacion(reservation)
          .subscribe((res) => {
            this.getAllReservations();
          });
        Swal.fire('Deleted!', 'Reservacion Borrada.', 'success');
      }
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
