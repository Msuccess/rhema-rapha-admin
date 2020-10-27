import { ToastrService } from 'ngx-toastr';
import { ActionNotificationComponent } from './../../shared/action-notification/action-notification.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UtilService {
    loading: any;
    alert: any;
    loaders = [];
    toast: any;
    loaderStatus = new BehaviorSubject<boolean>(false);
    swal: any;
    options: any;

    constructor(
        private http: HttpClient,
        public toastr: ToastrService,
        private modalService: NgbModal
    ) {
        this.options = this.toastr.toastrConfig;
    }

    showSuccessToast(msg: string, title?: string) {
        this.toastr.success(msg, title);
    }

    showFailToast(msg: string, title?: string) {
        this.toastr.error(msg, title);
    }

    showConfirm(
        successCallback: Function,
        _failCallback?: Function,
        _message?: string
    ) {
        this.modalService
            .open(ActionNotificationComponent, { centered: true })
            .result.then(
                (result: any) => {
                    console.log('Result', result);
                    successCallback();
                },
                (reason: any) => {
                    console.log('Reason', reason);
                }
            );
    }

    showCancelConfirm(successCallback: Function, message: string) {
        this.modalService
            .open(ActionNotificationComponent, { centered: true })
            .result.then(
                (result: any) => {
                    console.log('Result', result);
                    successCallback();
                },
                (reason: any) => {
                    console.log('Reason', reason);
                }
            );
    }

    getJSONfromString(response: any) {
        if (typeof response !== 'string') {
            return response;
        } else {
            const splitResponse = response.split('}');
            const referral = splitResponse.pop();
            const joinResponse = splitResponse.join('}') + '}';
            const jsonData = JSON.parse(joinResponse);
            return { jsonData, referral };
        }
    }

    showLoader() {
        this.loaderStatus.next(true);
    }

    hideLoader() {
        this.loaderStatus.next(false);
    }

    getJson(res: any) {
        if (typeof res === 'string') {
            return JSON.parse(res);
        } else {
            return res;
        }
    }
}
