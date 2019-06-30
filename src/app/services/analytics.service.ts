import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  eventTracking: boolean;

  constructor() {
    this.eventTracking = false;
  }

  pageView() {
    if (this.eventTracking) {
      console.log('PageView Event');
      // name of page
    }

    return;
  }

  swipe() {
    if (this.eventTracking) {
      console.log('Swipe Event');
      // like or skip
      // signed in?
      // viewing details?
      // timestamp
      // item apiKey
      // item name
      // item price
    }

    return;
  }

  signIn() {
    if (this.eventTracking) {
      console.log('Sign In Event');
      // set user id
      // email
      // displayName
      // uid
      // timestamp
    }

    return;
  }

  signOut() {
    if (this.eventTracking) {
      console.log('Sign Out Event');
      // reset user id
    }

    return;
  }

  viewDetails(saved: boolean = false) {
    if (this.eventTracking) {
      console.log('View Details Event, already saved:', saved);
      // item apiKey
      // item name
      // item price
      // signed in?
      // timestamp
      // from saved or swipe screen?
    }

    return;
  }

  purchase() {
    if (this.eventTracking) {
      console.log('Purchase Event');
      // item apiKey
      // item name
      // item price
      // swipes
      // signed in?
      // timestamp
    }

    return;
  }

  geolocation() {
    if (this.eventTracking) {
      console.log('GeoLocation Event');
      // coordinates
      // signed in?
    }

    return;
  }

  manualZip() {
    if (this.eventTracking) {
      console.log('ManualZip Event');
      // zipcode
      // signed in?
    }

    return;
  }
}
