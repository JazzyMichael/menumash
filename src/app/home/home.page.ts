import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { ScrollService } from '../services/scroll.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigateByUrl('tabs/home/profile');
  }

  onIonChange(event: any) {
    const route = event.detail.value || '';
    this.router.navigateByUrl(`tabs/home/${route}`);
  }

}
