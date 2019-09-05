import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../core/modules/material.module';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {SearchNewsPipe} from './pipes/search-news.pipe';
import {GetPostDateFormattedPipe} from './pipes/get-post-date-formatted.pipe';
import {GetUrlBasePipe} from './pipes/get-url-base.pipe';
import {FiltersComponent} from './components/filters/filters.component';
import {StatusBarComponent} from './components/status-bar/status-bar.component';
import {CountPostScorePipe} from './pipes/count-post-score.pipe';
import {PostOptionsComponent} from './components/post-options/post-options.component';
import {ReportComponent} from './components/report/report.component';
import {ShareButtonModule} from '@ngx-share/button';
import {ShareButtonsModule} from '@ngx-share/buttons';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@NgModule({
    declarations: [
        NotFoundComponent,
        SearchNewsPipe,
        GetPostDateFormattedPipe,
        GetUrlBasePipe,
        FiltersComponent,
        StatusBarComponent,
        CountPostScorePipe,
        PostOptionsComponent,
        ReportComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        ShareButtonModule,
        ShareButtonsModule.withConfig({
            debug: true
        }),
        InfiniteScrollModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        InfiniteScrollModule,
        ShareButtonModule,
        NotFoundComponent,
        SearchNewsPipe,
        GetPostDateFormattedPipe,
        GetUrlBasePipe,
        StatusBarComponent,
        PostOptionsComponent
    ]
})
export class SharedModule {
}
