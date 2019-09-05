import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PostsComponent } from './posts/posts.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [PostsComponent],
    imports: [
        CommonModule,
        PagesRoutingModule,
        SharedModule
    ]
})
export class PagesModule { }
