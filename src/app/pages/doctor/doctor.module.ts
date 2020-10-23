import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorComponent } from './doctor.component';
import { RouterModule, Routes } from '@angular/router';
import { ViewDoctorComponent } from './partials/view-doctor/view-doctor.component';
import { AvatarModule } from 'ngx-avatar';

const routes: Routes = [{ path: '', component: DoctorComponent }];

@NgModule({
  declarations: [DoctorComponent, ViewDoctorComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule],
})
export class DoctorModule {}
