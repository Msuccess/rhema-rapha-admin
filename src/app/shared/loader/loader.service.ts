import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public loaderState = new BehaviorSubject<boolean>(false);

  constructor() {}

  show() {
    this.loaderState.next(true);
  }

  hide() {
    this.loaderState.next(false);
  }
}
