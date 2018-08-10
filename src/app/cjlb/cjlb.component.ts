import { Component, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
import { GetList } from '../get-list';

@Component({
  selector: 'app-cjlb',
  templateUrl: './cjlb.component.html',
  styleUrls: ['./cjlb.component.css']
})
export class CjlbComponent extends GetList {
  pageNum: number;
  constructor(public data: DataService, public http: HttpService) {
    super();
    this.url = this.data.GET_TODAY_TRADE;
    this.exportName = '成交列表';
    this.exportUrl = this.data.EXPORT_TODAY_TRADE;
    this.initData();
    this.pageNum = this.data.pageNum;
  }

  initData() {
    this.code = '';
    this.userCode = this.data.userCode;
  }

  onScroll(e) {
    if (e.srcElement.scrollTop + e.srcElement.clientHeight === e.srcElement.scrollHeight) {
      console.log('bottom');
      this.data.pageNum = this.data.pageNum + this.pageNum;
      this.getList();
    }
  }

  getList() {
    this.data.clearTimeOut();
    const data = {
      teamCode: this.code,
      accountCode: this.searchCode
    };
    this.http.getListPage(this.url + '?cnt=' + this.data.pageNum, data).subscribe((res) => {
      this.list = res;
      this.afterGetList();
      this.data.settimeout = setTimeout(() => {
        this.getList();
      }, this.data.timeout);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }
}
