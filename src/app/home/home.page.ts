import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  zipCodeExpr: RegExp = new RegExp('^[0-9]{5}(?:-[0-9]{4})?$');
  zipCode: string = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigateByUrl('tabs/home/profile');
  }

  onIonChange(event: any) {
    const route = event.detail.value || '';
    this.router.navigateByUrl(`tabs/home/${route}`);
  }

}
