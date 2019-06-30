import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  displayName: string = 'Your Name';
  minPrice: number = 0;
  maxPrice: number = 40;
  price: any = { lower: 0, upper: 40 };
  radius: number = 5;

  constructor(public auth: AuthService) { }

  ngOnInit() { }

  priceChange(event: any) {
    this.minPrice = event.detail.value.lower;
    this.maxPrice = event.detail.value.upper;
  }

  radiusChange(event: any) {
    this.radius = event.detail.value;
  }

}
