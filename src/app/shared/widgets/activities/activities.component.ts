import { PatientModel } from './../../../pages/patient/model/patient.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-activities',
    templateUrl: './activities.component.html',
    styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit {
    @Input() patients: any;

    constructor() {}

    ngOnInit() {}
}
