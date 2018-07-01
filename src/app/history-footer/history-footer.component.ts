import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-history-footer',
  templateUrl: './history-footer.component.html',
  styleUrls: ['./history-footer.component.css']
})
export class HistoryFooterComponent implements OnInit {

  list: any;
  url: string;
  constructor(public data: DataService) {
    this.url = this.data.getUrl(4);
  }

  ngOnInit() {
    this.getList();
  }

  goto(url) {
    this.url = url;
    this.data.goto('main/' + this.data.getUrl(2) + '/history/' + url);
  }

  getList() {
    this.list = this.data.getHistoryFooter();
  }

}
