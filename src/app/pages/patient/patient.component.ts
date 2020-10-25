import { ErrorService } from './../../core/services/error.service';
import { UtilService } from './../../core/services/util.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
    MatDialog,
    MatPaginator,
    MatSort,
    MatTableDataSource,
} from '@angular/material';
import { PatientService } from './service/patient.service';
import { AddPatientComponent } from './partials/add-patient/add-patient.component';
import { PatientModel } from './model/patient.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html',
    styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = [
        'fullName',
        'email',
        'phonenumber',
        'dateOfBirth',
        'action',
    ];
    dataSource: MatTableDataSource<PatientModel>;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    dataSourceLength: number;

    constructor(
        private dialog: MatDialog,
        private patientService: PatientService,
        private utilService: UtilService,
        private errorService: ErrorService,
        private router: Router
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

    addPatient() {
        const dialogRef = this.dialog.open(AddPatientComponent, {
            maxWidth: '500px',
            width: '500px',
            disableClose: true,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.getPatients();
            }
        });
    }

    getPatients() {
        this.patientService.getAll().subscribe(
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
    }

    deletePatient(id: string) {
        this.patientService.delete(id).subscribe(
            (res: any) => {
                console.log(res);
                this.getPatients();
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

    viewPatient(id: string) {
        this.router.navigate(['/patient/', id]);
    }

    editPatient(patient: PatientModel) {
        const dialogRef = this.dialog.open(AddPatientComponent, {
            maxWidth: '500px',
            width: '500px',
            data: patient,
            disableClose: true,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.getPatients();
            }
        });
    }

    ngOnInit() {
        this.getPatients();
    }
}
