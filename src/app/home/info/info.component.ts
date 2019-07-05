import { Component, OnInit } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {

  constructor(private scrollService: ScrollService) { }

  ngOnInit() {}

  onScroll(event: any) {
    this.scrollService.scroll$.next(event);
  }
}
