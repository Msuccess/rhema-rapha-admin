import { TokenStorage } from './../../auth/service/token-storage.service';
import { AppointmentService } from './service/appointment.service';
import { UtilService } from './../../core/services/util.service';
import { ErrorService } from './../../core/services/error.service';
import { AddAppointmentComponent } from './partials/add-appointment/add-appointment.component';
import { Component, OnInit } from '@angular/core';
import {
    MatDialog,
    MatPaginator,
    MatSort,
    MatTableDataSource,
} from '@angular/material';

import { ActivatedRoute, Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { AppointmentModel } from './model/appointment.model';
import { AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.component.html',
    styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = [
        'date',
        'appointmentTime',
        'type',
        'isCanceled',
        'appointmentDay',
        'doctor',
        'patient',
        'action',
    ];
    dataSource: MatTableDataSource<AppointmentModel>;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    dataSourceLength: number;
    userRole: string;

    constructor(
        private appointmentService: AppointmentService,
        private utilService: UtilService,
        private errorService: ErrorService,
        private router: Router,
        private dialog: MatDialog,
        private tokenStorage: TokenStorage
    ) {}

    ngAfterViewInit() {
        if (this.dataSource) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        console.log(filterValue);
        this.dataSource.filter = filterValue.trim().toLowerCase();
        console.log(this.dataSource.filter);
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    getAppointments() {
        switch (this.userRole.toLowerCase()) {
            case 'admin':
                this.appointmentService.getAll().subscribe(
                    (res: any) => {
                        this.dataSource = new MatTableDataSource(res.data);
                        this.dataSourceLength = res.data.length;
                    },
                    (error) => {
                        this.utilService.showFailToast(
                            this.errorService.getErrors(error)
                        );
                        this.dataSourceLength = 0;
                    }
                );
                break;

            case 'doctor':
                this.appointmentService.getDoctorAppointments().subscribe(
                    (res: any) => {
                        this.dataSource = new MatTableDataSource(res.data);
                        this.dataSourceLength = res.data.length;
                    },
                    (error) => {
                        this.utilService.showFailToast(
                            this.errorService.getErrors(error)
                        );
                        this.dataSourceLength = 0;
                    }
                );
                break;

            default:
                return 'No Such Role Available';
        }
    }

    deletePatient(id: string) {
        this.appointmentService.delete(id).subscribe(
            (res: any) => {
                this.utilService.showSuccessToast(
                    'Appointment Deleted Successfully'
                );
                this.getAppointments();
            },
            (error) => {
                this.utilService.showFailToast(
                    this.errorService.getErrors(error)
                );
                console.log(this.errorService.getErrors(error));
            }
        );
    }

    confirmDelete(id: string) {
        this.utilService.showConfirm(() => this.deletePatient(id));
    }

    addAppointment() {
        const dialogRef = this.dialog.open(AddAppointmentComponent, {
            maxWidth: '500px',
            width: '500px',
            disableClose: true,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.getAppointments();
            }
        });
    }

    editAppointment(appointment: AppointmentModel) {
        const dialogRef = this.dialog.open(AddAppointmentComponent, {
            maxWidth: '500px',
            width: '500px',
            data: appointment,
            disableClose: true,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.getAppointments();
            }
        });
    }

    viewAppointment(id: string) {
        this.router.navigate(['/appointment/', id]);
    }

    getUserRole() {
        this.tokenStorage.getUser().subscribe((res) => {
            console.log('Role', res);
            this.userRole = res.role;
        });
    }

    ngOnInit() {
        this.getUserRole();
        this.getAppointments();
    }
}
