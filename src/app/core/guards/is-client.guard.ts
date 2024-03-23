import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const isClientGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  return inject(AuthService).isAdmin() ? router.navigate(['/admin']) : true
};
