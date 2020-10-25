import { ProfileService } from './../../service/profile.service';
import { ProfileModel } from './../../model/profile.model';
import { ErrorService } from './../../../../core/services/error.service';
import { UtilService } from './../../../../core/services/util.service';
import {
    Component,
    OnInit,
    OnChanges,
    SimpleChanges,
    Input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit, OnChanges {
    profile = {} as ProfileModel;
    profileForm: FormGroup;
    loading = new BehaviorSubject<boolean>(false);
    hasFormErrors = false;
    profileId: string;
    errors = new BehaviorSubject<string>('');
    @Input() profileData: ProfileModel;

    constructor(
        private fb: FormBuilder,
        private profileService: ProfileService,
        private errorService: ErrorService,
        private utilService: UtilService
    ) {}

    initProfileForm() {
        this.profileForm = this.fb.group({
            fullName: [
                this.profile.fullName,
                Validators.compose([Validators.required]),
            ],
            email: [
                this.profile.email,
                Validators.compose([Validators.required, Validators.email]),
            ],
            phonenumber: [
                this.profile.phonenumber,
                Validators.compose([Validators.required, Validators.email]),
            ],
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.initProfileForm();
        if (changes.profileData.currentValue) {
            console.log(changes.profileData.currentValue);
            this.profileId = changes.profileData.currentValue.id;
            this.profileForm.patchValue(changes.profileData.currentValue);
        }
    }

    close(dismissedAlert: any): void {
        // tslint:disable-next-line: no-unused-expression
        alert !== dismissedAlert;
    }

    submit() {
        const controls = this.profileForm.controls;
        /** check form */
        if (this.profileForm.invalid) {
            Object.keys(controls).forEach((controlName) =>
                controls[controlName].markAsTouched()
            );
            return;
        }

        this.profileService
            .update(this.profileId, this.profileForm.value)
            .subscribe(
                (res: any) => {
                    console.log(res);
                },
                (error) => {
                    this.utilService.showFailToast(
                        this.errorService.getErrors(error)
                    );
                    this.errors.next(this.errorService.getErrors(error));
                }
            );
    }

    isControlHasError(controlName: string, validationType: string): boolean {
        const control = this.profileForm.controls[controlName];
        if (!control) {
            return false;
        }

        const result =
            control.hasError(validationType) &&
            (control.dirty || control.touched);
        return result;
    }

    ngOnInit() {}
}
