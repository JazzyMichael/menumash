import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  items: any[];
  items$: BehaviorSubject<any[]>;
  saved: any[];
  saved$: BehaviorSubject<any[]>;
  address: any;
  address$: BehaviorSubject<any>;
  selected$: BehaviorSubject<any[]>;

  constructor(private fns: AngularFireFunctions) {
    const cachedItems = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    const cachedSaved = localStorage.getItem('saved') ? JSON.parse(localStorage.getItem('saved')) : [];
    const cachedAddress = localStorage.getItem('address') ? JSON.parse(localStorage.getItem('address')) : null;

    this.items$ = new BehaviorSubject(cachedItems);
    this.saved$ = new BehaviorSubject(cachedSaved);
    this.address$ = new BehaviorSubject(cachedAddress);
    this.selected$ = new BehaviorSubject(null);

    if (cachedItems && cachedItems.length) {
      console.log('using cached items');
    } else if (cachedAddress && cachedAddress.zip) {
      console.log('getting new items');
      this.address = cachedAddress;
      this.getItems({ zipcode: cachedAddress.zip });
    } else {
      console.log('no location, no items');
    }
  }

  init() {
    return;
  }

  async shuffle(arr: any[]) {
    // Fisher-Yates Algorithm traverses array in reverse swapping each index with a random one before it

    const array = [].concat(arr);

    for (let i = array.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      [array[i], array[random]] = [array[random], array[i]];

      if (i === 1) {
        return array;
      }
    }
  }

  getItems({ zipcode, longitude = null, latitude = null, radius = null }) {

    if (!zipcode && !longitude && !latitude) {
      console.log('no location');
      return;
    }

    const callable = this.fns.httpsCallable('getItems');

    callable({ zipcode, longitude, latitude, radius })
      .subscribe(async res => {
        if (!res || res.error) {
          console.log('error getting items', res);
          return;
        }

        if (res && res.items) {
          const shuffledItems = await this.shuffle(res.items);
          this.items = shuffledItems;
          this.items$.next(shuffledItems);
          localStorage.setItem('items', JSON.stringify(shuffledItems));
        }

        if (res && res.address) {
          this.address = res.address;
          this.address$.next(res.address);
          localStorage.setItem('address', JSON.stringify(res.address));
        }
      });
  }

  saveItem(item: any) {
    let items: any[] = localStorage.getItem('saved') ? JSON.parse(localStorage.getItem('saved')) : [];

    if (items.length > 50) {
      items = items.slice(items.length - 50, items.length - 1);
    }

    items = items.filter(savedItem => savedItem.apiKey !== item.apiKey);

    items.push(item);

    this.persistSave(items);
  }

  removeItem(apiKey: string) {
    let items: any[] = JSON.parse(localStorage.getItem('saved'));

    items = items.filter(item => item.apiKey !== apiKey);

    this.persistSave(items);
  }

  persistSave(items: any[]) {
    this.saved = [...items];

    this.saved$.next(items);

    localStorage.setItem('saved', JSON.stringify(items));
  }
}
