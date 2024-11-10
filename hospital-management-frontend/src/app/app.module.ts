import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    PatientsListComponent,
    AppointmentsListComponent,
    DoctorsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatListModule,
    MatTableModule,
    MatFormFieldModule,
    MatLabel,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatSort
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
