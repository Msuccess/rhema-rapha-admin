import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor() {}

  getErrors(errs: any): any {
    if (typeof errs === 'object') {
      try {
        if (errs.status === 0) {
          return 'Please Check Internet Connection';
        } else if (errs.error.message) {
          return errs.error.message;
        } else if (errs.status === 404) {
          return 'Not Found';
        } else {
          return errs.error.message.message;
        }
      } catch (error) {
        return 'Bad Request';
      }
    }
  }
}
