import { TokenStorage } from './../../../../../../auth/service/token-storage.service';
import {
    timesList,
    daysList,
} from './../../../../../doctor/partials/add-doctor/data';
import { ProfileModel } from './../../../../model/profile.model';
import { AddDoctorComponent } from './../../../../../doctor/partials/add-doctor/add-doctor.component';
import { DepartmentService } from './../../../../../department/service/department.service';
import { DoctorService } from './../../../../../doctor/service/doctor.service';
import { UtilService } from './../../../../../../core/services/util.service';
import { ErrorService } from './../../../../../../core/services/error.service';

import { DoctorModel } from './../../../../../doctor/model/doctor.model';
import { Component, Inject, OnChanges, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SimpleChanges } from '@angular/core';
@Component({
    selector: 'app-edit-doc-profile',
    templateUrl: './edit-doc-profile.component.html',
    styleUrls: ['./edit-doc-profile.component.scss'],
})
export class EditDocProfileComponent implements OnInit, OnChanges {
    doctorForm: FormGroup;
    loading = new BehaviorSubject<boolean>(false);
    errors = new BehaviorSubject<string>('');
    hasFormErrors = false;
    departments = [];
    doctor = {} as any;
    updating$ = new BehaviorSubject<boolean>(false);
    days = [];
    times = [];
    profileId: any;

    @Input() profileData: DoctorModel;

    constructor(
        private fb: FormBuilder,
        private errorService: ErrorService,
        private utilService: UtilService,
        private doctorService: DoctorService,
        private tokenStorage: TokenStorage,
        public dialogRef: MatDialogRef<AddDoctorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DoctorModel,
        private departmentService: DepartmentService
    ) {}

    initDoctorForm() {
        this.doctorForm = this.fb.group({
            fullName: [
                this.doctor.fullName,
                Validators.compose([Validators.required]),
            ],
            email: [
                this.doctor.email,
                Validators.compose([Validators.required, Validators.email]),
            ],
            phonenumber: [
                this.doctor.phonenumber,
                Validators.compose([Validators.required]),
            ],
            password: [this.doctor.password],
            daysAvailable: [
                this.doctor.daysAvailable,
                Validators.compose([Validators.required]),
            ],
            timesAvailable: [
                this.doctor.timesAvailable,
                Validators.compose([Validators.required]),
            ],
            departmentId: [this.doctor.departmentId],
            address: [this.doctor.address],

            role: ['doctor'],
        });
    }

    /**
     * Form Submit
     */
    submit() {
        const controls = this.doctorForm.controls;

        // /** check form */
        if (this.doctorForm.invalid) {
            Object.keys(controls).forEach((controlName) =>
                controls[controlName].markAsTouched()
            );
            return;
        }
        this.doctorForm.value.daysAvailable = this.doctorForm.value.daysAvailable.toString();
        this.doctorForm.value.timesAvailable = this.doctorForm.value.timesAvailable.toString();
        this.doctorService
            .update(this.profileId, this.doctorForm.value)
            .subscribe(
                (res) => {
                    this.getDoctor();
                    this.loading.next(false);
                    this.utilService.showSuccessToast(
                        'Doctor Updated Successfully'
                    );
                },
                (err) => {
                    this.loading.next(false);
                    this.hasFormErrors = true;

                    this.errors.next(this.errorService.getErrors(err));
                }
            );
    }

    close(dismissedAlert: any): void {
        // tslint:disable-next-line: no-unused-expression
        alert !== dismissedAlert;
    }

    isControlHasError(controlName: string, validationType: string): boolean {
        const control = this.doctorForm.controls[controlName];
        if (!control) {
            return false;
        }

        const result =
            control.hasError(validationType) &&
            (control.dirty || control.touched);
        return result;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.days = daysList;
        this.times = timesList;
        this.initDoctorForm();

        if (changes && changes.profileData.currentValue.length !== 0) {
            this.profileId = changes.profileData.currentValue.id;

            const updateData = changes.profileData.currentValue;

            updateData.daysAvailable = this.spiltDates(
                changes.profileData.currentValue.daysAvailable
            );

            updateData.timesAvailable = this.spiltDates(
                changes.profileData.currentValue.timesAvailable
            );

            this.doctorForm.patchValue(updateData);
        }
    }

    spiltDates(date: string) {
        if (date) {
            return date.split(',');
        }
    }

    public compareWith(object1: any, object2: any) {
        return object1 && object2 && object1 === object2;
    }

    getDoctor() {
        this.doctorService.getDoctorWithUserId().subscribe(
            (res: any) => {
                this.tokenStorage.storedUserState$.next(res.data);
                this.getStoredUser(res.data);
            },
            (error) => {
                this.utilService.showFailToast(
                    this.errorService.getErrors(error)
                );
            }
        );
    }

    getStoredUser(data: any) {
        this.tokenStorage.getUser().subscribe((res) => {
            const newObject = {
                email: data.email,
                fullName: data.fullName,
                id: res.id,
                phonenumber: data.phonenumber,
                role: res.role,
            };
            console.log(newObject);
            this.tokenStorage.setUser(newObject, true);
        });
    }

    ngOnInit() {}
}
