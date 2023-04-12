import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { CommentService } from 'src/app/services/comment.service';
import { AddComponent } from './add/add/add.component';
import { MatDialog } from '@angular/material/dialog';

interface Comment {
  comentario: string;
  email: string;
}

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})

export class ReservationComponent {

  comments: Comment[] = [];

  allowedHours = ['6pm', '7pm', '8pm', '9pm'];
  numOfPeopleAllowed = [1, 2, 3, 4];

  reservation = {
    date: '',
    time: '',
    numOfPeople: '',
    email: ''
  };

  constructor(public authService: AuthService, private dialog: MatDialog, private reservationService: ReservationService, private commentService: CommentService) { }

  today = new Date();
  day = this.today.getDate();
  month = this.today.getMonth() + 1;
  year = this.today.getFullYear();
  date = `${this.day}/${this.month}/${this.year}`

  onSubmit() {
    this.reservation.email = this.authService.getUserEmail();
    this.reservation.date = this.date;
    this.reservationService.createReservation(this.reservation).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }

  getAllComments(): void {
    this.commentService.getAllComments().subscribe(
      (data: any) => {
        this.comments = data;
      },
      error => console.log(error)
    );
  }

  hide = true;
  openAddDialog() {
    this.dialog.open(AddComponent, {
    });
  }

  ngOnInit(){
    this.getAllComments();
  }
}
