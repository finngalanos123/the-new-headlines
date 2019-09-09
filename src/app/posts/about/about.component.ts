import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ABOUT_TABS} from '@core/constants/app.config';
import {Router} from '@angular/router';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewInit {

    @ViewChild('cookie_policy') cookiePolicy;
    policy;

    constructor(
        public router: Router
    ) {
    }

    ngOnInit() {
    }

    getSelectedTab() {
        return ABOUT_TABS.findIndex(t => this.router.url.includes(t.route));
    }

    ngAfterViewInit(): void {
        if (this.cookiePolicy && this.policy) {
            this.cookiePolicy.nativeElement.scrollIntoView();
        }
    }

}
