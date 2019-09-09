import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@core/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PostsService} from '@core/services/posts.service';
import {ToastrService} from 'ngx-toastr';
import {MAIN_SECTIONS} from '@core/constants/app.config';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-save-post',
    templateUrl: './save-post.component.html',
    styleUrls: ['./save-post.component.scss']
})
export class SavePostComponent implements OnInit, OnDestroy {

    @HostListener('window:beforeunload', ['$event'])
    onWindowClose(event: any): void {
        // Do something

        event.preventDefault();
        event.returnValue = false;

    }

    categories = MAIN_SECTIONS;


    public type: string = 'component';

    public disabled: boolean = false;


    postForm: FormGroup;

    files = [];
    videoLink = false;
    selectedCategory;
    editCase = false;
    postSubmitted = false;
    subscriptions: Subscription[] = [];

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private postsService: PostsService,
        private toastr: ToastrService,
    ) {


    }

    ngOnInit() {
        this.postForm = this.fb.group({
            // description: [null],
            link: [null],
            category: [null, Validators.required],
            video: [false]
        });

        this.postForm.patchValue({category: 0});


        const id = this.route.snapshot.params.id;
        if (id) {
            this.editCase = true;
            this.subscriptions.push(this.postsService.getPost(id).subscribe(dt => {
                    this.postForm.patchValue(dt);
                })
            );
        }


    }


    upload_files() {

        const selectedCategory = this.categories.filter(c => c['dbName'] === this.postForm.value['category']);
        let redirectUrl = '/';
        if (selectedCategory && selectedCategory.length > 0) {
            redirectUrl = 'posts/' + selectedCategory[0]['route'];
        }
        if (this.postForm.valid) {
            if (!this.editCase) {
                this.subscriptions.push(this.postsService.uploadPost(this.postForm.value).subscribe(() => {
                    this.toastr.success('The post has been added successfully');
                    this.router.navigate([redirectUrl]);
                }))

            } else {
                this.subscriptions.push(this.postsService.update(this.route.snapshot.params.id, this.postForm.value).subscribe(() => {
                    this.toastr.success('The post has been updated successfully');
                    this.router.navigate([redirectUrl]);
                }))
            }


        }
    }


    cancelPosting() {
        this.postSubmitted = true;
        this.router.navigate([this.editCase ? 'posts/manage' : '/']);
    }

    getCurrentSection(category) {
        this.selectedCategory = category;
        this.videoLink = category === 'Videos';
        this.postForm.patchValue({video: this.videoLink});
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

}
