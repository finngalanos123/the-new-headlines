import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SingleComponent} from './single/single.component';
import {ListComponent} from './list/list.component';
import {AuthGuard} from '../core/guards/auth.guard';
import {SavePostComponent} from './save-post/save-post.component';

const routes: Routes = [
    {
        path: 'single/:id',
        component: SingleComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'add',
        component: SavePostComponent
    },
    {
        path: '**',
        component: ListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostsRoutingModule {
}
