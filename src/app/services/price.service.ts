import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  price$: BehaviorSubject<any>;

  constructor() {
    // const cachedPrice = localStorage.getItem('price') ? JSON.parse(localStorage.getItem('price')) : { lower: 2, upper: 40 };

    const defaultPriceRange = { lower: 2, upper: 40 };

    this.price$ = new BehaviorSubject(defaultPriceRange);
  }
}
