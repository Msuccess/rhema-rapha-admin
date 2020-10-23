import { UtilService } from './../../core/services/util.service';
import { ErrorService } from './../../core/services/error.service';
import { DoctorModel } from './model/doctor.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { AddDoctorComponent } from './partials/add-doctor/add-doctor.component';
import { DoctorService } from './service/doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
})
export class DoctorComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'fullName',
    'email',
    'phonenumber',
    'daysAvailable',
    'timesAvailable',
    'action',
  ];
  dataSource: MatTableDataSource<DoctorModel>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSourceLength: number;

  constructor(
    private dialog: MatDialog,
    private doctorService: DoctorService,
    private utilService: UtilService,
    private errorService: ErrorService,
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

  addDoctor() {
    const dialogRef = this.dialog.open(AddDoctorComponent, {
      maxWidth: '500px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getDoctors();
      }
    });
  }

  getDoctors() {
    this.doctorService.getList().subscribe(
      (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSourceLength = res.length;
      },
      (error) => {
        this.utilService.showFailToast(this.errorService.getErrors(error));
        this.dataSourceLength = 0;
      },
    );
  }

  deleteDoctor(id: string) {
    this.doctorService.delete(id).subscribe(
      (res: any) => {
        console.log(res);
        this.getDoctors();
      },
      (error) => {
        this.utilService.showFailToast(this.errorService.getErrors(error));
        console.log(this.errorService.getErrors(error));
      },
    );
  }

  confirmDelete(id: string) {
    this.utilService.showConfirm(() => this.deleteDoctor(id));
  }

  viewDoctor() {}

  editDoctor(doctor: DoctorModel) {
    const dialogRef = this.dialog.open(AddDoctorComponent, {
      maxWidth: '500px',
      width: '500px',
      data: doctor,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getDoctors();
      }
    });
  }

  ngOnInit() {
    this.getDoctors();
  }
}
