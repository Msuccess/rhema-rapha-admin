import { ErrorService } from './../../../core/services/error.service';
import { UtilService } from './../../../core/services/util.service';
import { AppointmentService } from './../../../pages/appointment/service/appointment.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
    @Input() appointments: any;

    constructor(
        private appointmentService: AppointmentService,
        private utilService: UtilService,
        private errorService: ErrorService
    ) {}

    public cancel(id: string) {
        this.appointmentService.cancelAppointment(id).subscribe(
            (res: any) => {
                this.utilService.showSuccessToast('Appointment Cancelled');
            },
            (error) => {
                this.utilService.showFailToast(
                    this.errorService.getErrors(error)
                );
            }
        );
    }

    cancelAppointment(id: string) {
        this.utilService.showCancelConfirm(() => this.cancel(id));
    }

    ngOnInit() {}
}
