import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const isAuthenticatedGuard = (route:ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router)
  return inject(AuthService).isAuthenticated() ? true : router.navigate(['/'])
};
