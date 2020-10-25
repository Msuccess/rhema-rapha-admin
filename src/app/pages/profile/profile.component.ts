import { TokenStorage } from './../../auth/service/token-storage.service';
import { ErrorService } from './../../core/services/error.service';
import { UtilService } from './../../core/services/util.service';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from './service/profile.service';
import { Router } from '@angular/router';
import { ProfileModel } from './model/profile.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    profileId: string;
    profileDetail = {} as ProfileModel;

    constructor(
        private profileService: ProfileService,
        private utilService: UtilService,
        private errorService: ErrorService,
        private router: Router,
        private tokenStorage: TokenStorage
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
            this.profileId = res.id;
            this.profileDetail = res;
            // this.getProfile();
            console.log('object', res);
        });
    }

    ngOnInit() {
        this.getUserId();
    }
}
