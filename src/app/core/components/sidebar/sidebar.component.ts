import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    @Output('closeSidebar') closeSidebar = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    closeSidenav() {
        this.closeSidebar.emit();
    }

}
