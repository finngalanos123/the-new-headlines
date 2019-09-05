import {Component, EventEmitter, Input, OnInit, Output, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {SubjectService} from '../../../core/services/subject.service';
import {AuthService} from '../../../core/services/auth.service';
import {VOTE_TYPES} from '../../../core/constants/app.config';
import * as JWTDecode from 'jwt-decode';
import {ToastrService} from 'ngx-toastr';
import {VotesService} from '../../../core/services/votes.service';
import {CookieService} from 'ngx-cookie-service';
import {CountPostScorePipe} from '../../pipes/count-post-score.pipe';
import {PostsService} from '../../../core/services/posts.service';

@Component({
    selector: 'app-status-bar',
    templateUrl: './status-bar.component.html',
    styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {

    @Input() single;
    @Output() voted = new EventEmitter();

    isShown: boolean = false;
    openNum: boolean;
    routerUrl: string;
    upwote = false;
    votes = [];
    userData;
    postCategory;
    voteTypes = VOTE_TYPES;
    postScore = 0;

    constructor(
        private renderer: Renderer2,
        public router: Router,
        public auth: AuthService,
        private subject: SubjectService,
        private countScore: CountPostScorePipe,
        private toastr: ToastrService,
        private votesService: VotesService,
        private postsService: PostsService
    ) {
        this.openNum = false;
    }

    ngOnInit() {
        this.routerUrl = this.router.url;

        const token = localStorage.getItem('token');
        if (token) {
            this.userData = JWTDecode(token);
        }

        this.subject.getPostScore().subscribe(score => {
            this.postScore = score;
        });

        if (this.single) {
            this.postCategory = this.single.category;
            this.postScore = this.single.score;
            this.voteTypes = this.voteTypes.filter(t => {
                return t['pages'].includes(this.postCategory);
            });
        }
    }

    get() {
        this.votesService.get(this.postCategory).subscribe((data: any) => {

            this.votes = data;
        });
    }


    vote(type, single) {
        if (type === 'Like') {
            this.upwote = !this.upwote;
        }

        if (type === 'TheHuman') {
            type = 'LoveTheHuman';
        }


        if (this.auth.loggedIn()) {


            if (type !== single['votedCategory']) {

                this.isShown = true;
                this.votesService.vote(single._id, type).subscribe(dt => {
                    // this.voted.emit();
                    this.votesService.getDetails(single._id).subscribe((d: any) => {
                        if (!single.userVoted) {
                            ++single.totalVotes;
                        }

                        if (d.news && d.news.length > 0) {
                            this.single = d.news[0];
                            this.postScore = this.single.score;
                        }
                    });
                });
            }
        } else {
            this.toastr.error('', 'Please log in first!');
        }


    }

    getSingle(single, commentsType) {
        this.postsService.updateViewCount(single).subscribe((dt: any) => {
            this.postScore = dt.score;
            this.router.navigate(['/post', single._id], {queryParams: {type: commentsType}});
        });
    }

    showHeart(name) {
        return name === 'TheHuman' || name === 'TheColor';
    }

    loveCase(name) {
        return name === 'Love';
    }

    hiddenQuestions() {
        return /road|deals|travel/i.test(this.routerUrl) || /StyleAndSweat|HumanStories|LoveDesigns/i.test(this.postCategory);
    }


    hiddenComments() {
        return /commerce/i.test(this.routerUrl) || /JumpStartups/i.test(this.postCategory);
    }

    hiddenCritics() {
        return !(/road/i.test(this.routerUrl)) && !(/StyleAndSweat/i.test(this.postCategory));
    }

    hiddenFeedback() {
        return !(/JumpStartups/i.test(this.postCategory));
    }

}
