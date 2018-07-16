import { Component, OnInit, DoCheck } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, DoCheck {
  url: string;
  constructor(public data: DataService) { }

  ngDoCheck() {
    this.url = this.data.getUrl(2);
    if (this.url === 'cpgl') {
      this.data.searchCode = this.data.productCode;
    }

  }

  ngOnInit() {
    this.data.clearTimeOut();
    this.data.clearPrice();
    console.log('history');
  }

}
