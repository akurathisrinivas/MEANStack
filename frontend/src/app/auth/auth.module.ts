import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    HttpClientModule,
  ]
})
export class AuthModule { }
