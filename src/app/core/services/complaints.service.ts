import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '@core/constants/app.config';

@Injectable({
    providedIn: 'root'
})
export class ComplaintsService {

    constructor(
        private http: HttpClient
    ) {
    }

    get(data) {
        return this.http.get(`${API_URL}/api/general/reports`, {params: data});
    }

    approve(id, status) {
        return this.http.put(`${API_URL}/api/general/reports/${id}`, {status});
    }

    decline(id, status) {
        return this.http.put(`${API_URL}/api/general/reports/${id}`, {status});
    }
}
