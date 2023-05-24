import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private jwtService: JwtService, private router: Router) {}

  canActivate(): boolean {
    if (window.sessionStorage.getItem('role') === 'ADMIN') {
      return true;
    } 
    else if (window.sessionStorage.getItem('role') === 'DATA_ENTRY') {
      return true;
    }
    else if (window.sessionStorage.getItem('role') === 'USER') {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  canActivateChild(): boolean {
    return this.canActivate();
  }
}

// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { JwtService } from './jwt.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuardService {
//   constructor(private jwtService: JwtService, private router: Router) {}

//   canActivate(): boolean {
//     if (window.sessionStorage.getItem('role') === 'Admin') {
//       this.router.navigate(['/Admin']);
//       return true;
//     } else if (window.sessionStorage.getItem('role') === 'Receptionist') {
//       this.router.navigate(['/Receptionist']);
//       return true;
//     } else {
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }
//   canActivateChild(): boolean {
//     return this.canActivate();
//   }
// }

