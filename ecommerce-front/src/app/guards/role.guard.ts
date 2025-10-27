import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/core/auth.service';
import { RoleEnum } from '../models/role.enum';

export const roleGuard = (allowedRoles: RoleEnum[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const role = authService.getUserRole();

    if (role && allowedRoles.includes(role)) {
      return true;
    }

    router.navigate(['/dashboard']).then();
    return false;
  };
};
