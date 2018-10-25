import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private router: Router, private localStorageService: LocalStorageService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        return this.verifyLogin(url);
    }
    verifyLogin(url) {
        if (!this.isLoggedIn()) {
            this.router.navigate(['/signIn']);
            return false;
        }         else if (this.isLoggedIn()) {
            return true;
        }
    }
    isLoggedIn() {
        let status = false;
        if (this.localStorageService.retrieve('isLoggedIn') === 'true') {
          status = true;
        }         else {
          status = false;
        }
        return status;
    }
}