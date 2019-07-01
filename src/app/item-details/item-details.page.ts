import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from '../services/item.service';
import { AnalyticsService } from '../services/analytics.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {
  saved: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private analyticsService: AnalyticsService,
    public itemService: ItemService) { }

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => this.saved = params && params.saved);
  }

  async goBack() {
    const url = this.saved ? 'tabs/saved' : 'tabs/items';

    this.itemService.selected$.next(null);

    return this.router.navigateByUrl(url);
  }

  like(item: any) {
    if (!this.saved) {
      this.itemService.saveItem(item);
      return this.router.navigateByUrl('tabs/items');
    }
  }

  skip(item: any) {
    this.itemService.selected$.next(null);

    this.router.navigateByUrl('tabs/items');
  }

  purchaseOnEatstreet() {
    this.analyticsService.purchase();
    this.router.navigateByUrl('tabs/home/profile');
  }
}
