import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  selectedOption$ = new BehaviorSubject<string>('');

  set selectedOption(option: string){
    this.selectedOption$.next(option)
  }

  get selectedOption(){
    return this.selectedOption$.getValue();
  }
}
