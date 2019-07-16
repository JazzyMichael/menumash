import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  price$: BehaviorSubject<any>;

  constructor() {
    const defaultPriceRange = { lower: 4, upper: 40 };

    this.price$ = new BehaviorSubject(defaultPriceRange);
  }
}
