import { UserCredentialApi } from './../shared/services/custom/UserCredential';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public userCredentialApi: UserCredentialApi,
    public router: Router) {
    }
  canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
  ): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    this.userCredentialApi.isAuthenticated();
    if (this.userCredentialApi.isAuthenticated()) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}
