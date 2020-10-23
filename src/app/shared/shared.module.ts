import { MatProgressBarModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActionNotificationComponent } from './action-notification/action-notification.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
    declarations: [ActionNotificationComponent, LoaderComponent],
    exports: [NgbModule, MatProgressBarModule, LoaderComponent],
    imports: [CommonModule, NgbModule, MatProgressBarModule],
    entryComponents: [ActionNotificationComponent],
})
export class SharedModule {}
