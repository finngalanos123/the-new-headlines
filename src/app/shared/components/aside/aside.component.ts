import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material';
import {SubjectService} from '@core/services/subject.service';
import {Router} from '@angular/router';
import {PostsService} from '@core/services/posts.service';
import GetCategory from '@core/helpers/get-category';


@Component({
    selector: 'app-aside',
    templateUrl: './aside.component.html',
    styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

    selectedSection;

    constructor(
        private  postsService: PostsService,
        public router: Router,
        private subject: SubjectService
    ) {
    }

    posts: any = [];
    filteredPosts: any = [];
    defaultRecords = 3;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit() {

        this.getCategory();

        this.subject.getPostCategory().subscribe(category => {
            this.selectedSection = category;
            this.getTopNews();
        });

        this.getTopNews();
    }

    getSingle(id) {
        this.router.navigate(['/posts', id]);
    }

    getTopNews() {
        this.postsService.getTopNews(this.selectedSection.dbName).subscribe((data: any) => {
            this.posts = data;
            this.filteredPosts.news = data.news.slice(0, this.defaultRecords);
        });
    }

    getCategory() {
        this.selectedSection = GetCategory.get(this.router.url);
    }

    strip_tags(str) {
        return str ? str.replace(/<[^>]*>/g, '') : str;
    }

    handle(e) {
        this.filteredPosts.news = this.posts.news.slice(e.pageIndex * e.pageSize,
            e.pageIndex * e.pageSize + e.pageSize);
    }

    getLength(d) {
        return d ? d.length : 0;
    }

}
