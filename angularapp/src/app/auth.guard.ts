import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = 
(route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => 
  {
      const authService = inject(AuthService);
      const router = inject(Router);
      return authService.isLoggedIn.pipe(
        take(1),
        map((isLoggedIn: boolean) => {
          if (isLoggedIn) {
            return true;
          } else {
            return router.createUrlTree(['admin/login'], { queryParams: { returnUrl: state.url }});
          }
        })
      );
};
