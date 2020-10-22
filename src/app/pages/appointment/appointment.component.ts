import { AddAppointmentComponent } from './partials/add-appointment/add-appointment.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { config } from 'process';

@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.component.html',
    styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {
    constructor(public dialog: MatDialog) {}

    addAppointment() {
        const dialogRef = this.dialog.open(AddAppointmentComponent, {
            maxWidth: '500px',
            width: '500px',
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
        });
    }

    ngOnInit() {}
}
