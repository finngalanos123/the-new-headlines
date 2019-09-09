import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotFoundComponent} from '@shared/components/not-found/not-found.component';
import {RoleGuard} from '@core/guards/role.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'posts/home',
        pathMatch: 'full'
    },
    {
        path: 'posts', loadChildren: './posts/posts.module#PostsModule'
    },
    {
        path: 'admin', loadChildren: './admin/admin.module#AdminModule',
        canActivate: [RoleGuard],
        data: {
            expectedRole: 'admin'
        }
    },
    {
        path: '**', component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
