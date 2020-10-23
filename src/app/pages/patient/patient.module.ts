import { SharedModule } from './../../shared/shared.module';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientComponent } from './patient.component';
import { Routes, RouterModule } from '@angular/router';
import { AvatarModule } from 'ngx-avatar';

const routes: Routes = [{ path: '', component: PatientComponent }];

@NgModule({
    declarations: [PatientComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule,
        AvatarModule,
    ],
})
export class PatientModule {}
