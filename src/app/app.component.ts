import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ItemService } from './services/item.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar,
    private itemService: ItemService
  ) {
    this.initializeApp();
    this.itemService.init();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('I\'m Ready!');
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
    });
  }
}
