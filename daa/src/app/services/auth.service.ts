import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:4000/api';
  constructor(private http: HttpClient, private router: Router) { }

  signUpUser(user: any) {
    return this.http.post<any>(this.URL + '/register', user);
  }

  signInUser(user: any) {
    return this.http.post<any>(this.URL + '/login', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/index']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserRole() {
    const token = this.getToken();
    if(!token){
      return 'user'
    }
    const decodedToken: any = jwtDecode(token);
    return decodedToken.role;
  }
}
