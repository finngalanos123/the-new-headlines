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
import {OwlCarouselComponent} from './components/owl-carousel/owl-carousel.component';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {AsideComponent} from './components/aside/aside.component';
import {CapitalizePipe} from './pipes/capitalize.pipe';
import {StripHtmlTagsPipe} from './pipes/strip-html-tags.pipe';
import { HttpClientJsonpModule } from '@angular/common/http';

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
        OwlCarouselComponent,
        AsideComponent,
        CapitalizePipe,
        StripHtmlTagsPipe,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        ShareButtonModule,
        HttpClientJsonpModule, 
        ShareButtonsModule.withConfig({
            debug: true
        }),
        InfiniteScrollModule,
        CarouselModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        InfiniteScrollModule,
        ShareButtonModule,
        CarouselModule,
        NotFoundComponent,
        SearchNewsPipe,
        GetPostDateFormattedPipe,
        GetUrlBasePipe,
        StripHtmlTagsPipe,
        StatusBarComponent,
        PostOptionsComponent,
        OwlCarouselComponent,
        AsideComponent
    ]
})
export class SharedModule {
}
