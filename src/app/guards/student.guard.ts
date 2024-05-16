import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../services/jwt/jwt.service';
import { inject } from '@angular/core';

export const studentGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);

  if(jwtService.getRoleFromToken() && jwtService.getRoleFromToken()[2] == 'student_class_room'){
    return true;
  }
  router.navigateByUrl("/login")
  return false;
};
