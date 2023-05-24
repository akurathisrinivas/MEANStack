import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';

const routes: Routes = [

  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
   //{path:'dashboard',component:DashboardComponent},

   {
     path: 'admin',
     loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
   },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
