import { DepartmentService } from './../../service/department.service';
import { UtilService } from './../../../../core/services/util.service';
import { ErrorService } from './../../../../core/services/error.service';
import { DepartmentModel } from './../../../department/model/department.model';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.scss'],
})
export class ViewDepartmentComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'fullName',
    'email',
    'phonenumber',
    'daysAvailable',
    'timesAvailable',
  ];
  dataSource: MatTableDataSource<DepartmentModel>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSourceLength: number;
  departmentId: string;
  department: DepartmentModel;

  constructor(
    private departmentService: DepartmentService,
    private utilService: UtilService,
    private errorService: ErrorService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) {}

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDepartment() {
    this.departmentService.getById(this.departmentId).subscribe(
      (res: any) => {
        this.department = res.data;
        this.dataSource = new MatTableDataSource(res.data.doctor);
        this.dataSourceLength = res.data.doctor.length;
      },
      (error) => {
        this.utilService.showFailToast(this.errorService.getErrors(error));
        this.dataSourceLength = 0;
      },
    );
  }

  viewDepartment(id: string) {
    this.router.navigate(['/doctor/', id]);
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.departmentId = this.route.snapshot.paramMap.get('id');
    this.getDepartment();
  }
}
