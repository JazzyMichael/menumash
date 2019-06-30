import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AnalyticsService } from '../services/analytics.service';

@Component({
  selector: 'app-items',
  templateUrl: 'items.page.html',
  styleUrls: ['items.page.scss']
})
export class ItemsPage implements OnInit, OnDestroy {
  itemSub: Subscription;
  items: any[];
  roundOfItems: any[];
  itemLimit: number = 10;
  page: number = 1;

  leftSwipe: string;
  rightSwipe: string;

  count: number;
  updateSwipeCount$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(
    public itemService: ItemService,
    private authService: AuthService,
    private analyticsService: AnalyticsService) { }

  ngOnInit() {
    this.count = this.authService.user ? this.authService.user.swipes : 0;

    this.itemSub = this.itemService.items$.subscribe((items: any[] = []) => {
      if (items) {
        this.items = items;
        this.roundOfItems = items.filter((item, index) => index < this.itemLimit);
      }
    });

    this.updateSwipeCount$.pipe(
      debounceTime(777)
    ).subscribe((num: number) => {
      this.count = num;
      this.authService.updateUserDoc({ swipes: num });
    });
  }

  like(item: any) {
    this.itemService.saveItem(item);
    this.rightSwipe = item.apiKey;
    this.analyticsService.swipe();

    setTimeout(() => {
      this.roundOfItems.shift();
      this.resetSwipeClasses();
      this.updateSwipeCount$.next(this.count + 1);
    }, 222);
  }

  skip(item: any) {
    this.leftSwipe = item.apiKey;
    this.analyticsService.swipe();

    setTimeout(() => {
      this.roundOfItems.shift();
      this.resetSwipeClasses();
      this.updateSwipeCount$.next(this.count + 1);
    }, 222);
  }

  resetSwipeClasses() {
    this.leftSwipe = null;
    this.rightSwipe = null;
  }

  viewDetails(item: any) {
    this.analyticsService.viewDetails();
    this.itemService.selected$.next(item);
  }

  skipAd() {
    this.page++;
    this.roundOfItems = this.items.filter((item, index) => index > (this.page-1) * this.itemLimit && index < (this.itemLimit * this.page));
  }

  ngOnDestroy() {
    this.itemSub.unsubscribe();
  }
}
