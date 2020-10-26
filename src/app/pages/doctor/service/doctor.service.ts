import { DataService } from './../../../core/services/data.service';
import { DoctorModel } from './../model/doctor.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class DoctorService extends DataService<DoctorModel> {
    constructor(public http: HttpClient) {
        super(http, 'doctor');
    }

    public createDoctor(data: DoctorModel): Observable<DoctorModel> {
        return this.http
            .post<DoctorModel>(`${this.baseEndPoint}auth/register`, data)
            .pipe(
                map((result) => result as DoctorModel),
                catchError((err) => {
                    this.handleError([]);
                    return throwError(err);
                })
            );
    }

    public getDoctorWithUserId(): Observable<DoctorModel> {
        return this.http.get(`${this.baseEndPoint}doctor/self`).pipe(
            map((data: any) => data as DoctorModel),
            catchError((err) => {
                this.handleError([]);
                return throwError(err);
            })
        );
    }
}
