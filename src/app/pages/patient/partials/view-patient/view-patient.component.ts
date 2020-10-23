import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.scss'],
})
export class ViewPatientComponent implements OnInit {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }

  ngOnInit() {}
}
