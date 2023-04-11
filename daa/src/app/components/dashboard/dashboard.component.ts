import { Component} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './add/add.component';
import { UploadComponent } from './upload/upload.component';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationService } from 'src/app/services/reservation.service';

Chart.register(...registerables);

interface Reservation {
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

  add(): void {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '250px',
      data: { name: '', guests: 1, time: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reservations.push(result);
      }
    });
  }

  editReservation(reservation: Reservation) {
    const dialogRef = this.dialog.open(UploadComponent, {
      data: {
        title: 'Edit Reservation',
        reservation: reservation
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.reservations.indexOf(reservation);
        this.reservations[index] = result;
      }
    });
  }

  removeReservation(reservation: Reservation):void {
    const index = this.reservations.indexOf(reservation);
    if (index >= 0) {
      this.reservations.splice(index, 1);
    }
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
