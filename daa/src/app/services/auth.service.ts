import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = 'http://localhost:4000/api';
  private userEmailKey = 'userEmail';

  constructor(private http: HttpClient, private router: Router) {}

  setUserEmail(email: string): void {
    localStorage.setItem(this.userEmailKey, email);
  }

  getUserEmail(): string {
    return localStorage.getItem(this.userEmailKey) ?? '';
  }

  signUpUser(user: any) {
    return this.http.post<any>(this.URL + '/register', user);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.URL + '/users');
  }

  eliminarUsers(user: any): Observable<any> {
    return this.http.delete(`${this.URL}/users/${user._id}`);
  }

  signInUser(user: any) {
    return this.http.post<any>(this.URL + '/login', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/index');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserRole() {
    const token = this.getToken();
    if (!token) {
      return 'user';
    }
    const decodedToken: any = jwtDecode(token);
    return decodedToken.role;
  }
}
