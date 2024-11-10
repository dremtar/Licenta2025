import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentView: string = 'patients'; // Set default view

  // Method to switch between views
  switchView(view: string) {
    this.currentView = view;
  }
}
