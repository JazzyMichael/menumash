import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ItemService } from 'src/app/services/item.service';
import { take } from 'rxjs/operators';
import { PriceService } from 'src/app/services/price.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  price: any;
  radius: number = 5;
  typing: boolean;
  editing: string;
  addressSub: Subscription;
  address: any = { zip: '' };
  validZip: boolean;

  constructor(
    public auth: AuthService,
    public itemService: ItemService,
    private priceService: PriceService) { }

  ngOnInit() {
    this.addressSub = this.itemService.address$.subscribe(address => {

      if (address && address.latitude) {
        address.latitude = `${address.latitude}`;
      }
      if (address && address.longitude) {
        address.longitude = `${address.longitude}`;
      }

      this.address = address || {};

      this.validZip = this.address && this.address.zip ? true : false;
    });

    this.priceService.price$.pipe(
      take(1)
    ).subscribe(price => {
      this.price = price;
    });
  }

  zipInputBlur() {
    this.typing = false;
    if (this.address && this.address.zip && this.validZip) {
      this.itemService.getItems({ zip: this.address.zip, radius: this.radius });
    }
  }

  inputChange(event: any) {
    const zipcodePattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
    const isValid = zipcodePattern.test(event.detail.value);

    if (isValid) {
      this.validZip = true;
      this.address.zip = event.detail.value;
      this.itemService.address$.next({ ...this.itemService.address, zip: this.address.zip });
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

  ngOnDestroy() {
    this.addressSub.unsubscribe();
  }
}
