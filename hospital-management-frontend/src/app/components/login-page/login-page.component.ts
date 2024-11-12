import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserLoginDto } from '../../models/hospital.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  // Remove the initial formGroup initialization here
  username: string = '';
  password: string = '';

  constructor(public authService: AuthService, private router: Router) {}

  async onLogin(): Promise<void> {
    await this.authService.login(
      new UserLoginDto({ username: this.username, password: this.password })
    );
    if (this.authService.isAuthenticated()) this.router.navigate(['/dashboard']);
  }
}
