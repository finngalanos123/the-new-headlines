import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import IsResponsive from '../../../core/helpers/is-responsive';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

    @Input() section;
    @Output() filter = new EventEmitter();

    selectedFilter = {vote: 'All', type: 'New'};
    filtersShown = true;

    constructor() {
    }

    ngOnInit() {
    }

    filterByVotes(vote) {
        this.selectedFilter.vote = vote;
        this.filtersShown = !IsResponsive.check();
        this.filter.emit(this.selectedFilter);

    }

    filterByType(e) {
        this.selectedFilter.type = e.target.value;
        this.filtersShown = !IsResponsive.check();
        this.filter.emit(this.selectedFilter);
        // this.home.getPostsByVoteType('Influence', this.selectedFilter.vote, this.selectedFilter.type).subscribe((dt: any) => {
        //     this.posts = dt;
        //     this.filteredPosts.news = dt.news;
        //     ScrollUp.do();
        // });
    }

    toggleShow() {
        // this.isShown = !this.isShown;
    }

}
