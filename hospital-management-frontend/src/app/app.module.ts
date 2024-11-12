import { APP_INITIALIZER, NgModule, NgModuleRef } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authInterceptor } from './interceptors/auth.interceptor';
import { AppInitializationService } from './services/app-initialization.service';

@NgModule({
  declarations: [
    AppComponent,
    PatientsListComponent,
    AppointmentsListComponent,
    DoctorsListComponent,
    LoginPageComponent,
    LayoutComponent,
    DashboardComponent,
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
    MatSort,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (appInitService: AppInitializationService) => appInitService.initializeApp(),
      deps: [AppInitializationService],
      multi: true,
    },  
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),  
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
