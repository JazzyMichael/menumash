import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollService } from '../services/scroll.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  // scrollSub: Subscription;

  constructor(private router: Router, public scrollService: ScrollService) {}

  ngOnInit() {
    this.router.navigateByUrl('tabs/home/profile');
    // this.scrollSub = this.scrollService.scroll$.subscribe()
  }

  onIonChange(event: any) {
    const route = event.detail.value || '';
    this.router.navigateByUrl(`tabs/home/${route}`);
  }

}
