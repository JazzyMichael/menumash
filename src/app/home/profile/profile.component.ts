import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ItemService } from 'src/app/services/item.service';
import { take } from 'rxjs/operators';
import { PriceService } from 'src/app/services/price.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  minPrice: number;
  maxPrice: number;
  price: any;
  radius: number = 5;
  zipcode: number | string = null;
  latitude: string = null;
  longitude: string = null;
  typing: boolean;
  validZip: boolean;
  editing: string;

  constructor(
    public auth: AuthService,
    public itemService: ItemService,
    private priceService: PriceService) { }

  ngOnInit() {
    this.itemService.address$.pipe(
      take(1)
    ).subscribe(address => {
      this.zipcode = address && address.zip ? address.zip : null;
      this.latitude = address && address.latitude ? `${address.latitude}` : null;
      this.longitude = address && address.longitude ? `${address.longitude}` : null;
      this.validZip = this.zipcode ? true : false;
    });

    this.priceService.price$.pipe(
      take(1)
    ).subscribe(price => {
      this.price = price;
      this.minPrice = price.lower;
      this.maxPrice = price.upper;
    });
  }

  zipInputBlur() {
    this.typing = false;
    if (this.zipcode && this.validZip) {
      this.itemService.getItems({ zipcode: this.zipcode, radius: this.radius });
    }
  }

  inputChange(event: any) {
    const zipcodePattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
    const isValid = zipcodePattern.test(event.detail.value);

    if (isValid) {
      this.validZip = true;
      this.zipcode = event.detail.value;
      this.itemService.address$.next({ ...this.itemService.address, zip: this.zipcode });
    } else {
      this.validZip = false;
    }
  }

  priceChange(event: any) {
    this.price = event.detail.value;
  }

  radiusChange(event: any) {
    this.radius = event.detail.value;
  }

  updatePrice() {
    this.priceService.price$.next(this.price);
    this.editing = null;
  }

  updateRadius() {
    this.zipInputBlur();
    this.editing = null;
  }

}
