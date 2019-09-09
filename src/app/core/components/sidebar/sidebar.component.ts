import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    @Output('closeSidebar') closeSidebar = new EventEmitter();

    constructor(
        public router: Router
    ) {
    }

    ngOnInit() {
    }

    closeSidenav() {
        this.closeSidebar.emit();
    }

}
