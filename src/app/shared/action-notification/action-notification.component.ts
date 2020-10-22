import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-action-notification',
    templateUrl: './action-notification.component.html',
    styleUrls: ['./action-notification.component.scss'],
})
export class ActionNotificationComponent implements OnInit {
    constructor(public modal: NgbActiveModal) {}

    ngOnInit() {}
}
