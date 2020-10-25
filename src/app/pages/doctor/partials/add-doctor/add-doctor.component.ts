import { DepartmentService } from './../../../department/service/department.service';
import { DepartmentModel } from './../../../department/model/department.model';
import { UtilService } from './../../../../core/services/util.service';
import { DoctorService } from './../../service/doctor.service';
import { ErrorService } from './../../../../core/services/error.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { DoctorModel } from '../../model/doctor.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { daysList, timesList } from './data';

@Component({
    selector: 'app-add-doctor',
    templateUrl: './add-doctor.component.html',
    styleUrls: ['./add-doctor.component.scss'],
})
export class AddDoctorComponent implements OnInit {
    doctorForm: FormGroup;
    loading = new BehaviorSubject<boolean>(false);
    errors = new BehaviorSubject<string>('');
    hasFormErrors = false;
    departments = [];
    doctor = {} as DoctorModel;
    updating$ = new BehaviorSubject<boolean>(false);
    days = daysList;
    times = timesList;

    constructor(
        private fb: FormBuilder,
        private errorService: ErrorService,
        private utilService: UtilService,
        private doctorService: DoctorService,
        public dialogRef: MatDialogRef<AddDoctorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DoctorModel,
        private departmentService: DepartmentService
    ) {}

    getDepartments() {
        this.departmentService.getList().subscribe(
            (res: any) => {
                this.departments = res;
            },
            (error) => {
                this.utilService.showFailToast(
                    this.errorService.getErrors(error)
                );
            }
        );
    }

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
            password: [
                this.doctor.password,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(8),
                ]),
            ],
            daysAvailable: [
                this.doctor.daysAvailable,
                Validators.compose([Validators.required]),
            ],
            timesAvailable: [
                this.doctor.timesAvailable,
                Validators.compose([Validators.required]),
            ],
            departmentId: [
                this.doctor.departmentId,
                Validators.compose([Validators.required]),
            ],
            address: [this.doctor.address],

            role: ['doctor'],
        });
    }

    updateDoctor() {
        this.doctorService
            .update(this.data.id, this.doctorForm.value)
            .subscribe(
                (res) => {
                    this.dialogRef.close(true);
                    this.loading.next(false);
                    this.utilService.showSuccessToast(
                        'Doctor Updated Successfully'
                    );
                    console.log(res);
                },
                (err) => {
                    this.loading.next(false);
                    this.hasFormErrors = true;

                    this.errors.next(this.errorService.getErrors(err));
                    console.log(this.errors.getValue());
                }
            );
    }

    addDoctor() {
        this.doctorService.createDoctor(this.doctorForm.value).subscribe(
            (res) => {
                this.dialogRef.close(true);
                this.loading.next(false);
                this.utilService.showSuccessToast('Doctor Added Successfully');
                console.log(res);
            },
            (err) => {
                this.loading.next(false);
                this.hasFormErrors = true;

                this.errors.next(this.errorService.getErrors(err));
                console.log(this.errors.getValue());
            }
        );
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
        if (this.data) {
            this.loading.next(true);
            this.updateDoctor();
        } else {
            this.loading.next(true);
            this.addDoctor();
        }
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

    public compareWith(object1: any, object2: any) {
        return object1 && object2 && object1.label === object2.label;
    }

    ngOnInit() {
        this.getDepartments();
        this.initDoctorForm();
        if (this.data) {
            this.updating$.next(true);
            console.log('>>>>>>>>>>>GGGGGG>', this.data);
            this.doctorForm.patchValue(this.data);
        }
    }
}
