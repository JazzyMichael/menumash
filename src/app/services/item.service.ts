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

    this.items$ = new BehaviorSubject(cachedItems);
    this.saved$ = new BehaviorSubject(cachedSaved);
    this.address$ = new BehaviorSubject(null);
    this.selected$ = new BehaviorSubject(null);

    if (cachedItems && cachedItems.length) {
      console.log('using cached items');
    } else {
      console.log('getting new items');
      this.getItems();
    }
  }

  init() {
    return;
  }

  getItems() {
    const callable = this.fns.httpsCallable('getItems');

    callable({ zipcode: 19104 })
      .subscribe(res => {
        // console.log(res);

        if (res && res.items) {
          this.items = res.items;
          this.items$.next(res.items);
          localStorage.setItem('items', JSON.stringify(res.items));
        }

        if (res && res.address) {
          this.address = res.address;
          this.address$.next(res.address);
        }
      });
  }

  saveItem(item: any) {
    let items: any[] = localStorage.getItem('saved') ? JSON.parse(localStorage.getItem('saved')) : [];

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
