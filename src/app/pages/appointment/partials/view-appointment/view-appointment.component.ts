import { AppointmentModel } from './../../model/appointment.model';
import { UtilService } from './../../../../core/services/util.service';
import { ErrorService } from './../../../../core/services/error.service';
import { AppointmentService } from './../../service/appointment.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
    selector: 'app-view-appointment',
    templateUrl: './view-appointment.component.html',
    styleUrls: ['./view-appointment.component.scss'],
})
export class ViewAppointmentComponent implements OnInit {
    appointmentId: string;
    appointment = {} as AppointmentModel;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private appointmentService: AppointmentService,
        private utilService: UtilService,
        private errorService: ErrorService
    ) {}

    goBack() {
        this.location.back();
    }

    getApointment() {
        this.appointmentService.getById(this.appointmentId).subscribe(
            (res: any) => {
                this.appointment = res.data;
            },
            (error) => {
                this.utilService.showFailToast(
                    this.errorService.getErrors(error)
                );
            }
        );
    }

    ngOnInit() {
        this.appointmentId = this.route.snapshot.paramMap.get('id');
        this.getApointment();
    }
}
