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
  }

  /**
   * 获取产品发生金额
   */
  getPrice() {
    this.http.productProfit(this.code).subscribe((res) => {
      this.price = res;
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  // history() {
  //   this.data.goto('main/lswtlb');
  // }


}
