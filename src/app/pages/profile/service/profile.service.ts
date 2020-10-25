import { DoctorModel } from './../../doctor/model/doctor.model';
import { DataService } from './../../../core/services/data.service';
import { Injectable } from '@angular/core';
import { ProfileModel } from '../model/profile.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ProfileService extends DataService<ProfileModel> {
    constructor(public http: HttpClient) {
        super(http, 'users');
    }
}

export class DoctorProfileService extends DataService<DoctorModel> {
    constructor(public http: HttpClient) {
        super(http, 'doctor');
    }
}
