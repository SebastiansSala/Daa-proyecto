import { Component} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AddComponent } from './add/add.component';
import { UploadComponent } from './upload/upload.component';

Chart.register(...registerables);

interface Reservation {
  name: string;
  guests: number;
  time: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private dialog: MatDialog){}
  reservations: Reservation[] = [
    { name: 'Juan', guests: 2, time: '12:00 PM' },
    { name: 'Maria', guests: 4, time: '1:30 PM' },
    { name: 'Pedro', guests: 3, time: '6:00 PM' },
    { name: 'Luisa', guests: 1, time: '8:30 PM' },
  ];

  addReservation(name: string, persons: number, time: string) {
    const newReservation = {
      name: name,
      guests: persons,
      time: time
    };
    this.reservations.push(newReservation);
  }

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
  ngOnInit() {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('No se encontró el elemento canvas.');
      return;
    }

    const data = [5, 10, 7, 12, 9];
    const labels = ['3/10/23', '3/11/23', '3/11/23', '3/12/23', '3/13/23'];

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Reservaciones',
          data: data,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
