import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private jwtHelper: JwtHelperService
    ) {
    }

    loggedIn() {
        return !this.jwtHelper.isTokenExpired();
    }
}
