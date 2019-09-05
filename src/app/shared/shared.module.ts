import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../core/modules/material.module';
import {NotFoundComponent} from './components/not-found/not-found.component';

@NgModule({
    declarations: [
        NotFoundComponent,
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
        NotFoundComponent
    ]
})
export class SharedModule {
}
