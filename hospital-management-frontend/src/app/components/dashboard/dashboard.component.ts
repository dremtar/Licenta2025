import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private authService: AuthService, private router: Router){};
  currentView: string = 'patients'; // Set default view

  // Method to switch between views
  switchView(view: string) {
    this.currentView = view;
  }

  logOut() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
