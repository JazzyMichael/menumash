import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ItemService } from './services/item.service';
import { Plugins } from '@capacitor/core';
const { SplashScreen, StatusBar, Geolocation } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private itemService: ItemService
  ) {
    this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(async () => {

      SplashScreen.hide();

      try {
        const coordinates = await Geolocation.getCurrentPosition();

        const { latitude, longitude } = coordinates.coords;

        this.itemService.getItems({ latitude, longitude });

      } catch (e) {

        const address = localStorage.getItem('address') ? JSON.parse(localStorage.getItem('address')) : null;

        if (address) {
          this.itemService.getItems({
            zip: address.zip,
            latitude: address.latitude,
            longitude: address.longitude
          });
          console.log('Old location');
        } else {
          console.log('No location');
        }
      }

    });
  }
}
