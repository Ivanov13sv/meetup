import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class PaginationService {
    total$ = new BehaviorSubject<number>(25);

    set total(number: number) {
        this.total$.next(number);
    }

    get total() {
        return this.total$.getValue();
    }

}
