import { Component, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-cjlb',
  templateUrl: './cjlb.component.html',
  styleUrls: ['./cjlb.component.css']
})
export class CjlbComponent implements DoCheck {
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
    if (this.code !== this.data.teamCode) {
      this.code = this.data.teamCode;
      this.userCode = this.data.userCode;
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
    this.http.getTrade(data).subscribe((res) => {
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

  export() {
    const data = 'teamCode=' + this.code + '&accountCode=' + this.searchCode;
    this.http.exportTradeTeam(data).subscribe((res) => {
      console.log(res);
      this.data.downloadFile(res, '成交列表');
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }
}
