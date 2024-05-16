import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../services/jwt/jwt.service';

export const authGuard: CanActivateFn = (route, state) => {

  const jwtService = inject(JwtService);
  const router = inject(Router);
  const token = sessionStorage.getItem('token')

  if(token == null){
    return true;
  }
  router.navigateByUrl("/home")
  return false;
};
