import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    {
        path: 'appointment',
        loadChildren: () =>
            import('./appointment/appointment.module').then(
                (m) => m.AppointmentModule
            ),
    },
    {
        path: 'department',
        loadChildren: () =>
            import('./department/department.module').then(
                (m) => m.DepartmentModule
            ),
    },
    {
        path: 'doctor',
        loadChildren: () =>
            import('./doctor/doctor.module').then((m) => m.DoctorModule),
    },
    {
        path: 'patient',
        loadChildren: () =>
            import('./patient/patient.module').then((m) => m.PatientModule),
    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
