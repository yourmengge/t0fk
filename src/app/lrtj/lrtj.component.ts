import { Component, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-lrtj',
  templateUrl: './lrtj.component.html',
  styleUrls: ['./lrtj.component.css']
})
export class LrtjComponent implements DoCheck {
  searchCode: any;
  code: string;
  list: any;
  proName: any;
  userCode: any;
  constructor(public http: HttpService, public data: DataService) {
    this.userCode = this.data.userCode;
    this.code = '';
  }

  ngDoCheck() {
    if (this.code !== this.data.teamCode) {
      this.code = this.data.teamCode;
      this.userCode = this.data.userCode;
      this.search();
    }
  }

  fontColor(text) {
    return text === '买入' ? 'red' : text === '卖出' ? 'green' : '';
  }

  search() {
    this.searchCode = this.userCode;
    this.data.userCode = this.searchCode;
    this.getList();
  }

  /**
   * 获取委托列表
   */
  getList() {
    this.data.clearTimeOut();
    this.data.Loading(this.data.show);
    const data = {
      teamCode: this.code,
      accountCode: this.searchCode
    };
    this.http.teamProfit(data).subscribe((res) => {
      this.list = res;
      this.data.Loading(this.data.hide);
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
    this.http.exportProfitTeam(data).subscribe((res) => {
      console.log(res);
      this.data.downloadFile(res, '利润统计列表');
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

}
