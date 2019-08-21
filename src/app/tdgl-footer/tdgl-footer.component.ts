import { Component, OnInit, DoCheck } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-tdgl-footer',
  templateUrl: './tdgl-footer.component.html',
  styleUrls: ['./tdgl-footer.component.css']
})
export class TdglFooterComponent implements OnInit, DoCheck {
  list: any;
  url: string;
  constructor(public data: DataService) {
    this.url = this.data.getUrl(3);
  }

  ngOnInit() {
    this.getList();
  }

  ngDoCheck() {
    this.url = this.data.getUrl(3);
  }

  goto(url) {
    this.url = url;
    this.data.clearTimeOut();
    this.data.goto('main/tdgl/' + url);
  }

  getList() {
    this.list = this.data.getTdglFooter();
  }

}
