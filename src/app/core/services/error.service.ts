import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor() {}

  getErrors(errs: any): any {
    if (typeof errs === 'object') {
      if (errs.error.status === 0) {
        return 'Please Check Internet Connection';
      } else if (errs.error.message) {
        return errs.error.message;
      } else {
        return errs.error.message.message;
      }
    }
  }
}
