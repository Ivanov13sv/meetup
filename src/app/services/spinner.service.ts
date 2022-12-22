import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private $loading = new BehaviorSubject<boolean>(false)
  set loading(status: boolean){
    this.$loading.next(status)
  }

  get loading(){
    return this.$loading.getValue();
  }

  constructor() { }
}
