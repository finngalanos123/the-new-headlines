import {Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MatDialog, MatMenuTrigger} from '@angular/material';
import {AuthService} from '@core/services/auth.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {MAIN_SECTIONS} from '@core/constants/app.config';
import {LoginComponent} from '../login/login.component';
import {SubjectService} from '@core/services/subject.service';
import {RegisterComponent} from '../register/register.component';
import GetCategory from '@core/helpers/get-category';
import {Section} from '@core/models/section';
import {filter} from 'rxjs/operators';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    // private user: SocialUser;
    @ViewChild('closest') closest: ElementRef;
    @ViewChild('authMenu') menu: ElementRef;
    @ViewChild('toggler') menuToggler: ElementRef;
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
    userData: any = {};
    searchForm;
    searchAllowed = false;
    isShown = false;
    show = false;
    sections: Section[] = MAIN_SECTIONS;
    showScrollToTopBtn = false;
    postCategory;
    scrollBttn = false

    userLoggined: any = [];


    constructor(
        private dialog: MatDialog,
        // private authService: authS,
        public auth: AuthService,
        // private common: CommonService,
        private subject: SubjectService,
        public router: Router,
        private route: ActivatedRoute,
        private _fb: FormBuilder,
        private renderer: Renderer2,
    ) {

        this.searchForm = this._fb.group({
            searchTerm: ''
        });

        this.subject.getUserData().subscribe((dt: any) => {
            this.userData.fullName = dt.fullName;
        });
        //
        this.subject.getDialogState().subscribe((dt) => {
            if (dt.state === 'closed') {
                if (dt.dialog === 'login') {
                    this.dialog.open(RegisterComponent);
                } else {

                    this.dialog.open(LoginComponent);
                }
            }
        });


        //
        this.subject.getPostCategory().subscribe(category => {
            this.postCategory = category;
        });


        this.route.data.subscribe(dt => {
            if (dt.hasOwnProperty('search')) {
                this.searchAllowed = dt.search;
            }
        });

        if (!this.userData.fullName) {

            this.userData.fullName = localStorage.getItem('full_name');
        }
    }


    ngOnInit() {


        this.renderer.listen('window', 'click', (e: Event) => {
            if (e.target === this.menuToggler.nativeElement) {
                this.isShown = !this.isShown;
            } else {
                this.isShown = false;
            }
        });

        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((d: NavigationEnd) => {
            this.postCategory = GetCategory.get(d.url);
        });
        // const params: InitParams = {
        //   version: 'v2.8'
        // };
        //
        // this.fb.init(params);
        window.addEventListener('scroll', this.scrollWindow, true);
    }

    scrollWindow = () => {
        let element = event.target as HTMLInputElement;
        let scroll = element.scrollTop
        if (scroll > 1520) {
            this.scrollBttn = true
        } else {
            this.scrollBttn = false
        }
    }


    openMyMenu() {
        this.trigger.openMenu();
    }

    // search(keyword) {
    //   var searchArr = JSON.parse(JSON.stringify(this.baseArr));
    //
    //   searchArr = searchArr.filter(val => {
    //     return val.extractedDescription.search(keyword) > -1 || keyword === '';
    //   });
    //
    //   this.fakeArr = searchArr;
    // }

    hideDiv(trigger) {
        if (trigger) {
            trigger.closeMenu();
        }
        this.isShown = false;
    }

    goToLink(section: Section) {
        this.subject.setPostCategory(section);
        this.checkConfirmation(section.route);
    }


    showAuthDialog() {
        const dialogRef = this.dialog.open(LoginComponent, {
            width: '500px',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    doSearch() {
        // this.subject.setSearch(this.searchForm.value['searchTerm']);
    }

    checkConfirmation(link) {
        if (this.router.url === '/add-post') {

            const c = confirm('Are you sure you want to discard the post?');
            if (c) {
                this.router.navigate([`posts/${link}`]);
            } else {
                this.router.navigate(['/add-post']);
            }

            return false;
        } else {

            this.router.navigate([`posts/${link}`]);
            window.scrollTo(0, 0);
            return true;
        }
    }

    logOut(): void {
        // this.authService.signOut();
        localStorage.setItem('userInf', '');
        localStorage.setItem('token', '');
        localStorage.setItem('full_name', '');
        this.router.navigate(['/']);
    }

    openDialog(term): void {
        // const dialogRef = this.dialog.open(FeedbackComponent, {
        //   width: '500px',
        //   data: {
        //     name: term
        //   }
        // });
        //
        // dialogRef.afterClosed().subscribe(result => {
        //   console.log('The dialog was closed');
        // });
    }
}
