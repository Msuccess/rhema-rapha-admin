import { CommonModule } from '@angular/common';
import { UIModule } from '../ui/ui.module';

import { ActivitiesComponent } from './activities/activities.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MembersComponent } from './members/members.component';
import { OverviewComponent } from './overview/overview.component';
import { StatComponent } from './stat/stat.component';
import { TaskComponent } from './task/task.component';
import { AvatarModule } from 'ngx-avatar';
import { MatIconModule, MatMenuModule } from '@angular/material';
import { NgApexchartsModule } from 'ng-apexcharts';
import { StatchartComponent } from './statchart/statchart.component';

@NgModule({
    declarations: [
        OverviewComponent,
        MembersComponent,
        TaskComponent,
        StatComponent,
        ActivitiesComponent,
        StatchartComponent,
    ],
    imports: [
        CommonModule,
        UIModule,
        FormsModule,
        ReactiveFormsModule,
        AvatarModule,
        MatIconModule,
        MatMenuModule,
        NgApexchartsModule,
    ],
    exports: [
        OverviewComponent,
        MembersComponent,
        TaskComponent,
        StatComponent,
        ActivitiesComponent,
        StatchartComponent,
    ],
})
export class WidgetModule {}
