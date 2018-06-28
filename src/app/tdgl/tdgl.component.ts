import { Component, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-tdgl',
  templateUrl: './tdgl.component.html',
  styleUrls: ['./tdgl.component.css']
})

export class TdglComponent implements DoCheck {
  price: any;
  code: any;
  name: any;
  url: string;
  historyFooter: boolean;
  constructor(public data: DataService, public http: HttpService) {
    this.code = '';
    this.name = '';
  }

  ngDoCheck() {
    if (this.code !== this.data.searchCode) {
      this.code = this.data.searchCode;
      this.name = this.data.searchName;
      this.getPrice();
    }
    this.url = this.data.getUrl(3);
    if (this.url === 'history') {
      this.historyFooter = this.data.show;
    } else {
      this.historyFooter = this.data.hide;
    }
  }

  /**
   * 获取团队当日盈亏
   */
  getPrice() {
    this.http.getTeamPrice(this.code).subscribe((res) => {
      this.price = res;
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  history() {
    this.data.goto('main/tdgl/history');
  }



}
