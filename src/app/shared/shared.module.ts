import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../core/modules/material.module';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {SearchNewsPipe} from './pipes/search-news.pipe';
import {GetPostDateFormattedPipe} from './pipes/get-post-date-formatted.pipe';
import {GetUrlBasePipe} from './pipes/get-url-base.pipe';
import { FiltersComponent } from './components/filters/filters.component';

@NgModule({
    declarations: [
        NotFoundComponent,
        SearchNewsPipe,
        GetPostDateFormattedPipe,
        GetUrlBasePipe,
        FiltersComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        NotFoundComponent,
        SearchNewsPipe,
        GetPostDateFormattedPipe,
        GetUrlBasePipe
    ]
})
export class SharedModule {
}
