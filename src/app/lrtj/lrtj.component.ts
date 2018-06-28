import { Component, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-lrtj',
  templateUrl: './lrtj.component.html',
  styleUrls: ['./lrtj.component.css']
})
export class LrtjComponent implements DoCheck {

  code: string;
  list: any;
  proName: any;
  userCode: any;
  constructor(public http: HttpService, public data: DataService) {
    this.userCode = this.data.userCode;
    this.code = '';
  }

  ngDoCheck() {
    if (this.code !== this.data.searchCode) {
      this.code = this.data.searchCode;
      this.getList();
    }
  }

  /**
   * 获取委托列表
   */
  getList() {
    this.data.userCode = this.userCode;
    this.data.Loading(this.data.show);
    const data = {
      teamCode: this.code,
      accountCode: this.userCode
    };
    this.http.teamProfit(data).subscribe((res) => {
      this.list = res;
      this.data.Loading(this.data.hide);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  searchAll() {
    const data = {
      teamCode: this.code,
      accountCode: ''
    };
    this.data.Loading(this.data.show);
    this.http.teamProfit(data).subscribe((res) => {
      this.list = res;
      this.data.Loading(this.data.hide);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

}
