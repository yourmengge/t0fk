import { Component, DoCheck } from '@angular/core';
import { HttpService } from '../http.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-lswtlb',
  templateUrl: './lswtlb.component.html',
  styleUrls: ['./lswtlb.component.css']
})
export class LswtlbComponent implements DoCheck {
  beginTime: any;
  teamCode: string;
  productCode: string;
  accountCode: string;
  appointOrderCode: string;
  list: any;
  code: any;
  constructor(public http: HttpService, public data: DataService) {
    this.beginTime = this.toTime(new Date(), 'yyyy-MM-dd');
    this.productCode = '';
    this.accountCode = '';
    this.appointOrderCode = '';
  }

  ngDoCheck() {
    if (this.code !== this.data.searchCode) {
      this.code = this.data.searchCode;
      if (this.code !== '') {
       // this.getList();
      }

    }
  }

  getList() {
    const data = {
      beginTime: this.toTime(this.beginTime, 'yyyyMMss'),
      endTime: this.toTime(this.beginTime, 'yyyyMMss'),
      teamCode: this.code,
      productCode: this.productCode,
      accountCode: this.accountCode,
      appointOrderCode: this.appointOrderCode
    };
    this.http.historyAppoint(data, 'appoint').subscribe((res) => {
      this.list = res;
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  toTime(time, type) {
    return this.data.getTime(type, time);
  }

}
