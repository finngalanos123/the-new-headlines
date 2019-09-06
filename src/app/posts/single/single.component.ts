import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {VOTE_TYPES} from '../../core/constants/app.config';
import {AuthService} from '../../core/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SubjectService} from '../../core/services/subject.service';
import {CapitalizePipe} from '../../shared/pipes/capitalize.pipe';
import * as JWTDecode from 'jwt-decode';
import {PostsService} from '../../core/services/posts.service';
import {VotesService} from '../../core/services/votes.service';
import * as moment from 'moment';
import {CommentsService} from '../../core/services/comments.service';

@Component({
    selector: 'app-single',
    templateUrl: './single.component.html',
    styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit, OnDestroy {

    @ViewChild('button') toggleButton: ElementRef;
    @ViewChild('share') share: ElementRef;

    isEdit = false;
    postForm: FormGroup;
    userData: any = {};
    subscriptions: Subscription[] = [];
    questions = false;
    show: boolean = false;
    selectedToggleBtn;

    id;
    singlePost: any = [];
    comments: any = [];
    related: any = [];
    addCommentData: any = [];
    start = 0;
    pageCount = 4;
    commentCount = 0;
    showCk = false;
    postId;
    votes = [];
    like = true;
    postOnEnter = true;
    commentEditing = false;
    selectedComment = null;
    selectedCommentType;
    filteredComments;
    showReplyInput = false;
    postCategory: string;

    commentEditForm: FormGroup;

    voteTypes = VOTE_TYPES;

    constructor(
        public auth: AuthService,
        private postsService: PostsService,
        private votesService: VotesService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private subject: SubjectService,
        private renderer: Renderer2,
        private capitalize: CapitalizePipe,
        private commentsService: CommentsService
    ) {
        this.id = this.route.snapshot.paramMap.get('id');


        // this.postForm.controls.comment.disable();
        //
        this.renderer.listen('window', 'click', (e: Event) => {
            // console.log(e.target);
            // console.log(this.selectedToggleBtn._elementRef.nativeElement);
            // console.log(this.selectedToggleBtn._elementRef.nativeElement !== e.target);


            if (this.selectedToggleBtn) {

                if (this.selectedToggleBtn._elementRef.nativeElement !== e.target) {
                    this.show = false;
                    this.selectedToggleBtn = null;
                } else {
                    this.show = true;
                }
            }

            if (!this.selectedToggleBtn && this.toggleButton && this.share && e.target !== this.toggleButton.nativeElement && e.target !== this.share.nativeElement) {
                this.show = false;
                // console.log('window click');
            }


        });
    }

    ngOnInit() {
        window.scrollTo(50, 500);
        document.body.scrollTop = 200;

        this.postForm = this.fb.group({
            text: ['', Validators.required],
            newsId: '',
            type: 'Comment'
        });

        this.commentEditForm = this.fb.group({
            id: [''],
            text: [''],
            type: ['Comment']
        });


        this.subscriptions.push(
            this.route.params.subscribe(dt => {
                this.postId = dt.id;
                this.getLikesCount();

                if (this.auth.loggedIn()) {
                    this.getComments();
                    this.getPostVotes(this.postId);
                }
                this.postForm.patchValue({newsId: dt.id});
                this.getSinglePost(this.postId);
            })
        );
        this.subscriptions.push(this.subject.getUserData().subscribe((dt: any) => {
            this.userData = dt;
        }));

        // Getting user data from local storage
        this.userData = JWTDecode(localStorage.getItem('token'));
        this.userData.fullName = localStorage.getItem('full_name');
        // this.postForm.patchValue({user: this.userData.fullName});

        // Getting selected comment type passed from previous page
        this.selectedCommentType = this.capitalize.transform(this.route.snapshot.queryParams.type) || 'Comment';
        this.changeCommentType(this.selectedCommentType);

    }

    getLikesCount() {
        this.postsService.getLikesCount(this.postId).subscribe();
    }

    toggleDiv(event, button) {
        this.show = !this.show;
        this.selectedComment = null;
        this.selectedToggleBtn = button;

    }


    getSinglePost(id) {
        this.postsService.getSinglePost(id).subscribe((data: any) => {
            if (data.news && data.news.length > 0) {

                data = data.news[0];
                this.singlePost = data;
                this.postCategory = data.category;
                this.voteTypes = this.voteTypes.filter(t => t['pages'].includes(this.postCategory));
                this.singlePost.score = data.score;

                this.subject.setPostCategory(this.postCategory);
            }
        });
    }

    getPostVotes(id) {
        this.postsService.getPostVotes(id).subscribe((dt: any) => {
            this.votes = dt['votes'];
        });
    }

    addComments() {

        const data = this.postForm.value;

        if (data.type === 'Critics') {
            data.type = 'Question';
        }

        // this.selectedCommentType = 'Comment';
        // this.postForm.patchValue({type: 'Comment'});
        this.commentsService.addComments(data).subscribe((d) => {
            if (!d) {
                return false;
            }

            if (!d['status'] && d['status'] == 0) {
                alert('Empty data!!');
                return false;
            }

            if (d['result']) {

                this.addCommentData.push(d['result']);
            }

            this.getComments();
            this.postForm.patchValue({'text': ''});
        });
    }

    addQuestions() {
        this.selectedCommentType = 'Question';
        this.postForm.patchValue({type: 'Question'});
        this.addComments();
    }

    // checkUser() {
    //     let userLoggined = localStorage.getItem('userInf');
    //     if (typeof userLoggined == 'undefined') {
    //         return false;
    //     }
    //
    //     let userInf = JSON.parse(userLoggined);
    //
    //     if (userInf == null) {
    //         return false;
    //     }
    //
    //     if (userInf['userInf'] == '') {
    //         return false;
    //     }
    //     return true;
    // }
    //
    // loadMyChildComponent() {
    //     this.home.comments({'start': this.start, 'end': this.start + this.pageCount}).subscribe((data) => {
    //
    //         if (this.start > this.commentCount) {
    //             return;
    //         }
    //         //this.comments.push(data['result']);
    //         data['result'].map((single) => {
    //             this.comments.push(single);
    //         });
    //
    //         this.start += data['result'].length;
    //     });
    // }

    vote(type, id) {
        this.votesService.vote(id, type).subscribe(dt => {
            this.getPostVotes(id);
            this.getSinglePost(id);
        });
    }

    onEditorChange(e) {
        if (this.postForm.valid && e.key === 'Enter' && this.postOnEnter) {
            this.addComments();
        }
    }

    getComments() {
        this.postsService.getCommentsForPost(this.postId).subscribe((dt: any) => {
            dt.comments.sort((a, b) => {
                return moment(b['createdAt']).unix() - moment(a['createdAt']).unix();
            });
            this.comments = dt.comments;
            this.filteredComments = dt.comments.filter(c => c.type === this.selectedCommentType);
            this.singlePost.score = this.selectedCommentType === 'Question' ? this.singlePost.score + 2 : ++this.singlePost.score;
        });
    }

    changeCommentType(v) {
        if (v === 'Feedback') {
            v = 'Comment';
        }

        this.questions = v;
        this.selectedCommentType = v;

        if (this.postForm && this.commentEditForm) {
            this.commentEditForm.patchValue({type: v});
            this.postForm.patchValue({type: v});
        }
        this.filteredComments = this.comments.filter(c => c.type === v);
    }

    editComment(c) {
        this.commentEditing = true;
        this.selectedComment = c;
        this.showReplyInput = false;
        this.commentEditForm.patchValue({'text': c.text, id: c._id});
    }

    updateComment() {
        this.commentEditing = false;
        this.selectedComment = null;
        this.commentEditForm.value.type = this.commentEditForm.value.text.replace(/<(.|\n)*?>/g, '').includes('?') ? 'Question' : 'Comment';
        this.commentsService.updateComment(this.commentEditForm.value).subscribe(dt => {
            this.getComments();
        });
    }

    removeComment(id) {
        this.commentsService.deleteComment(id).subscribe(dt => {
            this.getComments();
        });
    }

    getCommentsLen(type) {
        return this.comments.filter(c => c.type === type).length;
    }

    likeComment(id, liked) {
        this.commentsService.likeComment(id, liked).subscribe(dt => {
            this.getComments();
        });
    }

    toggleReplyInput(c) {
        this.showReplyInput = true;
        this.selectedComment = c;
        this.commentEditing = false;
    }

    replyComment() {

    }

    reportComment(c) {
        this.commentsService.reportComment(c).subscribe(dt => {

        });
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

}
