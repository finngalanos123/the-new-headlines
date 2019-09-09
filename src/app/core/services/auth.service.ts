import {Injectable} from '@angular/core';
import {API_URL} from '@core/constants/app.config';
import {HttpClient} from '@angular/common/http';

// JWT helper
import {JwtHelperService} from '@auth0/angular-jwt';
import * as jwtDecode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    userData;

    constructor(
        private jwtHelper: JwtHelperService,
        private http: HttpClient
    ) {
        // Receiving user data from here!!!!
        if (this.loggedIn()) {
            this.userData = JSON.parse(localStorage.getItem('userInf'));
        }
    }


    authenticate(data) {
        return this.http.post(`${API_URL}/api/user/login`, data);
    }

    register(data) {
        return this.http.post(`${API_URL}/api/user/signup`, data);
    }

    loggedIn() {
        return !this.jwtHelper.isTokenExpired();
    }

    checkRoles(role: string) {
        if (this.loggedIn() && this.userData) {
            if (this.userData.hasOwnProperty('roles')) {
                return this.userData.roles.filter(r => r.toLowerCase() === role).length > 0;
            }
            return false;
        }
        return false;
    }
}
