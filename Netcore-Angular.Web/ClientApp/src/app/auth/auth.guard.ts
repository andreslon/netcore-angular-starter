import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const redirectUrl = state.url;

    if (this.auth.isLoggednIn()) {
      return true;
    }

    this.router.navigateByUrl(
      this.router.createUrlTree(['/login'], {
        queryParams: {
          redirectUrl
        }
      })
    );
    // not logged in so redirect to login page with the return url and return false
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
