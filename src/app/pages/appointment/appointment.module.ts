import { MaterialModule } from './../material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentComponent } from './appointment.component';
import { Routes, RouterModule } from '@angular/router';
import { ViewAppointmentComponent } from './partials/view-appointment/view-appointment.component';

const routes: Routes = [
    { path: '', component: AppointmentComponent },
    { path: ':id', component: ViewAppointmentComponent },
];

@NgModule({
    declarations: [AppointmentComponent, ViewAppointmentComponent],
    imports: [CommonModule, RouterModule.forChild(routes), MaterialModule],
})
export class AppointmentModule {}
