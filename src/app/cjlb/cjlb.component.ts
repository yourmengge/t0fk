import { Component } from '@angular/core';
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
    super(data.GET_TODAY_TRADE);
    this.exportName = '成交列表';
    this.exportUrl = this.data.EXPORT_TODAY_TRADE;
    this.initData();
    this.pageNum = this.data.pageNum;
  }

  initData() {
    this.code = '';
    this.userCode = this.data.userCode;
    this.selectType = this.data.selectType;
  }

  afterGetList() {
    if (this.isSort) {
      super.sort(this.sortData, this.sortName);
    }
  }

  onScroll(e) {
    if (Math.round(e.srcElement.scrollTop + e.srcElement.clientHeight) >= e.srcElement.scrollHeight) {
      this.pageNum = this.data.pageNum + this.pageNum;
      this.getList();
    }
  }

  getList() {
    this.data.clearTimeOut();
    super.getListData();
    this.http.getListPage(this.url + '?cnt=' + this.pageNum, this.listData).subscribe((res: Array<any>) => {
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
