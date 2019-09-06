import {Injectable} from '@angular/core';
import {API_URL} from '@core/constants/app.config';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';


@Injectable({
    providedIn: 'root'
})
export class VotesService {

    constructor(
        private http: HttpClient,
        private auth: AuthService,

    ) {
    }

    get(category) {
        return this.http.get(`${API_URL}/api/news/${this.checkAuth()}category/${category}?pagesize=30&page=1`);
    }

    vote(id, voteType) {
        if (voteType === 'Like') {
            return this.http.post(`${API_URL}/api/comments/${id}/likeunlike`, {});
        } else {
            return this.http.post(`${API_URL}/api/news/${id}/vote`, {voteCategory: voteType});
        }
    }

    getDetails(post_id) {
        return this.http.get(`${API_URL}/api/news/${post_id}/votedetails`);
    }



    checkAuth() {
        return this.auth.loggedIn() ? 'user/voted/' : '';
    }
}
