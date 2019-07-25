import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  // scroll$: BehaviorSubject<any> = new BehaviorSubject(null);

  // showHeader$: Observable<any> = this.scroll$.asObservable().pipe(
  //   map(event => {

  //     if (!event || !event.detail) {
  //       // page load
  //       return { show: true };
  //     }

  //     if (event.detail.scrollTop < 50) {
  //       // top of page
  //       return { show: true };
  //     }

  //     if (event.detail.deltaY < -10) {
  //       // scroll up more than a little
  //       return { show: true};
  //     }

  //     return { show: false };
  //   })
  // );

}
