import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { RxLoaderBarComponent } from './rx-loader-bar/rx-loader-bar.component';

@NgModule({
  declarations: [RxLoaderBarComponent],
  exports: [RxLoaderBarComponent, NgxUiLoaderModule],
  imports: [CommonModule, NgxUiLoaderModule],
})
export class SharedModule {}
