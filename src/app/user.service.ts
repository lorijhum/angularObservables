import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class UserService {
 //   activatedEmitter = new EventEmitter<boolean>();
    activatedEmitter = new Subject<boolean>();
}