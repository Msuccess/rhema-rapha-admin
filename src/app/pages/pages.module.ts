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
import { AddDoctorComponent } from './doctor/partials/add-doctor/add-doctor.component';
import { ProfileComponent } from './profile/profile.component';
import { SecurityComponent } from './profile/partials/security/security.component';
import { EditProfileComponent } from './profile/partials/edit-profile/edit-profile.component';
import { EditDocProfileComponent } from './profile/partials/edit-profile/doctor-edit/edit-doc-profile/edit-doc-profile.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
    declarations: [
        DashboardComponent,
        AddAppointmentComponent,
        AddDepartmentComponent,
        AddPatientComponent,
        AddDoctorComponent,
        ProfileComponent,
        SecurityComponent,
        EditProfileComponent,
        EditDocProfileComponent,
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
        NgApexchartsModule,
    ],
    entryComponents: [
        AddAppointmentComponent,
        AddDepartmentComponent,
        AddPatientComponent,
        AddDoctorComponent,
    ],
})
export class PagesModule {}
