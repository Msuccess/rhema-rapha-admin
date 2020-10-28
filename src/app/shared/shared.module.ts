import { MatProgressBarModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActionNotificationComponent } from './action-notification/action-notification.component';
import { LoaderComponent } from './loader/loader.component';
import { CancelConfirmationComponent } from './cancel-confirmation/cancel-confirmation.component';

@NgModule({
    declarations: [ActionNotificationComponent, LoaderComponent, CancelConfirmationComponent],
    exports: [NgbModule, MatProgressBarModule, LoaderComponent],
    imports: [CommonModule, NgbModule, MatProgressBarModule],
    entryComponents: [ActionNotificationComponent,CancelConfirmationComponent],
})
export class SharedModule {}
