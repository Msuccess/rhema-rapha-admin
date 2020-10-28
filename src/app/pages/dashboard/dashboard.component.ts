import { TokenStorage } from './../../auth/service/token-storage.service';
import { DashboardService } from './service/dashboard.service';
import { ErrorService } from './../../core/services/error.service';
import { UtilService } from './../../core/services/util.service';
import { DoctorService } from './../doctor/service/doctor.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ChartType } from './dashboard.model';
import { ChartComponent } from 'ng-apexcharts';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    @ViewChild('chart', { static: true }) chart: ChartComponent;
    public chartOptions: ChartType;

    recentAppointments = [];
    doctors = [];
    doctorNumber: number;
    patientNumber: number;
    appointmentNumber: number;
    departmentNumber: number;
    newDoctor: any;
    newPatient: any;
    recentAppointment: any;
    userRole: string;
    doctorAppointmentNumber: number;
    graphDepartments = [];
    graphDoctors = [];

    constructor(
        private doctorService: DoctorService,
        private utilService: UtilService,
        private errorService: ErrorService,
        private dashboardService: DashboardService,
        private tokenStorage: TokenStorage
    ) {
        this.getUserRole();
    }

    revenueAreaChart: ChartType;

    private getDoctors() {
        this.doctorService.getList().subscribe(
            (res: any) => {
                this.doctors = res;
            },
            (error) => {
                this.utilService.showFailToast(
                    this.errorService.getErrors(error)
                );
            }
        );
    }
    private getUserRole() {
        this.tokenStorage.getUser().subscribe((res: any) => {
            this.userRole = res.role;
        });
    }

    private getDataNumber() {
        this.dashboardService.getNumbers().subscribe(
            (res: any) => {
                this.doctorNumber = res[0].data[1];
                this.patientNumber = res[1].data[1];
                this.appointmentNumber = res[2].data[1];
                this.departmentNumber = res[3].data[1];
            },
            (error) => {
                this.utilService.showFailToast(
                    this.errorService.getErrors(error)
                );
            }
        );
    }

    private getNewData() {
        this.dashboardService.getNewData().subscribe(
            (res: any) => {
                console.log('New >>>>>>>>>>>>>>>>>>', res);
                this.newDoctor = res[0].data;
                this.newPatient = res[1].data;
                this.recentAppointment = res[2].data;
            },
            (error) => {
                this.utilService.showFailToast(
                    this.errorService.getErrors(error)
                );
            }
        );
    }

    private getGraphData() {
        this.dashboardService.departmentGraph().subscribe(
            (res: any[]) => {
                res.forEach((dt) => {
                    this.graphDepartments.push(dt.name);
                    this.graphDoctors.push(dt.doctor.length);
                });

                this._fetchData();
            },
            (error) => {
                this.utilService.showFailToast(
                    this.errorService.getErrors(error)
                );
            }
        );
    }

    ngOnInit() {
        this.getDataNumber();
        this.getDoctors();
        this.getNewData();
        this.getGraphData();
    }

    /**
     * fetches the dashboard value
     */
    private _fetchData() {
        this.revenueAreaChart = {
            chart: {
                height: 282,
                type: 'area',
                toolbar: {
                    show: false,
                },
            },
            tooltip: {
                theme: 'dark',
                x: { show: false },
            },
            stroke: {
                curve: 'smooth',
                width: 4,
            },
            series: [
                {
                    name: 'Doctors',
                    data: this.graphDoctors,
                },
            ],
            dataLabels: {
                enabled: true,
            },
            zoom: {
                enabled: false,
            },
            legend: {
                show: true,
            },
            colors: ['#43d39e'],
            xaxis: {
                type: 'string',
                categories: this.graphDepartments,
                tooltip: {
                    enabled: false,
                },
                axisBorder: {
                    show: false,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    type: 'vertical',
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.45,
                    opacityTo: 0.05,
                    stops: [45, 100],
                },
            },
        };
    }
}
