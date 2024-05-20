import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../services/jwt/jwt.service';

export const teacherGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);

  if(jwtService.getRoleFromToken() && jwtService.getRoleFromToken()[2] == 'teacher_class_room'){
    return true;
  }
  router.navigateByUrl("/login")
  return false;
};
