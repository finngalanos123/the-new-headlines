import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AuthService} from '@core/services/auth.service';
import {Router} from '@angular/router';
import {PostsService} from '@core/services/posts.service';
import {SubjectService} from '@core/services/subject.service';
import {ReportComponent} from '../report/report.component';

@Component({
    selector: 'app-post-options',
    templateUrl: './post-options.component.html',
    styleUrls: ['./post-options.component.scss']
})
export class PostOptionsComponent implements OnInit {

    @ViewChild('toggleButton') toggleButton: ElementRef;
    @ViewChild('share') share: ElementRef;
    @Input() single;
    @Input() singlePostPage = false;

    isShown = false;
    currentPost = {};
    openNum: boolean;
    animal: string;
    name: string;

    constructor(
        private renderer: Renderer2,
        public dialog: MatDialog,
        public auth: AuthService,
        public router: Router,
        private post: PostsService,
        private subject: SubjectService
    ) {
        this.renderer.listen('window', 'click', (e: Event) => {
            if (this.toggleButton && e.target !== this.toggleButton.nativeElement) {
                this.isShown = false;
                // console.log('window click');
            }
        });

        this.openNum = false;

    }

    openDialog(id): void {
        const dialogRef = this.dialog.open(ReportComponent, {
            width: '250px',
            data: {id: id}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.animal = result;
        });
    }

    ngOnInit() {
    }

    toggleShow(single) {
        this.isShown = !this.isShown;
        this.currentPost = single;
    }

    copyLink(link, input) {

        if (navigator.userAgent.match(/ipad|ipod|iphone/i) || navigator.platform.includes('Mac')) {
            let editable = input.contentEditable;
            let readOnly = input.readOnly;

            input.contentEditable = true;
            input.readOnly = false;

            let range = document.createRange();
            range.selectNodeContents(input);

            let selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);

            input.setSelectionRange(0, 999999);
            input.contentEditable = editable;
            input.readOnly = readOnly;

            document.execCommand('copy');
        } else {

            input.select();
            document.execCommand('copy');
        }
    }

    incrementShares(e) {
        ++this.single.shares;
        this.subject.setPostScore(++this.single.score);
        this.post.updateSharesCount(this.single._id, e.charAt(0).toUpperCase() + e.substring(1)).subscribe(dt => {

        });
    }


}
