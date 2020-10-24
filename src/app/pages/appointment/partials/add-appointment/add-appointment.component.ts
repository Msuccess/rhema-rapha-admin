import { PatientService } from './../../../patient/service/patient.service';
import { DoctorService } from './../../../doctor/service/doctor.service';
import { UtilService } from './../../../../core/services/util.service';
import { AppointmentService } from './../../service/appointment.service';
import { AppointmentModel } from './../../model/appointment.model';
import { ErrorService } from './../../../../core/services/error.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-add-appointment',
    templateUrl: './add-appointment.component.html',
    styleUrls: ['./add-appointment.component.scss'],
})
export class AddAppointmentComponent implements OnInit {
    appointmentForm: FormGroup;
    startDate = new Date();
    loading = new BehaviorSubject<boolean>(false);
    errors = new BehaviorSubject<string>('');
    hasFormErrors = false;
    appointment = {} as AppointmentModel;
    appointmentTypes = ['Voice', 'Talk'];
    updating$ = new BehaviorSubject<boolean>(false);
    doctors = [];
    patients = [];
    appointmentTimes = [];
    appointmentDays: string[];

    constructor(
        private fb: FormBuilder,
        private errorService: ErrorService,
        private utilService: UtilService,
        @Inject(MAT_DIALOG_DATA) public data: AppointmentModel,
        private doctorService: DoctorService,
        private appointmentService: AppointmentService,
        private patientService: PatientService,
        public dialogRef: MatDialogRef<AddAppointmentComponent>,
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

    selectedDoctor(event: any) {
        const doctor = this.doctors.find((doc) => doc.id === event.value);

        this.appointmentTimes = doctor.timesAvailable.split(',');
        this.appointmentDays = doctor.daysAvailable.split(',');
    }

    /**
     * Form Submit
     */
    submit() {
       
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
            this.loading.next(true);
            this.addAppointment();
        }
        
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

                  this.errors.next(this.errorService.getErrors(err));
                  console.log(this.errors.getValue());
              }
          );
  }

  addAppointment() {
      this.appointmentService.create(this.appointmentForm.value).subscribe(
            (res) => {
                this.loading.next(false);
                this.utilService.showSuccessToast(
                    'Appointment Added Successfully'
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

    getAppoitmentTime(timeString: string) {
        const times = timeString.split(' ');
        this.appointmentTimes = times;
    }

    ngOnInit() {
        this.getDoctors();
        this.getPatients();
        this.initAppointmentForm();
        if (this.data) {
            this.updating$.next(true);
            console.log('>>>>>>>>>>>GGGGGG>', this.data);
            this.appointmentForm.patchValue(this.data);
        }
    }

    calendarDaysObject() {}

    myFilter = (d: Date) => {
        const paths = {
            Sunday: 0,
            Monday: 1,
            Tuesday: 2,
            Wednesday: 3,
            Thursday: 4,
            Friday: 5,
            Saturday: 6,
        };

        const day = d.getDay();

        return this.appointmentDays.find((x) => {
            return day === paths[x];
        });
    };
}
