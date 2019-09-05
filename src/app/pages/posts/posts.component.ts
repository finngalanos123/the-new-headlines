import {Component, OnInit} from '@angular/core';
import {PostsService} from '../../core/services/posts.service';
import {Router} from '@angular/router';
import GetCategory from '../../core/helpers/get-category';
import {SubjectService} from '../../core/services/subject.service';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
    selectedSection;
    posts;
    filteredPosts: any = {news: []};

    constructor(
        private postsService: PostsService,
        public router: Router,
        private subject: SubjectService
    ) {
    }

    ngOnInit() {
        this.getCategory();

        this.subject.getPostCategory().subscribe(category => {
            this.selectedSection = category;
            this.getPosts();
        });

        this.getPosts();

    }

    getCategory() {
        this.selectedSection = GetCategory.get(this.router.url);
    }

    getPosts() {
        if (this.selectedSection) {
            this.postsService.getPostsByCategory(this.selectedSection.dbName).subscribe((data: any) => {
                this.posts = data;
                this.filteredPosts.news = data.news;
            });
        }
    }

}
