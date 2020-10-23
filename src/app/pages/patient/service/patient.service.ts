import { HttpClient } from '@angular/common/http';
import { PatientModel } from './../model/patient.model';
import { DataService } from './../../../core/services/data.service';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PatientService extends DataService<PatientModel> {
    constructor(public http: HttpClient) {
        super(http, 'patient');
    }

    public getAll(): Observable<PatientModel> {
        return this.http.get(`${this.baseEndPoint}patient/all`).pipe(
            map((data: any) => data as PatientModel),
            catchError((err) => {
                this.handleError([]);
                return throwError(err);
            })
        );
    }

    public createPatient(data: PatientModel): Observable<PatientModel> {
        return this.http
            .post<PatientModel>(`${this.baseEndPoint}auth/register`, data)
            .pipe(
                map((result) => result as PatientModel),
                catchError((err) => {
                    this.handleError([]);
                    return throwError(err);
                })
            );
    }
}
