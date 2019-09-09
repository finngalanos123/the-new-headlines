import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PostsRoutingModule} from './posts-routing.module';
import {ListComponent} from './list/list.component';
import {SingleComponent} from './single/single.component';
import {SharedModule} from '../shared/shared.module';
import { SavePostComponent } from './save-post/save-post.component';
import { ManageUserPostsComponent } from './manage-user-posts/manage-user-posts.component';
import { AboutComponent } from './about/about.component';

@NgModule({
    declarations: [ListComponent, SingleComponent, SavePostComponent, ManageUserPostsComponent, AboutComponent],
    imports: [
        CommonModule,
        PostsRoutingModule,
        SharedModule
    ],
})
export class PostsModule {
}
