import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../core/services/posts.service';
import {Router} from '@angular/router';
import {SubjectService} from '../../core/services/subject.service';
import GetCategory from '../../core/helpers/get-category';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

    selectedSection;
    posts: any = [];
    page = 1;
    filteredPosts: any = {news: []};
    subscriptions: Subscription[] = [];

    constructor(
        private postsService: PostsService,
        public router: Router,
        private subject: SubjectService
    ) {
    }

    ngOnInit(): void {
        this.getCategory();

        this.subscriptions.push(this.subject.getPostCategory().subscribe(category => {
                this.selectedSection = category;
                this.getPosts();
            })
        );


        this.getPosts();

    }

    getCategory() {
        this.selectedSection = GetCategory.get(this.router.url);
    }

    getPosts() {
        if (this.selectedSection) {
            this.subscriptions.push(this.postsService.getPostsByCategory(this.selectedSection.dbName).subscribe((data: any) => {
                    this.posts = data;
                    this.filteredPosts.news = data.news;
                })
            );
        }
    }

    onIntersection(e, index) {
        if (index === this.filteredPosts.news.length - 1) {
            ++this.page;
            this.subscriptions.push(this.postsService.getPostsByCategory(this.selectedSection.dbName, this.page).subscribe((data: any) => {

                    if (data.news.length !== 0) {


                        Array.prototype.push.apply(this.posts.news, data.news);
                        Array.prototype.push.apply(this.filteredPosts.news, data.news);
                        const uniqueArray = this.filteredPosts.news.filter((thing, index) => {
                            return index === this.filteredPosts.news.findIndex(obj => {
                                return JSON.stringify(obj) === JSON.stringify(thing);
                            });
                        });


                        this.filteredPosts.news = uniqueArray;
                    }
                })
            );
        }

    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

}
