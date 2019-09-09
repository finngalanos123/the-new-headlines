import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SingleComponent} from './single/single.component';
import {ListComponent} from './list/list.component';
import {AuthGuard} from '@core/guards/auth.guard';
import {SavePostComponent} from './save-post/save-post.component';
import {ManageUserPostsComponent} from './manage-user-posts/manage-user-posts.component';
import {AboutComponent} from './about/about.component';

const routes: Routes = [
    {
        path: 'single/:id',
        component: SingleComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'add',
        component: SavePostComponent
    },
    {
        path: 'manage',
        component: ManageUserPostsComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'policy',
        component: AboutComponent
    },
    {
        path: ':id/edit',
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
