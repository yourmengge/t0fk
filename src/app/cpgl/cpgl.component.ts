import { Component, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-cpgl',
  templateUrl: './cpgl.component.html',
  styleUrls: ['./cpgl.component.css']
})
export class CpglComponent implements DoCheck {
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
    if (this.code !== this.data.productCode) {
      this.code = this.data.productCode;
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
   * 获取产品发生金额
   */
  getPrice() {
    this.data.clearPrice();
    this.http.productProfit(this.code).subscribe((res) => {
      this.price = res;
      this.data.settimeoutprice = setTimeout(() => {
        this.getPrice();
      }, this.data.timeout);
    }, (err) => {
      this.data.error = err.error;
      // this.data.isError();
    });
  }



  back() {
    this.data.initHistoryWord();
    this.data.goto('main/cpgl');
  }

}
