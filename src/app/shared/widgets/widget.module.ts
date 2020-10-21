import { CommonModule } from '@angular/common';
import { UIModule } from '../ui/ui.module';

import { Profile1Component } from './userprofile/profile1/profile1.component';
import { Profile2Component } from './userprofile/profile2/profile2.component';
import { Profile3Component } from './userprofile/profile3/profile3.component';
import { Profile4Component } from './userprofile/profile4/profile4.component';
import { ActivitiesComponent } from './activities/activities.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MembersComponent } from './members/members.component';
import { OverviewComponent } from './overview/overview.component';
import { StatComponent } from './stat/stat.component';
import { TaskComponent } from './task/task.component';

@NgModule({
    declarations: [
        OverviewComponent,
        MembersComponent,
        TaskComponent,
        StatComponent,
        Profile1Component,
        Profile2Component,
        Profile3Component,
        Profile4Component,
        ActivitiesComponent,
    ],
    imports: [CommonModule, UIModule, FormsModule, ReactiveFormsModule],
    exports: [
        OverviewComponent,
        MembersComponent,
        TaskComponent,
        StatComponent,
        Profile1Component,
        Profile2Component,
        Profile3Component,
        Profile4Component,
        ActivitiesComponent,
    ],
})
export class WidgetModule {}
