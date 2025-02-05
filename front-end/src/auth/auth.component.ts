import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  username = '';
  password = '';
  token = '';

  constructor(private http: HttpClient) {}

  register() {
    this.http.post('http://localhost:3000/register', { username: this.username, password: this.password })
      .subscribe(response => {
        console.log('Registration successful', response);
      }, error => {
        console.error('Registration failed', error);
      });
  }

  login() {
    this.http.post<{ token: string }>('http://localhost:3000/login', { username: this.username, password: this.password })
      .subscribe(response => {
        this.token = response.token;
        console.log('Login successful', response);
      }, error => {
        console.error('Login failed', error);
      });
  }

  accessProtected() {
    this.http.get('http://localhost:3000/protected', { headers: { Authorization: this.token } })
      .subscribe(response => {
        console.log('Protected route response', response);
      }, error => {
        console.error('Access denied', error);
      });
  }
}