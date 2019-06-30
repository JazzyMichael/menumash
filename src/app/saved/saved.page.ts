import { Component } from '@angular/core';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-saved',
  templateUrl: 'saved.page.html',
  styleUrls: ['saved.page.scss']
})
export class SavedPage {

  constructor(public itemService: ItemService) { }

  select(item: any) {
    this.itemService.selected$.next(item);
  }
}
