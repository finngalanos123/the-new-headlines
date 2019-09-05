import {Injectable} from '@angular/core';
import {API_URL} from '../constants/app.config';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(
        private http: HttpClient,
        private auth: AuthService
    ) {
    }

    getPostsByCategory(category) {
        return this.http.get(`${API_URL}/api/user/news/${this.checkAuth()}category/${category}?pagesize=30&page=1`);
    }

    checkAuth() {
        return this.auth.loggedIn() ? 'user/voted/' : '';
    }
}
