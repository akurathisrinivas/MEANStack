import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-nav',
  templateUrl: './test-nav.component.html',
  styleUrls: ['./test-nav.component.css']
})
export class TestNavComponent {

  Url = environment.root;
  lastLogin: any;
  image: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {}

  ngOnInit() {
    this.lastLogin = window.sessionStorage.getItem('lastLogin');
    this.image = window.sessionStorage.getItem('image');
  }

 

  logout() {
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
