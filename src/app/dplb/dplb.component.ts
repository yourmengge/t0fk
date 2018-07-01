import { Component, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-dplb',
  templateUrl: './dplb.component.html',
  styleUrls: ['./dplb.component.css']
})
export class DplbComponent implements DoCheck {
  code: string;
  list: any;
  proName: any;
  userCode: any;
  searchCode: any;
  constructor(public data: DataService, public http: HttpService) {
    this.code = '';
    this.userCode = this.data.userCode;
  }

  ngDoCheck() {
    if (this.code !== this.data.searchCode) {
      this.code = this.data.searchCode;
      this.search();
    }
  }

  search() {
    this.searchCode = this.userCode;
    this.data.userCode = this.searchCode;
    this.getList();
  }

  getList() {
    this.data.clearTimeOut();
    const data = {
      teamCode: this.code,
      accountCode: this.searchCode
    };
    this.http.getClosed(data).subscribe((res) => {
      this.list = res;
      this.data.settimeout = setTimeout(() => {
        this.getList();
      }, this.data.timeout);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  searchAll() {
    this.searchCode = '';
    this.getList();
  }

  sell(a) {
    if (confirm('确认平仓？')) {
      const data = {
        productCode: a.productCode,
        teamCode: this.code,
        accountCode: a.accountCode,
        stockCode: a.stockCode,
        appointPrice: a.appointPrice,
        appointCnt: a.appointCnt
      };
      this.http.appointSELL(data).subscribe((res) => {
        this.getList();
        this.data.ErrorMsg('提交成功');
      }, (err) => {
        this.data.error = err.error;
        this.data.isError();
      });
    }
  }

  cancle(a) {
    if (confirm('确认撤单？')) {
      const data = {
        productCode: a.productCode,
        teamCode: this.code,
        accountCode: a.accountCode,
        stockCode: a.stockCode,
        appointOrderCode: a.appointOrderCode
      };
      this.http.appointCancel(data).subscribe((res) => {
        this.getList();
        this.data.ErrorMsg('提交成功');
      }, (err) => {
        this.data.error = err.error;
        this.data.isError();
      });
    }
  }

}
