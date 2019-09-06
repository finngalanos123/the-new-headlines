import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PostsRoutingModule} from './posts-routing.module';
import {ListComponent} from './list/list.component';
import {SingleComponent} from './single/single.component';
import {SharedModule} from '../shared/shared.module';
import { SavePostComponent } from './save-post/save-post.component';

@NgModule({
    declarations: [ListComponent, SingleComponent, SavePostComponent],
    imports: [
        CommonModule,
        PostsRoutingModule,
        SharedModule
    ],
})
export class PostsModule {
}
