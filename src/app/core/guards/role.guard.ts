import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import * as jwtDecode from 'jwt-decode';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(
        public auth: AuthService,
        public router: Router,
        public toastr: ToastrService,
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {

        // expected role is passed from the route config on the data property
        const expectedRole = route.data.expectedRole;
        let tokenPayload = JSON.parse(localStorage.getItem('userInf'));
        let receivedRoles = [];

        if (tokenPayload.hasOwnProperty('roles')) {
            receivedRoles = tokenPayload['roles'].map(r => r.toLowerCase());

            // console.log(receivedRoles.includes(expectedRole))
            // if user isn't authenticated or its role doesn't match current route expected role, showing error and heading to main page
            if (!receivedRoles.includes(expectedRole)) {
                this.toastr.error('', 'You don\'t have permissions to access this page');
                this.router.navigate([this.router.url]);
                return false;
            } else {
                return true;
            }
        }


    }
}
