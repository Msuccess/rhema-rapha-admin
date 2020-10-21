import { UIModule } from '../shared/ui/ui.module';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { WidgetModule } from '../shared/widgets/widget.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        FormsModule,
        UIModule,
        WidgetModule,
        PagesRoutingModule,
    ],
})
export class PagesModule {}
