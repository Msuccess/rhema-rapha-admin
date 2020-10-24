import { PatientModel } from './../../model/patient.model';
import { ErrorService } from './../../../../core/services/error.service';
import { UtilService } from './../../../../core/services/util.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../service/patient.service';
@Component({
    selector: 'app-view-patient',
    templateUrl: './view-patient.component.html',
    styleUrls: ['./view-patient.component.scss'],
})
export class ViewPatientComponent implements OnInit {
    patient = {} as PatientModel;

    patientId: string;

    constructor(
        private patientService: PatientService,
        private utilService: UtilService,
        private errorService: ErrorService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    goBack() {
        this.location.back();
    }

    getPatient() {
        this.patientService.getById(this.patientId).subscribe(
            (res: any) => {
                this.patient = res.data;
            },
            (error) => {
                this.utilService.showFailToast(
                    this.errorService.getErrors(error)
                );
            }
        );
    }

    ngOnInit() {
        this.patientId = this.route.snapshot.paramMap.get('id');
        this.getPatient();
    }
}
