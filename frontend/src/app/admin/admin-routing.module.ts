import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewOrganaisationComponent } from './components/orgnaisations/new-organaisation/new-organaisation.component';
import { OrgnaisationsComponent } from './components/orgnaisations/orgnaisations.component';
import { NewStateComponent } from './components/states/new-state/new-state.component';
import { StatesComponent } from './components/states/states.component';
import { NewStudentComponent } from './components/students/new-student/new-student.component';
import { StudentsComponent } from './components/students/students.component';
import { NewCenterComponent } from './components/centers/new-center/new-center.component';

const routes: Routes = [

  {
    path:'',component:AdminComponent,
    children: [
      { path: '', component: DashboardComponent },
      
      { path: 'students/new-student', component: NewStudentComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'students/:id/edit', component: NewStudentComponent },

      { path: 'states', component: StatesComponent },
      { path: 'states/new-state', component: NewStateComponent },
      { path: 'states/:id/edit', component: NewStateComponent },

      { path: 'organisations', component: OrgnaisationsComponent },
      { path: 'organisations/new-organaisation', component: NewOrganaisationComponent },
      { path: 'organisations/:id/edit', component: NewOrganaisationComponent },

      { path: 'centers/new-center', component: NewCenterComponent },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
