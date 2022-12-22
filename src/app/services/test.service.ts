import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  test = new BehaviorSubject<boolean>(true)

  constructor() { }
}
