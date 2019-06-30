import { Component } from '@angular/core';
import { ItemService } from '../services/item.service';
import { AnalyticsService } from '../services/analytics.service';

@Component({
  selector: 'app-saved',
  templateUrl: 'saved.page.html',
  styleUrls: ['saved.page.scss']
})
export class SavedPage {

  constructor(public itemService: ItemService, private analyticsService: AnalyticsService) { }

  select(item: any) {
    this.analyticsService.viewDetails(true);
    this.itemService.selected$.next(item);
  }
}
