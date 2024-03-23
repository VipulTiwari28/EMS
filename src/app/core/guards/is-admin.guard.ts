import { inject } from '@angular/core';
import { ActivatedRouteSnapshot,Router,RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const isAdminGuard= (route:ActivatedRouteSnapshot, state: RouterStateSnapshot) =>{
  const router = inject(Router)
  return inject(AuthService).isAdmin() ? true : router.navigate(['/user'])
};
