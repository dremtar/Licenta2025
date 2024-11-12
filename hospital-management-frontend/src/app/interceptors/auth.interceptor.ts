import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Check if we're in a browser environment
  const router = inject(Router);
  const cookieService = inject(CookieService);

  const myToken = cookieService.get('jwt_token');

  // Only add the Authorization header if a token exists
  if (myToken) {
    const cloneRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${myToken}`,
      },
    });
    return next(cloneRequest).pipe(
      catchError((error) => {
        // Check if the error status indicates an expired token
        if (error.status === 401) {
          // If the token has expired, redirect to login
          cookieService.delete('jwt_token'); // Optional: Remove expired token from cookies
          router.navigateByUrl('/login'); // Redirect to login
        }
        return throwError(() => error); // Re-throw the error to be handled elsewhere if needed
      })
    );
  }

  // If no token or in a non-browser environment, just pass the request
  return next(req);
};
