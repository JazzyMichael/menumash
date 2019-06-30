import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  url = 'https://eatstreet.com/publicapi/v1/restaurant/search?method=both';
  radius = '&pickup-radius=10';
  coordinates = '&latitude=43.073052&longitude=-89.40123';
  address = '&street-address=19104';

  items: any[];
  items$: BehaviorSubject<any[]>;
  saved: any[];
  saved$: BehaviorSubject<any[]>;

  selected$: BehaviorSubject<any[]>;

  constructor(private http: HttpClient) {
    const cachedItems = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('item')) : [];
    const cachedSaved = localStorage.getItem('saved') ? JSON.parse(localStorage.getItem('saved')) : [];

    this.items$ = new BehaviorSubject(cachedItems);
    this.saved$ = new BehaviorSubject(cachedSaved);
    this.selected$ = new BehaviorSubject(null);

    this.getItems();
  }

  getItems() {
    this.http.get('../assets/items.json')
      .subscribe((items: any) => {
        items = items.items;
        console.log({ items });
        this.items = items;
        this.items$.next(items);
        localStorage.setItem('items', JSON.stringify(items));
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

/*

5 restaurants near 19104

{
      "apiKey": "90fd4587554469b1f15b4f2e73e7618004804a33959e0904",
      "deliveryMin": 10,
      "logoUrl": "https://static.eatstreet.com/assets/images/restaurant_logos/lins-kitchen-35608_1455834032080.png",
      "name": "A Lin Kitchen",
      "streetAddress": "1942 S. 9th Street",
      "city": "Philadelphia",
      "state": "PA",
      "zip": "19148",
      "foodTypes": [
        "Chinese Food",
        "Fusion",
        "American Food",
        "Chinese",
        "American (Traditional)",
        "Asian Fusion"
      ],
      "phone": "(215) 468-8909",
      "latitude": 39.924616,
      "longitude": -75.161194,
      "minFreeDelivery": 0,
      "taxRate": 0.08,
      "acceptsCash": true,
      "acceptsCard": true,
      "offersPickup": true,
      "offersDelivery": true,
      "isTestRestaurant": false,
      "minWaitTime": 45,
      "maxWaitTime": 60,
      "open": true,
      "url": "https://eatstreet.com/philadelphia-pa/restaurants/a-lin-kitchen",
      "hours": {
        "Monday": [
          "6:00 PM - 12:00 AM"
        ],
        "Saturday": [
          "11:45 AM - 12:00 AM"
        ],
        "Sunday": [
          "11:45 AM - 12:00 AM"
        ],
        "Wednesday": [
          "11:45 AM - 12:00 AM"
        ],
        "Tuesday": [
          "11:45 AM - 12:00 AM"
        ],
        "Friday": [
          "11:45 AM - 12:00 AM"
        ],
        "Thursday": [
          "11:45 AM - 12:00 AM"
        ]
      },
      "timezone": "US/Eastern"
    },
    {
      "apiKey": "90fd4587554469b1f15b4f2e73e76180dba368381ffb1f39",
      "deliveryMin": 10,
      "logoUrl": "https://static.eatstreet.com/assets/images/restaurant_logos/aandj-seafood-33131_1444080176489.png",
      "name": "A&J Seafood",
      "streetAddress": "3148 N Broad St",
      "city": "Philadelphia",
      "state": "PA",
      "zip": "19132",
      "foodTypes": [
        "Seafood",
        "Wings",
        "Chicken",
        "Seafood Markets"
      ],
      "phone": "(215) 225-7700",
      "latitude": 40.001305,
      "longitude": -75.153253,
      "minFreeDelivery": 0,
      "taxRate": 0.08,
      "acceptsCash": false,
      "acceptsCard": true,
      "offersPickup": true,
      "offersDelivery": true,
      "isTestRestaurant": false,
      "minWaitTime": 45,
      "maxWaitTime": 60,
      "open": true,
      "url": "https://eatstreet.com/philadelphia-pa/restaurants/a-and-j-seafood",
      "hours": {
        "Monday": [
          "10:00 AM - 9:30 PM"
        ],
        "Saturday": [
          "10:00 AM - 10:30 PM"
        ],
        "Sunday": [
          "12:00 PM - 9:30 PM"
        ],
        "Wednesday": [
          "10:00 AM - 9:30 PM"
        ],
        "Tuesday": [
          "10:00 AM - 9:30 PM"
        ],
        "Friday": [
          "3:00 PM - 10:30 PM"
        ],
        "Thursday": [
          "10:00 AM - 9:30 PM"
        ]
      },
      "timezone": "US/Eastern"
    },
    {
      "apiKey": "90fd4587554469b1144247b91fbcb2f30742086f532b2f12",
      "deliveryMin": 30,
      "logoUrl": "https://static.eatstreet.com/assets/images/restaurant_logos/avianna-29658_1426031616556.png",
      "name": "AViANNA",
      "streetAddress": "55 E Baltimore Ave",
      "city": "Lansdowne",
      "state": "PA",
      "zip": "19050",
      "foodTypes": [
        "Asian Food",
        "Vietnamese Food",
        "Fusion",
        "Thai Food",
        "Catering",
        "Venues & Event Spaces",
        "Asian Fusion",
        "Laotian",
        "Thai",
        "Vietnamese"
      ],
      "phone": "(610) 622-0954",
      "latitude": 39.938935,
      "longitude": -75.269931,
      "minFreeDelivery": 0,
      "taxRate": 0.06,
      "acceptsCash": true,
      "acceptsCard": true,
      "offersPickup": true,
      "offersDelivery": false,
      "isTestRestaurant": false,
      "minWaitTime": 45,
      "maxWaitTime": 60,
      "open": true,
      "url": "https://eatstreet.com/philadelphia-pa/restaurants/avianna",
      "hours": {
        "Saturday": [
          "4:00 PM - 9:30 PM"
        ],
        "Wednesday": [
          "4:00 PM - 8:45 PM"
        ],
        "Tuesday": [
          "4:00 PM - 8:45 PM"
        ],
        "Friday": [
          "4:00 PM - 9:30 PM"
        ],
        "Thursday": [
          "4:00 PM - 8:45 PM"
        ]
      },
      "timezone": "US/Eastern"
    },
    {
      "apiKey": "90fd4587554469b1144247b91fbcb2f3e04f50a61623f62f",
      "deliveryMin": 10,
      "logoUrl": "https://static.eatstreet.com/assets/images/restaurant_logos/adobe-cafe-18287_1406742820016.png",
      "name": "Adobe Cafe - Mitchell St.",
      "streetAddress": "4550 Mitchell St",
      "city": "Philadelphia",
      "state": "PA",
      "zip": "19128",
      "foodTypes": [
        "Vegan",
        "Mexican Food"
      ],
      "phone": "(215) 483-3947",
      "latitude": 40.034189,
      "longitude": -75.219178,
      "minFreeDelivery": 0,
      "taxRate": 0.08,
      "acceptsCash": true,
      "acceptsCard": true,
      "offersPickup": true,
      "offersDelivery": true,
      "isTestRestaurant": false,
      "minWaitTime": 45,
      "maxWaitTime": 60,
      "open": true,
      "url": "https://eatstreet.com/philadelphia-pa/restaurants/adobe-cafe-mitchell-st",
      "hours": {
        "Monday": [
          "3:00 PM - 10:00 PM"
        ],
        "Saturday": [
          "11:30 AM - 11:00 PM"
        ],
        "Sunday": [
          "11:30 AM - 10:00 PM"
        ],
        "Wednesday": [
          "3:00 PM - 10:00 PM"
        ],
        "Tuesday": [
          "3:00 PM - 10:00 PM"
        ],
        "Friday": [
          "11:30 AM - 11:00 PM"
        ],
        "Thursday": [
          "12:00 PM - 11:00 PM"
        ]
      },
      "timezone": "US/Eastern"
    },
    {
      "apiKey": "90fd4587554469b1884225aec137a02af9fec566d0aabcc3",
      "deliveryMin": 20,
      "logoUrl": "https://static.eatstreet.com/assets/images/restaurant_logos/africans-and-jamaicans-kitchen-13408_1401308475676.png",
      "name": "Africans and Jamaicans Kitchen",
      "streetAddress": "125 Chester Ave",
      "city": "Yeadon",
      "state": "PA",
      "zip": "19013",
      "foodTypes": [
        "Jamaican Food",
        "African Food",
        "Caribbean Food",
        "African",
        "Caribbean"
      ],
      "phone": "(610) 259-5733",
      "latitude": 39.923971,
      "longitude": -75.255235,
      "minFreeDelivery": 0,
      "taxRate": 0.06,
      "acceptsCash": true,
      "acceptsCard": true,
      "offersPickup": true,
      "offersDelivery": false,
      "isTestRestaurant": false,
      "minWaitTime": 45,
      "maxWaitTime": 60,
      "open": true,
      "url": "https://eatstreet.com/philadelphia-pa/restaurants/africans-and-jamaicans-kitchen",
      "hours": {
        "Monday": [
          "11:00 AM - 9:00 PM"
        ],
        "Saturday": [
          "11:00 AM - 9:00 PM"
        ],
        "Wednesday": [
          "11:00 AM - 9:00 PM"
        ],
        "Tuesday": [
          "11:00 AM - 9:00 PM"
        ],
        "Friday": [
          "11:00 AM - 9:00 PM"
        ],
        "Thursday": [
          "11:00 AM - 9:00 PM"
        ]
      },
      "timezone": "US/Eastern"
    }






*/