import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from  '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtService } from './core/services/jwt.service';
import { AuthService } from './core/services/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  role!: string;
  hide = true;
  form: any;
  data: any;
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder;
    this.initForm();
  }
  initForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      mobile: ['', Validators.required],
    });
  }
  onSubmit() {
    // this.router.navigate(['live-test']);
    if (this.form.status === 'INVALID') {
      return;
    }

    this.authService.login(this.form.value).subscribe((data) => {
     
      this.data = data;
      this.role = this.data.user.role;
      this.jwtService.setToken(this.data.token);
      window.sessionStorage.setItem('id', this.data.user._id);
      window.sessionStorage.setItem('image', this.data.user.image);
      window.sessionStorage.setItem('role', this.role);
      window.sessionStorage.setItem('lastLogin', this.data.lastLogin);
      window.sessionStorage.setItem('name', this.data.user.name);
      window.sessionStorage.setItem('mobile', this.data.user.mobile);
      window.sessionStorage.setItem('email', this.data.user.email);

      if (this.role === 'ADMIN') {
        this.router.navigate(['admin']);
      }
      else if (this.role === 'DATA_ENTRY') {
        this.router.navigate(['bank']);
      }
      else if (this.role === 'USER') {
        this.router.navigate(['users']);
      }
      console.log(this.data.user.status);
        },
        (err) => this.errorHandler(err, 'Invalid Credentials!')
      );
    }

    private errorHandler(error: any, message: string) {
      this.snackbar.open(message, 'Error', {
        duration: 2000,
      });
    }
  

}