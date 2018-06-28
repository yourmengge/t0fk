import { Component, DoCheck } from '@angular/core';
import { HttpService } from '../http.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-lscj',
  templateUrl: './lscj.component.html',
  styleUrls: ['./lscj.component.css']
})
export class LscjComponent implements DoCheck {

  beginTime: any;
  teamCode: string;
  productCode: string;
  accountCode: string;
  appointOrderCode: string;
  list: any;
  code: any;
  constructor(public http: HttpService, public data: DataService) {
    this.beginTime = new Date();
    this.productCode = '';
    this.accountCode = '';
    this.appointOrderCode = '';
  }

  ngDoCheck() {
    if (this.code !== this.data.searchCode) {
      this.code = this.data.searchCode;
      if (this.code !== '') {
        this.getList();
      }

    }
  }

  getList() {
    const data = {
      beginTime: this.toTime(this.beginTime),
      endTime: this.toTime(this.beginTime),
      teamCode: this.code,
      productCode: this.productCode,
      accountCode: this.accountCode,
      appointOrderCode: this.appointOrderCode
    };
    this.http.historyAppoint(data, 'trade').subscribe((res) => {
      this.list = res;
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  toTime(time) {
    return this.data.getTime('yyyyMMss', time);
  }

}
