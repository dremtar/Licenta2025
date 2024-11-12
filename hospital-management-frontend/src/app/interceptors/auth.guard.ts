import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);

  const localData = cookieService.get('jwt_token');


  if (localData != null && localData!= "") {
    return true;
  } else {
    router.navigateByUrl('/login'); // Synchronously navigate to login
    return false; // Prevent navigation to the route
  }
};
