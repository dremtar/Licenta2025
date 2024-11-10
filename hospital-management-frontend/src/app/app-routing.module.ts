import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';
import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';
import { PatientsListComponent } from './components/patients-list/patients-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/doctors-list', pathMatch: 'full' },
  { path: 'doctors-list', component:  DoctorsListComponent},
  { path: 'appointments-list', component:  AppointmentsListComponent},
  { path: 'patients-list', component:  PatientsListComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
