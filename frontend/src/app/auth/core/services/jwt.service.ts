import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {


  constructor() { }

  setToken(token: string) {
    window.sessionStorage.setItem('token', token);
  }
  getToken() {
    return window.sessionStorage.getItem('token');
  }
  destroyToken() {
    window.sessionStorage.removeItem('token');
  }
}
