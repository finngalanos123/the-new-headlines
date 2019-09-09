import {Component} from '@angular/core';
import {Router} from '@angular/router';
import IsResponsive from '@core/helpers/is-responsive';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'New Headlines';
    isResponsive = IsResponsive;
    constructor(
        public router: Router,
    ) {

    }


    getSidenavMode() {
        return IsResponsive.check() ? 'push' : 'side';
    }
}
