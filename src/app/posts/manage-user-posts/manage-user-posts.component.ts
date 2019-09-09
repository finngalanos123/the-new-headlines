import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationDialogComponent} from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import * as moment from 'moment';
import {MatDialog, MatDialogRef, MatPaginator, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAIN_SECTIONS} from '@core/constants/app.config';
import {PostsService} from '@core/services/posts.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-manage-user-posts',
    templateUrl: './manage-user-posts.component.html',
    styleUrls: ['./manage-user-posts.component.scss']
})
export class ManageUserPostsComponent implements OnInit {

    displayedColumns: string[] = ['extractedImage', 'extractedTitle', 'createdAt', 'actions'];
    dataSource;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    data: any = [];
    selectedValue: string;
    filteredPosts: any = [];
    posts;
    categorySelected = false;
    postForm: FormGroup;

    categories = MAIN_SECTIONS;

    constructor(
        private postsService: PostsService,
        public router: Router,
        private fb: FormBuilder,
        private matDialog: MatDialog,
        // private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
        private toastr: ToastrService
    ) {
    }

    ngOnInit(): void {
        // this.dataSource.paginator = this.paginator;

        this.postForm = this.fb.group({
            description: [null],
            link: [null],
            category: [null, Validators.required],
            video: [false]
        });

        this.postForm.patchValue({category: 0});
    }

    selectCategory(c) {
        this.postsService.getPostsByCategory(c).subscribe((dt: any) => {
            dt['news'].sort((a, b) => {
                return moment(b['createdAt']).unix() - moment(a['createdAt']).unix();
            });
            this.posts = dt;
            this.filteredPosts = new MatTableDataSource(dt.news);
            this.categorySelected = true;
        });
    }

    getPostDate(dt) {
        return moment(dt).format('DD/MM/YYYY');
    }

    getBackgroundUrl(url) {
        return `url(${url})`;
    }

    removePost(id) {
        const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
            data: {
                width: '700px',
                height: '400px'
            }
        });


        dialogRef.afterClosed().subscribe(c => {
            if (c) {
                this.postsService.remove(id).subscribe((dt: any) => {
                    // this.posts = dt;
                    // this.filteredPosts = new MatTableDataSource(dt.news);

                    this.selectCategory(this.postForm.value.category);
                    this.toastr.success('The post has been removed successfully');
                });
            }

        });


    }

    editPost(id) {
        this.router.navigate([`posts/${id}/edit`]);
    }

}
