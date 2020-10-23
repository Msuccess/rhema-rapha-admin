import { PatientService } from './../../service/patient.service';
import { UtilService } from './../../../../core/services/util.service';
import { ErrorService } from './../../../../core/services/error.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { PatientModel } from '../../model/patient.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-add-patient',
    templateUrl: './add-patient.component.html',
    styleUrls: ['./add-patient.component.scss'],
})
export class AddPatientComponent implements OnInit {
    patientForm: FormGroup;
    loading = new BehaviorSubject<boolean>(false);
    errors = new BehaviorSubject<string>('');
    hasFormErrors = false;
    patient = {} as PatientModel;
    updating$ = new BehaviorSubject<boolean>(false);
    genders = ['Male', 'Female', 'Others'];
    minDate: Date;

    constructor(
        private fb: FormBuilder,
        private errorService: ErrorService,
        private utilService: UtilService,
        private patientService: PatientService,
        public dialogRef: MatDialogRef<AddPatientComponent>,
        @Inject(MAT_DIALOG_DATA) public data: PatientModel
    ) {
        this.minDate = new Date();
    }

    initPatientForm() {
        this.patientForm = this.fb.group({
            fullName: [
                this.patient.fullName,
                Validators.compose([Validators.required]),
            ],
            email: [
                this.patient.email,
                Validators.compose([Validators.required, Validators.email]),
            ],
            phonenumber: [
                this.patient.phonenumber,
                Validators.compose([Validators.required]),
            ],
            gender: [this.patient.gender],
            password: [
                this.patient.password,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(8),
                ]),
            ],
            bloodPressure: [this.patient.bloodPressure],
            height: [this.patient.height],
            address: [this.patient.address],
            dateOfBirth: [
                this.patient.dateOfBirth,
                Validators.compose([Validators.required]),
            ],
            bloodType: [this.patient.bloodType],
            role: ['patient'],
        });
    }

    updatePatient() {
        this.patientService
            .update(this.data.id, this.patientForm.value)
            .subscribe(
                (res) => {
                    this.dialogRef.close(true);
                    this.loading.next(false);
                    this.utilService.showSuccessToast(
                        'Patient Updated Successfully'
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

    addPatient() {
        this.patientService.createPatient(this.patientForm.value).subscribe(
            (res) => {
                this.dialogRef.close(true);
                this.loading.next(false);
                this.utilService.showSuccessToast('Patient Added Successfully');
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
        const controls = this.patientForm.controls;
        /** check form */
        if (this.patientForm.invalid) {
            Object.keys(controls).forEach((controlName) =>
                controls[controlName].markAsTouched()
            );
            return;
        }
        if (this.data) {
            this.loading.next(true);
            this.updatePatient();
        } else {
            this.loading.next(true);
            this.addPatient();
        }
    }

    close(dismissedAlert: any): void {
        // tslint:disable-next-line: no-unused-expression
        alert !== dismissedAlert;
    }

    isControlHasError(controlName: string, validationType: string): boolean {
        const control = this.patientForm.controls[controlName];
        if (!control) {
            return false;
        }

        const result =
            control.hasError(validationType) &&
            (control.dirty || control.touched);
        return result;
    }

    ngOnInit() {
        this.initPatientForm();
        if (this.data) {
            this.updating$.next(true);
            console.log('>>>>>>>>>>>GGGGGG>', this.data);
            this.patientForm.patchValue(this.data);
        }
    }
}
