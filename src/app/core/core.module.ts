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
import {FlexLayoutModule} from '@angular/flex-layout';
import {JwtModule} from '@auth0/angular-jwt';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {RequestInterceptor} from './helpers/http.interceptor';
import {CookieService} from 'ngx-cookie-service';
import {CountPostScorePipe} from '../shared/pipes/count-post-score.pipe';
import {ScrollToModule} from 'ng2-scroll-to';

// Token getter for JWT module
export function tokenGetter() {
    const token = localStorage.getItem('token') || '';
    return token ? token : '';
}

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        LoginComponent,
        RegisterComponent,
        SidebarComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        HttpClientModule,
        FlexLayoutModule,
        ScrollToModule.forRoot(),
        JwtModule.forRoot({
            config: {
                tokenGetter,
                whitelistedDomains: ['localhost:3000', '3.8.219.107:3000'],
                blacklistedRoutes: ['localhost:3000/auth/', '3.8.219.107:3000/auth/']
            }
        }),
        ToastrModule.forRoot(),

    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        },
        CookieService,
        CountPostScorePipe
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        MaterialModule,
    ],
    entryComponents: [
        LoginComponent,
        RegisterComponent
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
