import { UtilService } from './../../../../core/services/util.service';
import { AppointmentService } from './../../service/appointment.service';
import { AppointmentModel } from './../../model/appointment.model';
import { ErrorService } from './../../../../core/services/error.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-add-appointment',
    templateUrl: './add-appointment.component.html',
    styleUrls: ['./add-appointment.component.scss'],
})
export class AddAppointmentComponent implements OnInit {
    appointmentForm: FormGroup;
    loading = new BehaviorSubject<boolean>(false);
    errors = new BehaviorSubject<string>('');
    hasFormErrors = false;
    appointment = {} as AppointmentModel;

    appointmentTypes = ['Voice', 'Talk'];
    foods: any[] = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' },
    ];

    constructor(
        private fb: FormBuilder,
        private errorService: ErrorService,
        // private utilService: UtilService,
        private appointmentService: AppointmentService
    ) {}

    initAppointmentForm() {
        this.appointmentForm = this.fb.group({
            description: [
                this.appointment.description,
                Validators.compose([Validators.required]),
            ],
            appointmentTime: [
                this.appointment.appointmentTime,
                Validators.compose([Validators.required]),
            ],
            date: [
                this.appointment.date,
                Validators.compose([Validators.required]),
            ],
            type: [
                this.appointment.type,
                Validators.compose([Validators.required]),
            ],
            appointmentDay: [
                this.appointment.appointmentDay,
                Validators.compose([Validators.required]),
            ],
            doctorId: [
                this.appointment.doctorId,
                Validators.compose([Validators.required]),
            ],
            patientId: [
                this.appointment.patientId,
                Validators.compose([Validators.required]),
            ],
        });
    }

    /**
     * Form Submit
     */
    submit() {
        this.loading.next(true);
        const controls = this.appointmentForm.controls;
        /** check form */
        if (this.appointmentForm.invalid) {
            Object.keys(controls).forEach((controlName) =>
                controls[controlName].markAsTouched()
            );
            return;
        }

        this.appointmentService.create(this.appointmentForm.value).subscribe(
            (res) => {
                this.loading.next(false);
                // this.utilService.showSuccessToast(
                //     'Appointment Added Successfully'
                // );
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

    close(dismissedAlert: any): void {
        // tslint:disable-next-line: no-unused-expression
        alert !== dismissedAlert;
    }

    isControlHasError(controlName: string, validationType: string): boolean {
        const control = this.appointmentForm.controls[controlName];
        if (!control) {
            return false;
        }

        const result =
            control.hasError(validationType) &&
            (control.dirty || control.touched);
        return result;
    }


    ngOnInit() {
      this.initAppointmentForm();
    }
}
