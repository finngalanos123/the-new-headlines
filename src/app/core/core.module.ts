import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {throwIfAlreadyLoaded} from './guards/module-imports.guard';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {SharedModule} from '../shared/shared.module';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MaterialModule} from './modules/material.module';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        LoginComponent,
        RegisterComponent,
        SidebarComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        MaterialModule
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
