import { ErrorService } from './../../core/services/error.service';
import { UtilService } from './../../core/services/util.service';
import { DepartmentService } from './service/department.service';
import { DepartmentModel } from './model/department.model';
import { AddDepartmentComponent } from './partials/add-department/add-department.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
    MatDialog,
    MatPaginator,
    MatSort,
    MatTableDataSource,
} from '@angular/material';
import { AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-department',
    templateUrl: './department.component.html',
    styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['name', 'description', 'action'];
    dataSource: MatTableDataSource<DepartmentModel>;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    dataSourceLength: number;

    constructor(
        private dialog: MatDialog,
        private departmentService: DepartmentService,
        private utilService: UtilService,
        private errorService: ErrorService
    ) {
        this.dataSource = new MatTableDataSource();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    addDepartment() {
        const dialogRef = this.dialog.open(AddDepartmentComponent, {
            maxWidth: '500px',
            width: '500px',
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.getDepartments();
            }
        });
    }

    getDepartments() {
        this.departmentService.getList().subscribe(
            (res: any) => {
                this.dataSource = res;
                this.dataSourceLength = res.length;
            },
            (error) => {
                this.utilService.showFailToast(
                    this.errorService.getErrors(error)
                );
                this.dataSourceLength = 0;
            }
        );
    }

    deleteDepartment(id: string) {
        this.departmentService.delete(id).subscribe(
            (res: any) => {
                console.log(res);
                this.getDepartments();
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
        this.utilService.showConfirm(() => this.deleteDepartment(id));
    }

    viewDepartment() {}

    editDepartment(department: DepartmentModel) {
        const dialogRef = this.dialog.open(AddDepartmentComponent, {
            maxWidth: '500px',
            width: '500px',
            data: department,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.getDepartments();
            }
        });
    }

    ngOnInit() {
        this.getDepartments();
    }
}
