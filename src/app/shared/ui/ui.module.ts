import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SlimscrollDirective } from './slimscroll.directive';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { PreloaderComponent } from './preloader/preloader.component';
import { PagetitleComponent } from './pagetitle/pagetitle.component';
import { FeatherIconDirective } from './feather-icon.directive';

@NgModule({
    declarations: [
        SlimscrollDirective,
        PreloaderComponent,
        PagetitleComponent,
        FeatherIconDirective,
    ],
    imports: [CommonModule, FormsModule, NgxUiLoaderModule],
    exports: [
        SlimscrollDirective,
        FeatherIconDirective,
        PreloaderComponent,
        PagetitleComponent,
        NgxUiLoaderModule,
    ],
})
export class UIModule {}
