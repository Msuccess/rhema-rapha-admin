import { UtilService } from './../../../../core/services/util.service';
import { ErrorService } from './../../../../core/services/error.service';
import { ProfileService } from './../../service/profile.service';
import { ChangePasswordModel } from './../../model/profile.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-security',
    templateUrl: './security.component.html',
    styleUrls: ['./security.component.scss'],
})
export class SecurityComponent implements OnInit {
    changePassword = {} as ChangePasswordModel;
    changePasswordForm: FormGroup;
    loading = new BehaviorSubject<boolean>(false);
    hasFormErrors = false;
    profileId: string;
    errors = new BehaviorSubject<string>('');

    constructor(
        private fb: FormBuilder,
        private profileService: ProfileService,
        private errorService: ErrorService,
        private utilService: UtilService
    ) {}

    initChangePasswordForm() {
        this.changePasswordForm = this.fb.group({
            oldPassword: [
                this.changePassword.oldPassword,
                Validators.compose([Validators.required]),
            ],
            newPassword: [
                this.changePassword.newPassword,
                Validators.compose([Validators.required, Validators.email]),
            ],
            confirmPassword: [
                this.changePassword.confirmPassword,
                Validators.compose([Validators.required, Validators.email]),
            ],
        });
    }

    close(dismissedAlert: any): void {
        // tslint:disable-next-line: no-unused-expression
        alert !== dismissedAlert;
    }

    submit() {
        const controls = this.changePasswordForm.controls;
        /** check form */
        if (this.changePasswordForm.invalid) {
            Object.keys(controls).forEach((controlName) =>
                controls[controlName].markAsTouched()
            );
            return;
        }

        this.profileService
            .update(this.profileId, this.changePasswordForm.value)
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
        const control = this.changePasswordForm.controls[controlName];
        if (!control) {
            return false;
        }

        const result =
            control.hasError(validationType) &&
            (control.dirty || control.touched);
        return result;
    }

    ngOnInit() {
        this.initChangePasswordForm();
    }
}
