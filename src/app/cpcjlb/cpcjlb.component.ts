import { Component, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
import { GetList } from '../get-list';

@Component({
  selector: 'app-cpcjlb',
  templateUrl: './cpcjlb.component.html',
  styleUrls: ['./cpcjlb.component.css']
})
export class CpcjlbComponent implements DoCheck {

  code: string;
  list: any;
  proName: any;
  listData: any;
  constructor(public data: DataService, public http: HttpService) {
    this.code = '';
    this.listData = new GetList();
  }

  ngDoCheck() {
    if (this.code !== this.data.productCode) {
      this.code = this.data.productCode;
      if (!this.data.isNull(this.code)) {
        this.getList();
      }
    }
  }

  getList() {
    this.data.clearTimeOut();
    this.http.productTrade(this.code).subscribe((res) => {
      this.list = res;
      this.data.settimeout = setTimeout(() => {
        this.getList();
      }, this.data.timeout);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  export() {
    this.http.exportTradeProduct(this.code).subscribe((res) => {
      this.data.downloadFile(res, '产品成交列表');
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

}
