import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostsService} from '@core/services/posts.service';
import {ToastrService} from 'ngx-toastr';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

    reportForm: FormGroup;
    newsId;

    constructor(
        private fb: FormBuilder,
        private posts: PostsService,
        private toastr: ToastrService,
        public dialogRef: MatDialogRef<ReportComponent>,
        @Inject(MAT_DIALOG_DATA) public data) {
        this.newsId = data['id'];
    }

    ngOnInit(): void {
        this.reportForm = this.fb.group({
            newsId: this.newsId,
            type: ['', Validators.required]
        });
    }

    reportPost() {
        this.posts.report(this.reportForm.value).subscribe((d: any) => {
            this.toastr.success(d.message);
            this.dialogRef.close();
        });
    }


}
