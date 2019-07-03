import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saved',
  templateUrl: 'saved.page.html',
  styleUrls: ['saved.page.scss']
})
export class SavedPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigateByUrl('tabs/saved/item-list');
  }

  onIonChange(event: any) {
    const path = event.detail.value || '';
    this.router.navigateByUrl(`tabs/saved/${path}`);
  }
}
