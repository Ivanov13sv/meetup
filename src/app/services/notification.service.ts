import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { INotification } from '../shared/models/notification.interface';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    error$ = new Subject<string>();
    notificationStatus$ = new BehaviorSubject<INotification>(INotification.succes)

    get status(){
        return this.notificationStatus$.getValue();
    }
    
    handle(message: string, type: INotification) {
        this.error$.next(message);
        this.notificationStatus$.next(type);
        setTimeout(() => this.error$.next(''),2000)
    }
   
    clean() {
        this.error$.next('');
    }
    constructor() {}
}
