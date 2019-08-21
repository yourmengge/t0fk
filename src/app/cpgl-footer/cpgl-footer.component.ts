import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-cpgl-footer',
  templateUrl: './cpgl-footer.component.html',
  styleUrls: ['./cpgl-footer.component.css']
})
export class CpglFooterComponent implements OnInit {

  list: any;
  url: string;
  constructor(public data: DataService) {
    this.url = this.data.getUrl(3);
  }

  ngOnInit() {
    this.getList();
  }

  goto(url) {
    this.url = url;
    this.data.goto('main/cpgl/' + url);
  }

  getList() {
    this.list = this.data.getCpglFooter();
  }

}
