import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  //   activatedEmitter = new EventEmitter<boolean>();
  // New / better usage using Subject (observable)
  activatedEmitter = new Subject<boolean>();

  constructor() {}
}
