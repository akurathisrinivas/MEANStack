import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TestNavComponent } from './components/test-nav/test-nav.component';
import { LayoutModule } from '@angular/cdk/layout';

import { MatSidenavModule } from '@angular/material/sidenav';

import { AdminComponent } from './admin.component';
import { MatBadgeModule } from '@angular/material/badge';


import { MaterialModule } from 'src/app/shared/material/material.module';
import { StudentsComponent } from './components/students/students.component';
import { NewStudentComponent } from './components/students/new-student/new-student.component';
import { StatesComponent } from './components/states/states.component';
import { NewStateComponent } from './components/states/new-state/new-state.component';
import { OrgnaisationsComponent } from './components/orgnaisations/orgnaisations.component';
import { NewOrganaisationComponent } from './components/orgnaisations/new-organaisation/new-organaisation.component';
import { CentersComponent } from './components/centers/centers.component';
import { NewCenterComponent } from './components/centers/new-center/new-center.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TestNavComponent,
    AdminComponent,
    StudentsComponent,
    NewStudentComponent,
    StatesComponent,
    NewStateComponent,
    OrgnaisationsComponent,
    NewOrganaisationComponent,
    CentersComponent,
    NewCenterComponent,

    
   
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    MaterialModule,
    MatSidenavModule,
    MatBadgeModule,
    
   
    
    
  ]
})
export class AdminModule { }
