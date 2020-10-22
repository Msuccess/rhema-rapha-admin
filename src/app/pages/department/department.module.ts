import { MaterialModule } from './../material/material.module';
import { ViewDepartmentComponent } from './partials/view-department/view-department.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentComponent } from './department.component';

const routes: Routes = [{ path: '', component: DepartmentComponent }];

@NgModule({
  declarations: [DepartmentComponent, , ViewDepartmentComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule],
})
export class DepartmentModule {
  constructor() {}
}
