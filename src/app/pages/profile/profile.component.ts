import { TokenStorage } from './../../auth/service/token-storage.service';
import { ErrorService } from './../../core/services/error.service';
import { UtilService } from './../../core/services/util.service';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from './service/profile.service';
import { Router } from '@angular/router';
import { ProfileModel } from './model/profile.model';
import { DoctorService } from '../doctor/service/doctor.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    profileId: string;
    profileDetail = {} as any;
    doctorId: any;
    userRole: string;
    timesDoctorAvailable = [];
    daysDoctorAvailable = [];

    constructor(
        private profileService: ProfileService,
        private utilService: UtilService,
        private errorService: ErrorService,
        private tokenStorage: TokenStorage,
        private doctorService: DoctorService
    ) {
        this.tokenStorage.storedUserState$.subscribe((res) => {
            this.profileDetail = res;
        });
    }

    getProfile() {
        this.profileService.getUserById(this.profileId).subscribe(
            (res: any) => {
                this.profileDetail = res.data;
            },
            (error) => {
                this.utilService.showFailToast(
                    this.errorService.getErrors(error)
                );
            }
        );
    }

    getUserId() {
        this.tokenStorage.getUser().subscribe((res) => {
            this.userRole = res.role;
            console.log(res);
            if (res.role === 'admin') {
                this.profileId = res.id;
                this.getProfile();
            } else if (res.role === 'doctor') {
                this.doctorId = res.id;
                this.getDoctor();
            }
        });
    }

    getDoctor() {
        this.doctorService.getDoctorWithUserId().subscribe(
            (res: any) => {
                this.timesDoctorAvailable = res.data.timesAvailable.split(',');
                this.daysDoctorAvailable = res.data.daysAvailable.split(',');
                this.profileDetail = res.data;
            },
            (error) => {
                this.utilService.showFailToast(
                    this.errorService.getErrors(error)
                );
            }
        );
    }

    ngOnInit() {
        this.getUserId();
    }
}
