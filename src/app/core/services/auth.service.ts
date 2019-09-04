import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {API_URL} from '../constants/app.config';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private jwtHelper: JwtHelperService,
        private http: HttpClient
    ) {
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
}
