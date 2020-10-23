import { AddDepartmentComponent } from './department/partials/add-department/add-department.component';
import { MaterialModule } from './material/material.module';
import { UIModule } from '../shared/ui/ui.module';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { WidgetModule } from '../shared/widgets/widget.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAppointmentComponent } from './appointment/partials/add-appointment/add-appointment.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddPatientComponent } from './patient/partials/add-patient/add-patient.component';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
    declarations: [
        DashboardComponent,
        AddAppointmentComponent,
        AddDepartmentComponent,
        AddPatientComponent,
    ],
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
    entryComponents: [
        AddAppointmentComponent,
        AddDepartmentComponent,
        AddPatientComponent,
    ],
})
export class PagesModule {}
