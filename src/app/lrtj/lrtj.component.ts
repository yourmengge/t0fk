import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
import { GetList } from '../get-list';

@Component({
  selector: 'app-lrtj',
  templateUrl: './lrtj.component.html',
  styleUrls: ['./lrtj.component.css']
})
export class LrtjComponent extends GetList {

  constructor(public http: HttpService, public data: DataService) {
    super(data.GET_TEAM_PROFIT);
    this.exportName = '利润统计列表';
    this.exportUrl = this.data.EXPORT_TODAY_PROFIT;
    this.initData();
  }

  initData() {
    this.userCode = this.data.userCode;
    this.code = '';
    this.selectType = this.data.selectType;
  }
}
