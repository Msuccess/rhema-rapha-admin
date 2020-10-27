import { DataService } from './../../../core/services/data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class DashboardService extends DataService<any> {
    constructor(public http: HttpClient) {
        super(http, 'analytics');
    }

    public departmentGraph() {
        return this.http.get(`${this.baseEndPoint}analytics/graph`).pipe(
            map((data: any) => this.convertData(data)),

            catchError((err) => {
                this.handleError([]);
                return throwError(err);
            })
        );
    }

    public getNumbers(): Observable<any[]> {
        const doctorNumber = this.http.get(
            `${this.baseEndPoint}analytics/doctor_number`
        );
        const patientNumber = this.http.get(
            `${this.baseEndPoint}analytics/patient_number`
        );
        const appointmentNumber = this.http.get(
            `${this.baseEndPoint}analytics/appointment_number`
        );
        const departmentNumber = this.http.get(
            `${this.baseEndPoint}analytics/department_number`
        );
        return forkJoin([
            doctorNumber,
            patientNumber,
            appointmentNumber,
            departmentNumber,
        ]).pipe(
            map((data: any) => this.convertData(data)),
            catchError((err) => {
                this.handleError([]);
                return throwError(err);
            })
        );
    }

    public getNewData(): Observable<any[]> {
        const newDoctor = this.http.get(
            `${this.baseEndPoint}analytics/new_doctors`
        );
        const newPatient = this.http.get(
            `${this.baseEndPoint}analytics/new_patient`
        );
        const recentAppointment = this.http.get(
            `${this.baseEndPoint}analytics/recent_appointment`
        );

        return forkJoin([newDoctor, newPatient, recentAppointment]).pipe(
            map((data: any) => this.convertData(data)),
            catchError((err) => {
                this.handleError([]);
                return throwError(err);
            })
        );
    }
}
