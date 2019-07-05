import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  minPrice: number = 0;
  maxPrice: number = 40;
  price: any = { lower: 0, upper: 40 };
  radius: number = 5;
  zipcode: number | string = null;

  constructor(
    public auth: AuthService,
    public itemService: ItemService) { }

  ngOnInit() { }

  inputChange(event: any) {
    const zipcodePattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
    const isValid = zipcodePattern.test(event.detail.value);

    console.log(event.detail.value, zipcodePattern.test(event.detail.value));

    if (isValid) {
      this.zipcode = event.detail.value;
      this.itemService.address$.next({ ...this.itemService.address, zipcode: this.zipcode });
      console.log('valid');
    } else {
      console.log('invalid');
    }
  }

  priceChange(event: any) {
    this.minPrice = event.detail.value.lower;
    this.maxPrice = event.detail.value.upper;
  }

  radiusChange(event: any) {
    this.radius = event.detail.value;
  }

}
