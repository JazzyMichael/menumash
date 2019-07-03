import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { AnalyticsService } from 'src/app/services/analytics.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {

  constructor(public itemService: ItemService, private analyticsService: AnalyticsService) { }

  ngOnInit() {}

  select(item: any) {
    this.analyticsService.viewDetails(true);
    this.itemService.selected$.next(item);
  }
}
