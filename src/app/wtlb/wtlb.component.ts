import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
import { GetList } from '../get-list';


@Component({
  selector: 'app-wtlb',
  templateUrl: './wtlb.component.html',
  styleUrls: ['./wtlb.component.css']
})
export class WtlbComponent extends GetList {
  pageNum: number;
  constructor(public http: HttpService, public data: DataService) {
    super();
    this.url = this.data.GET_TODAY_APPOINT;
    this.exportUrl = this.data.EXPORT_TODAY_APPOINT;
    this.exportName = '委托列表';
    this.initData();
    this.initDetail();
    this.pageNum = this.data.pageNum;
  }

  onScroll(e) {
    if (e.srcElement.scrollTop + e.srcElement.clientHeight === e.srcElement.scrollHeight) {
      console.log('bottom');
      this.data.pageNum = this.data.pageNum + this.pageNum;
      this.getList();
    }
  }

  initData() {
    this.userCode = this.data.userCode;
    this.code = '';
    this.roleCode = this.data.roleCode;
    this.alert = this.data.hide;
  }

  initDetail() {
    this.accountDetail = {
      pkOrder: '',
      appointOrderCode: '',
      dealAvrPrice: '',
      dealCnt: '',
      appointStatus: 8,
      memo: ''
    };
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

  close() {
    this.initDetail();
    this.alert = this.data.hide;
  }



  update(data) {
    this.accountDetail = data;
    this.accountDetail.appointStatus = 8;
    this.alert = this.data.show;
  }

  addSubmit() {
    if (this.accountDetail.dealCnt < 0) {
      this.data.ErrorMsg('成交数量必须大于等于0');
    } else if (this.accountDetail.dealAvrPrice < 0) {
      this.data.ErrorMsg('成交均价必须大于等于0');
    } else {
      const reqData = {
        pkOrder: this.accountDetail.pkOrder,
        appointOrderCode: this.accountDetail.appointOrderCode,
        dealAvrPrice: this.accountDetail.dealAvrPrice,
        dealCnt: this.accountDetail.dealCnt,
        appointStatus: this.accountDetail.appointStatus,
      };
      this.http.updateAppoint(reqData).subscribe((res) => {
        this.data.ErrorMsg('修改已提交');
        this.getList();
        this.close();
      }, (err) => {
        this.data.error = err.error;
        this.data.isError();
      });
    }

  }
}
