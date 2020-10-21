import { Component, OnInit } from '@angular/core';
import { SPINNER } from 'ngx-ui-loader';

@Component({
  selector: 'app-rx-loader-bar',
  templateUrl: './rx-loader-bar.component.html',
  styleUrls: ['./rx-loader-bar.component.scss'],
})
export class RxLoaderBarComponent implements OnInit {
  spinnerType = SPINNER.circle;
  constructor() {}

  ngOnInit() {}
}
