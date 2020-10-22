import { LoaderService } from './loader.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  show: boolean;
  constructor(private loaderService: LoaderService) {
    this.loaderService.loaderState.subscribe((res) => {
      this.show = res;
      console.log(this.show);
    });
  }
}
