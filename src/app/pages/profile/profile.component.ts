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

    constructor(
        private profileService: ProfileService,
        private utilService: UtilService,
        private errorService: ErrorService,
        private router: Router,
        private tokenStorage: TokenStorage,
        private doctorService: DoctorService
    ) {}

    getProfile() {
        this.profileService.getById(this.profileId).subscribe(
            (res: any) => {
                this.profileDetail = res;
                console.log('object', res);
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
            if (res.role === 'admin') {
                this.profileId = res.id;
                this.profileDetail = res;
                // this.getProfile();
            } else {
                this.doctorId = res.email;
                this.getDoctor();
            }
        });
    }

    getDoctor() {
        this.doctorService.getById(this.doctorId).subscribe(
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

    ngOnInit() {
        this.getUserId();
    }
}
