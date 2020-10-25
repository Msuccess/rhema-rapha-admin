import { HttpClient } from '@angular/common/http';
import { AppointmentModel } from './../model/appointment.model';
import { DataService } from './../../../core/services/data.service';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AppointmentService extends DataService<AppointmentModel> {
    constructor(public http: HttpClient) {
        super(http, 'appointment');
    }

    public getAll(): Observable<AppointmentModel> {
        return this.http.get(`${this.baseEndPoint}appointment/all`).pipe(
            map((data: any) => data as AppointmentModel),
            catchError((err) => {
                this.handleError([]);
                return throwError(err);
            })
        );
    }

    public getDoctorAppointments() {
        return this.http.get(`${this.baseEndPoint}appointment/doctor`).pipe(
            map((data: any) => data as AppointmentModel),
            catchError((err) => {
                this.handleError([]);
                return throwError(err);
            })
        );
    }
}
