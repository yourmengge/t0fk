import { Component, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-wtlb',
  templateUrl: './wtlb.component.html',
  styleUrls: ['./wtlb.component.css']
})
export class WtlbComponent implements DoCheck {
  code: string;
  list: any;
  proName: any;
  userCode: any;
  searchCode: any;
  roleCode: any;
  alert: any;
  accountDetail: any;
  statusType = [{
    id: 8,
    name: '已成'
  }, {
    id: 5,
    name: '部成已撤'
  }, {
    id: 6,
    name: '已撤'
  }, {
    id: 9,
    name: '废单'
  }];
  constructor(public http: HttpService, public data: DataService) {
    this.userCode = this.data.userCode;
    this.code = '';
    this.roleCode = this.data.roleCode;
    this.alert = this.data.hide;
    this.initDetail();
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

  export() {
    const data = 'teamCode=' + this.code + '&accountCode=' + this.searchCode;
    this.http.exportAppointTeam(data).subscribe((res) => {
      console.log(res);
      this.data.downloadFile(res, '委托列表');
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }


  /**
   * 获取委托列表
   */
  getList() {
    this.data.clearTimeOut();
    const data = {
      teamCode: this.code,
      accountCode: this.searchCode
    };
    this.http.getWtList(data).subscribe((res) => {
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

}
