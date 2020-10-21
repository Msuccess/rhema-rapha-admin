import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export class DataService<T> {
    baseEndPoint = environment.baseUrl;

    constructor(
        private httpClient: HttpClient,
        private endPoint: string,
        private subEndPoint?: string
    ) {}

    public handleError(result?: any): any {
        if (result.error instanceof ErrorEvent) {
            console.error('An error occurred:', result.error.message);
        } else {
            console.error(
                `Backend returned code ${result.status}, ` +
                    `body was: ${result.error}`
            );
        }
        return throwError('Something bad happened; please try again later.');
    }

    uploadImage(avatar: any, id: string): Observable<T> {
        return this.httpClient
            .post(`${this.baseEndPoint}${this.endPoint}/${id}/avatar/`, avatar)
            .pipe(
                map((result) => result as T),
                catchError((err) => {
                    this.handleError([]);
                    return throwError(err);
                })
            );
    }

    public create(data: T): Observable<T> {
        return this.httpClient
            .post<T>(`${this.baseEndPoint}/${this.endPoint}/`, data)
            .pipe(
                map((result) => result as T),
                catchError((err) => {
                    this.handleError([]);
                    return throwError(err);
                })
            );
    }

    public update(id: string, data: T): Observable<any> {
        return this.httpClient
            .put<T>(`${this.baseEndPoint}${this.endPoint}/${id}/`, data)
            .pipe(
                map((result) => result as T),
                catchError((err) => {
                    this.handleError([]);
                    return throwError(err);
                })
            );
    }

    public getById(id: string): Observable<T> {
        return this.httpClient
            .get(`${this.baseEndPoint}${this.endPoint}/${id}/`)
            .pipe(
                map((data: any) => data as T),
                catchError((err) => {
                    this.handleError([]);
                    return throwError(err);
                })
            );
    }

    public getBy(): Observable<T> {
        return this.httpClient
            .get(`${this.baseEndPoint}${this.endPoint}/`)
            .pipe(
                map((data: any) => data as T),
                catchError((err) => {
                    this.handleError([]);
                    return throwError(err);
                })
            );
    }

    public getList(): Observable<T[]> {
        return this.httpClient
            .get(`${this.baseEndPoint}${this.endPoint}/`)
            .pipe(
                map((data: any) => this.convertData(data)),

                catchError((err) => {
                    this.handleError([]);
                    return throwError(err);
                })
            );
    }

    public getListWithQueryOptions(queryOptions?: any): Observable<T[]> {
        return this.httpClient
            .get(
                `${this.baseEndPoint}/${
                    this.endPoint
                }?${queryOptions.toQueryString()}`
            )
            .pipe(
                map((data: any) => this.convertData(data)),
                catchError((err) => {
                    this.handleError([]);
                    return throwError(err);
                })
            );
    }

    public delete(id: string): Observable<any> {
        return this.httpClient
            .delete(`${this.baseEndPoint}/${this.endPoint}/${id}`)
            .pipe(
                catchError((err) => {
                    this.handleError([]);
                    return throwError(err);
                })
            );
    }

    public convertData(response: any): T[] {
        if (response) {
            try {
                return response.data.map((result: any) => result);
            } catch {
                return response.map((result: any) => result);
            }
        }
        return;
    }
}
