import { MaterialModule } from './material/material.module';
import { AppointmentComponent } from './appointment/appointment.component';
import { UIModule } from '../shared/ui/ui.module';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { WidgetModule } from '../shared/widgets/widget.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAppointmentComponent } from './appointment/partials/add-appointment/add-appointment.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [DashboardComponent, AddAppointmentComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UIModule,
        WidgetModule,
        PagesRoutingModule,
        MaterialModule,
        NgbModule,
    ],
    entryComponents: [AddAppointmentComponent],
})
export class PagesModule {}
