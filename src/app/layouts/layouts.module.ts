import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UIModule } from '../shared/ui/ui.module';
import { EventService } from '../core/services/event.service';
import { LayoutComponent } from './layout.component';
import { MenuComponent } from './shared/menu/menu.component';
import { TopbarComponent } from './shared/topbar/topbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LeftsidebarComponent } from './shared/leftsidebar/leftsidebar.component';
import { VerticalComponent } from './vertical/vertical.component';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [
    LayoutComponent,
    MenuComponent,
    TopbarComponent,
    FooterComponent,
    LeftsidebarComponent,
    FooterComponent,
    VerticalComponent,
  ],
  imports: [CommonModule, RouterModule, UIModule],
  exports: [
    TopbarComponent,
    MenuComponent,
    LeftsidebarComponent,
    FooterComponent,
  ],
  providers: [EventService],
})
export class LayoutsModule {}
