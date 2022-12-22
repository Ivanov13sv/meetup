import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ConfirmService {
    constructor() {}

    confirm$ = new BehaviorSubject<boolean>(false);

    openConfirm(){
        this.confirm$.next(true)
    }

    closeConfirm(){
        this.confirm$.next(false)
    }

    get confirm(){
        return this.confirm$.getValue();
    }
}
