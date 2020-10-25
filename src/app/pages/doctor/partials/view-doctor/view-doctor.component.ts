import { ErrorService } from './../../../../core/services/error.service';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from './../../../../core/services/util.service';
import { DoctorService } from './../../service/doctor.service';
import { DoctorModel } from './../../model/doctor.model';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-view-doctor',
    templateUrl: './view-doctor.component.html',
    styleUrls: ['./view-doctor.component.scss'],
})
export class ViewDoctorComponent implements OnInit {
    doctor = {} as DoctorModel;

    doctorId: string;

    constructor(
        private doctorService: DoctorService,
        private utilService: UtilService,
        private errorService: ErrorService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    goBack() {
        this.location.back();
    }

    getDoctor() {
        this.doctorService.getById(this.doctorId).subscribe(
            (res: any) => {
                this.doctor = res.data;
            },
            (error) => {
                this.utilService.showFailToast(
                    this.errorService.getErrors(error)
                );
            }
        );
    }

    ngOnInit() {
        this.doctorId = this.route.snapshot.paramMap.get('id');
        this.getDoctor();
    }
}
