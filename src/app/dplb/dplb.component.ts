import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
import { Websocket } from '../websocket';


@Component({
  selector: 'app-dplb',
  templateUrl: './dplb.component.html',
  styleUrls: ['./dplb.component.css']
})
export class DplbComponent extends Websocket {
  constructor(public data: DataService, public http: HttpService) {
    super(data, http);
    this.initData();
  }

  close() {
    this.resetAlert = this.data.hide;
    this.cancelSubscribe();
    this.disconnect();
  }

  initData() {
    this.code = '';
    this.confirmText = '';
    this.confirm = this.data.hide;
    this.userCode = this.data.userCode;
    this.roleCode = this.data.roleCode;
    this.selectType = this.data.selectType;
  }

  sell(a) {
    this.confirmText = '确认平仓？';
    this.sellType = 'SELL';
    if (a.uncloseCnt % 100 !== 0) { // 不是整百的
      if (a.uncloseCnt > 100) {
        a.uncloseCnt = this.data.roundDown(a.uncloseCnt);
      }
    }
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

  // sell2(a) {
  //   this.appointCnt = '';
  //   const data = {
  //     stockCode: a.stockCode,
  //     accountCode: a.accountCode
  //   };
  //   this.stockName = a.stockName;
  //   this.resetAlert = this.data.show;
  //   this.getHanQing(data);
  // }


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
