import { ViewPatientComponent } from './partials/view-patient/view-patient.component';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientComponent } from './patient.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: PatientComponent },
  {
    path: ':id',
    component: ViewPatientComponent,
  },
];

@NgModule({
  declarations: [PatientComponent, ViewPatientComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule],
})
export class PatientModule {}
