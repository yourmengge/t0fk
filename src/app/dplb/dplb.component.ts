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
  confirm: boolean;
  confirmText: string;
  searchCode: any;
  actionType: string;
  sellType: string;
  resData: any;
  roleCode: any;
  pkOrder: any;
  constructor(public data: DataService, public http: HttpService) {
    this.code = '';
    this.confirmText = '';
    this.confirm = this.data.hide;
    this.userCode = this.data.userCode;
    this.roleCode = this.data.roleCode;
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
    this.confirmText = '确认平仓？';
    this.sellType = 'SELL';
    this.resData = {
      productCode: a.productCode,
      teamCode: this.code,
      accountCode: a.accountCode,
      stockCode: a.stockCode,
      appointPrice: a.appointPrice,
      appointCnt: a.uncloseCnt
    };
    if (a.appointType === 2) {
      this.sellType = 'BUY';
    }
    this.actionType = 'sell';
    this.confirm = this.data.show;
  }

  cancle(a) {
    this.confirmText = '确认撤单？';
    this.resData = {
      productCode: a.productCode,
      teamCode: this.code,
      accountCode: a.accountCode,
      stockCode: a.stockCode,
      appointOrderCode: a.appointOrderCode
    };
    this.pkOrder = a.pkOrder;
    this.confirm = this.data.show;
    this.actionType = 'cancle';

  }

  clear(a) {
    this.confirmText = '确认删除该委托？';
    this.pkOrder = a.pkOrder;
    this.confirm = this.data.show;
    this.actionType = 'clear';

  }

  submit(type) {
    if (type) { // confirm返回true表示点击确认
      if (this.actionType === 'sell') {
        this.http.appointSELL(this.resData, this.sellType).subscribe((res) => {
          this.getList();
          this.data.ErrorMsg('平仓已提交');
          this.closeConfirm();
        }, (err) => {
          this.data.error = err.error;
          this.data.isError();
          this.closeConfirm();
        });
      } else if (this.actionType === 'cancle') {
        this.http.appointCancel(this.resData, this.pkOrder).subscribe((res) => {
          this.getList();
          this.data.ErrorMsg('撤单已提交');
          this.closeConfirm();
        }, (err) => {
          this.data.error = err.error;
          this.data.isError();
          this.closeConfirm();
        });
      } else {
        this.http.appointClear(this.pkOrder).subscribe((res) => {
          this.getList();
          this.data.ErrorMsg('删除已提交');
          this.closeConfirm();
        }, (err) => {
          this.data.error = err.error;
          this.data.isError();
          this.closeConfirm();
        });
      }
    } else {
      this.closeConfirm();
    }
  }

  closeConfirm() {
    this.confirm = this.data.hide;
  }

}
