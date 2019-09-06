import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PostsRoutingModule} from './posts-routing.module';
import {ListComponent} from './list/list.component';
import {SingleComponent} from './single/single.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [ListComponent, SingleComponent],
    imports: [
        CommonModule,
        PostsRoutingModule,
        SharedModule
    ]
})
export class PostsModule {
}
