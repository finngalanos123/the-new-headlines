import {Injectable} from '@angular/core';
import {API_URL} from '../constants/app.config';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import * as JWTDecode from 'jwt-decode';
import {CookieService} from 'ngx-cookie-service';


@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(
        private http: HttpClient,
        private auth: AuthService,
        private cookie: CookieService
    ) {
    }

    getPostsByCategory(category, page = 1) {
        return this.http.get(`${API_URL}/api/news/${this.checkAuth()}category/${category}?pagesize=30&page=${page}`);
    }

    checkAuth() {
        return this.auth.loggedIn() ? 'user/voted/' : '';
    }

    updateSharesCount(id, sMedia) {
        return this.http.post(`${API_URL}/api/news/${id}/shares/${sMedia}`, {});
    }

    updateViewCount(post) {
        const token = localStorage.getItem('token');
        let user: any;
        if (token) {

            user = JWTDecode(localStorage.getItem('token'));

        } else {
            user = {userId: this.cookie.get('uniqueUserId')};
        }
        return this.http.post(`${API_URL}/api/news/${post._id}/views`, {uniqueId: user.userId});
    }
}
