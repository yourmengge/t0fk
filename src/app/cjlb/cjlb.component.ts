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
  constructor(public data: DataService, public http: HttpService) {
    super();
    this.url = this.data.GET_TODAY_TRADE;
    this.exportName = '成交列表';
    this.exportUrl = this.data.EXPORT_TODAY_TRADE;
    this.initData();
  }

  initData() {
    this.code = '';
    this.userCode = this.data.userCode;
  }
}
