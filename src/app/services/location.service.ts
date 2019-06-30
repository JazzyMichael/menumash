import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  currentLocation: any;
  userId: string;

  constructor() { }

  getGeolocation() {
    return;
  }

  setZipcode() {
    return;
  }

  updateLocation(newLocation: any) {
    this.currentLocation = newLocation;

    localStorage.setItem('currentLocation', newLocation);

    if (this.userId) {
      // update in firestore
    }
  }
}
