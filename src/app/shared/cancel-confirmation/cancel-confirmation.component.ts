import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cancel-confirmation',
  templateUrl: './cancel-confirmation.component.html',
  styleUrls: ['./cancel-confirmation.component.scss']
})
export class CancelConfirmationComponent implements OnInit {
  constructor(public modal: NgbActiveModal) {}

  ngOnInit() {
  }

}
