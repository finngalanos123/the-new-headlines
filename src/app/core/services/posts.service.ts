import {Injectable} from '@angular/core';
import {API_URL} from '@core/constants/app.config';
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

    getPostsByVoteType(category, filter) {
        if (filter.vote !== 'All') {
            return this.http.get(`${API_URL}/api/news/${this.checkAuth()}category/${category}/vote/${filter.vote}?filter=${filter.type}&pagesize=30&page=1`);
        } else {
            return this.http.get(`${API_URL}/api/news/${this.checkAuth()}category/${category}?filter=${filter.type}&pagesize=30&page=1`);
        }
    }

    getTopNews(category) {
        return this.http.get(`${API_URL}/api/news/${this.checkAuth()}category/${category}?pagesize=10&page=1&filter=Score`);
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

    getLikesCount(id) {
        return this.http.get(`${API_URL}/api/comments/${id}/likeunlike`);
    }

    getSinglePost(id) {
        return this.http.get(`${API_URL}/api/news/${id}/votedetails`);
    }

    getPostVotes(id) {
        return this.http.get(`${API_URL}/api/news/${id}/vote`);
    }

    getCommentsForPost(id) {
        return this.http.get(`${API_URL}/api/news/${id}/comments/?pagesize=100&page=1`);
    }

    getPost(id) {
        return this.http.get(`${API_URL}/api/news/${id}`);
    }

    uploadPost(data) {
        return this.http.post(`${API_URL}/api/news`, data);
    }

    update(id, data) {
        return this.http.put(`${API_URL}/api/news/${id}`, data);
    }

    remove(id) {
        return this.http.delete(`${API_URL}/api/news/${id}`);
    }

    report(data) {
        return this.http.post(`${API_URL}/api/general/reports`, data);
    }

}
