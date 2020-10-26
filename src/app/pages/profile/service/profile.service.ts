import { DataService } from './../../../core/services/data.service';
import { Injectable } from '@angular/core';
import { ProfileModel } from '../model/profile.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProfileService extends DataService<ProfileModel> {
    constructor(public http: HttpClient) {
        super(http, 'users');
    }

    public update(id: string, data: any): Observable<any> {
        return this.http.put<any>(`${this.baseEndPoint}auth/${id}`, data).pipe(
            map((result) => result as any),
            catchError((err) => {
                this.handleError([]);
                return throwError(err);
            })
        );
    }

    public getUserById(id: string): Observable<any> {
        return this.http.get<any>(`${this.baseEndPoint}auth/${id}`).pipe(
            map((result) => result as any),
            catchError((err) => {
                this.handleError([]);
                return throwError(err);
            })
        );
    }

    public changePassword(id: string, data: any): Observable<any> {
        return this.http
            .put<any>(`${this.baseEndPoint}auth/changepassword/${id}`, data)
            .pipe(
                map((result) => result as any),
                catchError((err) => {
                    this.handleError([]);
                    return throwError(err);
                })
            );
    }
}
