import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
import { Websocket } from '../websocket';

@Component({
  selector: 'app-teamdplb',
  templateUrl: './teamdplb.component.html',
  styleUrls: ['./teamdplb.component.css']
})
export class TeamdplbComponent extends Websocket implements OnDestroy {

  sellData: any;
  type = 'BUY';
  constructor(public data: DataService, public http: HttpService) {
    super(data, http);
    this.initData();
    this.getList();
  }

  close() {
    this.resetAlert = this.data.hide;
    this.cancelSubscribe();
  }

  ngOnDestroy() {
    this.disconnect();
  }

  getList() {
    this.data.clearTimeOut();
    this.getListData();
    this.listData['teamCode'] = '';
    this.http.getList(this.url, this.listData).subscribe((res: Array<any>) => {
      this.list = res;
      this.afterGetList();
      this.data.settimeout = setTimeout(() => {
        this.getList();
      }, 10000);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
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
      teamCode: a.teamCode,
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

  sell2(a) {
    this.appointCnt = '';
    this.sellData = {
      stockCode: a.stockCode,
      accountCode: a.accountCode,
      uncloseCnt: a.uncloseCnt,
      productCode: a.productCode,
      teamCode: a.teamCode
    };
    this.type = a.appointType === 1 ? 'SELL' : 'BUY';
    this.accountCode = a.accountCode;
    this.stockHQ.stockCode = a.stockCode;
    this.stockName = a.stockName;
    this.resetAlert = this.data.show;
    this.getHanQing(this.sellData);
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
  /**
       * 返回行情加个颜色
       */
  HQColor(price) {
    if (price !== '--') {
      if (price > this.stockHQ.preClosePrice) {
        return 'red';
      } else if (price < this.stockHQ.preClosePrice) {
        return 'green';
      } else {
        return '';
      }
    }

  }

  submintBuy() {
    const content = {
      'stockCode': this.stockHQ.stockCode,
      'appointCnt': this.appointCnt,
      'appointPrice': this.appointPrice,
      'accountCode': this.accountCode,
      productCode: this.sellData.productCode,
      teamCode: this.sellData.teamCode
    };
    this.http.order(this.type, content).subscribe((res: Response) => {
      if (res['success']) {
        this.data.ErrorMsg('委托已提交');
        this.getList();
        this.close();
      }
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }



}
