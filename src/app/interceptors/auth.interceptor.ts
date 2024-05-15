import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { JwtService } from '../services/jwt/jwt.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtService = inject(JwtService)
  const authToken = jwtService.token;


  // Clone the request and add the authorization header
  if(authToken != '' && authToken != null){
    req = req.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${authToken}`
      }
    });
  }

  // Pass the cloned request with the updated header to the next handler
  return next(req).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        // Handle HTTP errors
        if (err.status === 400) {
          // Specific handling for unauthorized errors         
          console.error('Bad Request:', err);
          // You might trigger a re-authentication flow or redirect the user here
        } else if(err.status == 401){
          // Handle other HTTP error codes
          console.error('Unauthorized', err);
        }
      } else {
        // Handle non-HTTP errors
        console.error('An error occurred:', err);
      }

      // Re-throw the error to propagate it further
      return throwError(() => err); 
    })
  );
};
