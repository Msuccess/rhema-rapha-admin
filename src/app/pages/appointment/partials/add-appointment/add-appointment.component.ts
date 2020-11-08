import { TokenStorage } from './../../../../auth/service/token-storage.service';
import { PatientService } from './../../../patient/service/patient.service';
import { DoctorService } from './../../../doctor/service/doctor.service';
import { UtilService } from './../../../../core/services/util.service';
import { AppointmentService } from './../../service/appointment.service';
import { AppointmentModel } from './../../model/appointment.model';
import { ErrorService } from './../../../../core/services/error.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ngxCalendarDays, ngxCalendarDays2 } from './data';

@Component({
    selector: 'app-add-appointment',
    templateUrl: './add-appointment.component.html',
    styleUrls: ['./add-appointment.component.scss'],
})
export class AddAppointmentComponent implements OnInit {
    appointmentForm: FormGroup;
    minDate = new Date();
    loading = new BehaviorSubject<boolean>(false);
    errors = new BehaviorSubject<string>('');
    hasFormErrors = false;
    appointment = {} as AppointmentModel;
    appointmentTypes = ['Voice', 'Talk'];
    updating$ = new BehaviorSubject<boolean>(false);
    doctors = [];
    patients = [];
    appointmentTimes = [];
    appointmentDays = [];
    userRole: any;

    constructor(
        private fb: FormBuilder,
        private tokenStorage: TokenStorage,
        private errorService: ErrorService,
        private utilService: UtilService,
        @Inject(MAT_DIALOG_DATA) public data: AppointmentModel,
        private doctorService: DoctorService,
        private appointmentService: AppointmentService,
        private patientService: PatientService,
        public dialogRef: MatDialogRef<AddAppointmentComponent>
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
            appointmentDay: [this.appointment.appointmentDay],
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

    selectedDoctor(event: any) {
        if (event) {
            const doctor = this.doctors.find((doc) => doc.id === event.value);

            this.appointmentTimes = doctor.timesAvailable.split(',');
            this.appointmentDays = doctor.daysAvailable.split(',');
        }

        if (this.data) {
            this.appointmentTimes = this.data.doctor.timesAvailable.split(',');
            this.appointmentDays = this.data.doctor.daysAvailable.split(',');
        }
    }

    /**
     * Form Submit
     */
    submit() {
        this.appointmentForm.value.appointmentDay = this.getDatForDate(
            this.appointmentForm.value.date
        );
        const controls = this.appointmentForm.controls;
        /** check form */
        if (this.appointmentForm.invalid) {
            Object.keys(controls).forEach((controlName) =>
                controls[controlName].markAsTouched()
            );
            return;
        }

        this.loading.next(true);
        if (this.data) {
            this.updateAppointment();
        } else {
            this.addAppointment();
        }
    }

    getDatForDate(date: Date): string {
        if (this.data) {
            return ngxCalendarDays[new Date(date).getDay()];
        }
        return ngxCalendarDays[date.getDay()];
    }

    updateAppointment() {
        this.appointmentService
            .update(this.data.id, this.appointmentForm.value)
            .subscribe(
                (res) => {
                    this.dialogRef.close(true);
                    this.loading.next(false);
                    this.utilService.showSuccessToast(
                        'Appointment Updated Successfully'
                    );
                    console.log(res);
                },
                (err) => {
                    this.loading.next(false);
                    this.hasFormErrors = true;
                    this.utilService.showFailToast(
                        this.errorService.getErrors(err)
                    );
                    this.errors.next(this.errorService.getErrors(err));
                    console.log(this.errors.getValue());
                }
            );
    }

    getUserRole() {
        this.tokenStorage.getUser().subscribe((res) => {
            this.userRole = res.role;
            switch (this.userRole.toLowerCase()) {
                case 'admin':
                    this.getDoctors();
                    break;

                case 'doctor':
                    this.getDoctorById();
                    break;
            }
        });
    }

    addAppointment() {
        this.appointmentService.create(this.appointmentForm.value).subscribe(
            (res) => {
                this.dialogRef.close(true);
                this.loading.next(false);
                this.utilService.showSuccessToast(
                    'Appointment Added Successfully'
                );
                console.log(res);
            },
            (err) => {
                this.loading.next(false);
                this.hasFormErrors = true;
                this.utilService.showFailToast(
                    this.errorService.getErrors(err)
                );

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

    getPatients() {
        this.patientService.getAll().subscribe(
            (res: any) => {
                this.patients = res.data;
            },
            (error) => {
                this.utilService.showFailToast(
                    this.errorService.getErrors(error)
                );
            }
        );
    }

    getDoctors() {
        this.doctorService.getList().subscribe(
            (res: any) => {
                this.doctors = res;
            },
            (error) => {
                this.utilService.showFailToast(
                    this.errorService.getErrors(error)
                );
            }
        );
    }

    getDoctorById() {
        this.doctorService.getDoctorWithUserId().subscribe(
            (res: any) => {
                console.log('Doctor', res.data);
                this.doctors.push(res.data);
            },
            (error) => {
                this.utilService.showFailToast(
                    this.errorService.getErrors(error)
                );
            }
        );
    }

    getAppoitmentTime(timeString: string) {
        const times = timeString.split(' ');
        this.appointmentTimes = times;
    }

    ngOnInit() {
        this.getUserRole();
        this.getPatients();
        this.initAppointmentForm();
        if (this.data) {
            this.updating$.next(true);
            this.selectedDoctor(null);
            this.appointmentForm.patchValue(this.data);
        }
    }

    myFilter = (d: Date) => {
        if (d === null) {
            return;
        }

        const day = d.getDay();

        return this.appointmentDays.find((x) => {
            return day === ngxCalendarDays2[x];
        });
    };
}
