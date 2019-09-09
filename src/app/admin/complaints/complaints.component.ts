import {Component, OnInit} from '@angular/core';
import {SubjectService} from '@core/services/subject.service';
import {ComplaintsService} from '@core/services/complaints.service';

@Component({
    selector: 'app-complaints',
    templateUrl: './complaints.component.html',
    styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit {

    columns = ['extractedTitle', 'link', 'category', 'type', 'actions'];
    complaints;

    constructor(
        private complaintsService: ComplaintsService,
        private subject: SubjectService
    ) {
    }

    ngOnInit() {
        this.getComplaints({});
    }

    getComplaints(params) {

        this.complaintsService.get(params).subscribe(dt => {
            this.complaints = dt;
            this.subject.setTableData({data: dt, type: params.type});
        });
    }
}
