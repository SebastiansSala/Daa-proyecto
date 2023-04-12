import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ReservationService {

  private URL = 'http://localhost:4000/api';
  constructor(private http: HttpClient) { }

  createReservation(reservation: any): Observable<any> {
    return this.http.post<any>(this.URL + '/reservations', reservation);
  }
  
  getAllReservations(): Observable<any> {
    return this.http.get<any>(this.URL + '/reservations');
  }

  updateReservation(reservation: any): Observable<any> {
    console.log(reservation);
  return this.http.put(`${this.URL}/reservations/${reservation._id}`, reservation);
}

  eliminarReservacion(reservation: any): Observable<any> {
    return this.http.delete(`${this.URL}/reservations/${reservation._id}`);
  }
}
