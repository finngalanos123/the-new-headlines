import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../constants/app.config';

@Injectable({
    providedIn: 'root'
})
export class CommentsService {

    constructor(
        private http: HttpClient,
    ) {
    }

    comments(data) {
        return this.http.post(`${API_URL}/comment`, data);
    }

    addComments(data) {
        return this.http.post(`${API_URL}/api/news/${data.newsId}/comment`, data);
    }


    /*Delete comment*/
    deleteComment(id) {
        return this.http.delete(`${API_URL}/api/comments/${id}`);
    }

    /*Update Comment*/
    updateComment(data) {
        return this.http.put(`${API_URL}/api/comments/${data.id}`, data);
    }

    likeComment(id, liked) {
        if (liked) {
            return this.http.delete(`${API_URL}/api/comments/${id}/likeunlike`, {});
        } else {
            return this.http.post(`${API_URL}/api/comments/${id}/likeunlike`, {});
        }
    }

    reportComment(data) {
        return this.http.put(`${API_URL}/api/comments/${data._id}/report`, data);
    }
}
