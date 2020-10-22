import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { RxLoaderBarComponent } from './rx-loader-bar/rx-loader-bar.component';
import { ActionNotificationComponent } from './action-notification/action-notification.component';

@NgModule({
    declarations: [RxLoaderBarComponent, ActionNotificationComponent],
    exports: [RxLoaderBarComponent, NgxUiLoaderModule, NgbModule],
    imports: [CommonModule, NgxUiLoaderModule, NgbModule],
})
export class SharedModule {}
