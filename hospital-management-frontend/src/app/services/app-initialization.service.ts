import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AppInitializationService {
  constructor(private cookieService: CookieService) {}

  initializeApp(): () => Promise<void> {
    return () => new Promise((resolve) => {
      // This code will only execute in the client (browser) side
      if (typeof window !== 'undefined') {
        const myToken = this.cookieService.get('jwt_token'); // Get token from cookies
        if (myToken) {
          // Logic to set the token if needed
        }
      }
      resolve();
    });
  }
}