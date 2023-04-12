import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private URL = 'http://localhost:4000/api';
  constructor(private http: HttpClient) { }

  createComment(comment: any): Observable<any> {
    return this.http.post<any>(this.URL + '/comments', comment);
  }
  
  getAllComments(): Observable<any> {
    return this.http.get<any>(this.URL + '/comments');
  }
  
}
