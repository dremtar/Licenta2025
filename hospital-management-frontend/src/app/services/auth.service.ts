import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { Client, UserLoginDto } from '../models/hospital.model';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:44360/api'; // Update this to match your API URL
  private hospitalClient = new Client(this.http, this.apiUrl);
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  async login(body: UserLoginDto): Promise<boolean> {
    try {
      var response = await firstValueFrom(this.hospitalClient.postLoginUsernamePassword(body));
      if (response && response.token) {
        this.cookieService.set('jwt_token', response.token, { secure: true, sameSite: 'Strict' });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    }
  }

  // Logout method to remove the JWT token from local storage
  logout(): void {
    this.cookieService.delete('jwt_token');
  }

  // Check if the user is authenticated (if a token exists in local storage)
  isAuthenticated(): boolean {
    return !!this.cookieService.get('jwt_token');
  }
}
