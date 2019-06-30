import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  friends: any[];

  constructor() {
    this.friends = [
      { name: 'Keaton Holman', swipes: 35, avatar: 'assets/icon/favicon.png' },
      { name: 'Jeffers Jaloopa', swipes: 89, avatar: 'assets/icon/favicon.png' },
      { name: 'Frank Benji', swipes: 26, avatar: 'assets/icon/favicon.png' },
      { name: 'Beck Ferry', swipes: 20, avatar: 'assets/icon/favicon.png' },
      { name: 'Gerald Villarial', swipes: 41, avatar: 'assets/icon/favicon.png' },
      { name: 'Peanut Heflet', swipes: 78, avatar: 'assets/icon/favicon.png' },
      { name: 'Emmett Cervantes', swipes: 89, avatar: 'assets/icon/favicon.png' },
      { name: 'Ursula Mckenzie', swipes: 17, avatar: 'assets/icon/favicon.png' },
      { name: 'Ryker Wayhan', swipes: 52, avatar: 'assets/icon/favicon.png' },
      { name: 'Bertha Gourne', swipes: 11, avatar: 'assets/icon/favicon.png' }
    ];
  }

  ngOnInit() {}

}
