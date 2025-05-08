import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { switchMap, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.getCurrentUser().pipe(
      switchMap(user => {
        if (!user?.email) return of(this.router.createUrlTree(['/login']));
        return this.authService.getUserDataByEmail(user.email).pipe(
          map(users => {
            const current = users[0];
            if (current?.role === 'admin') return true;
            alert('⛔ Accès refusé : réservée à l’administrateur.');
            return this.router.createUrlTree(['/']);
          })
        );
      })
    );
  }
}
