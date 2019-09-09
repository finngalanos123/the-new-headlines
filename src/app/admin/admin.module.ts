import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SharedModule} from '@shared/shared.module';
import { ComplaintsComponent } from './complaints/complaints.component';

@NgModule({
    declarations: [DashboardComponent, ComplaintsComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule
    ]
})
export class AdminModule {
}
