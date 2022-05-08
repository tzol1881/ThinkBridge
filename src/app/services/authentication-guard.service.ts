import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuardService implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (!sessionStorage.getItem('userId')) {
            this.router.navigate(['']);
            return false
        }
        return true
    }
}
