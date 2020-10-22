import { HttpClient } from '@angular/common/http';
import { AppointmentModel } from './../model/appointment.model';
import { DataService } from './../../../core/services/data.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AppointmentService extends DataService<AppointmentModel> {
    constructor(public http: HttpClient) {
        super(http, 'appointment');
    }
}
