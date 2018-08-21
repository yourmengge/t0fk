import { Component, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-fplb',
  templateUrl: './fplb.component.html',
  styleUrls: ['./fplb.component.css']
})
export class FplbComponent implements DoCheck {
  userCode: any;
  code: string;
  list: any;
  jyyList: any;
  listData: any;
  jyyCode: string;
  alert: any;
  checkedAll: boolean;
  checkList = [];
  ghArray: any;
  confirm: boolean;
  confirmText: string;

  productCode: string; // 产品编号
  stockCode: string; // 股票代码

  productCode1: string; // 产品编号
  stockCode1: string; // 股票代码

  constructor(public data: DataService, public http: HttpService) {
    this.alert = this.data.hide;
    this.checkedAll = false;
    this.confirmText = '确定归还至产品？';
    this.confirm = this.data.hide;
    this.ghArray = [];
    this.listData = {
      ableCnt: '',
      productCode: '',
      productName: '',
      stockCnt: '',
      stockCode: '',
      stockName: '',
      teamCode: '',
      bcfp: '',
      ghcp: '',
      isChecked: false
    };
    this.productCode1 = this.data.searchProCode;
    this.stockCode1 = this.data.searchStockCode;
    this.productCode = this.data.searchProCode;
    this.stockCode = this.data.searchStockCode;
  }

  ngDoCheck() {
    if (this.code !== this.data.teamCode && !this.data.isNull(this.data.teamCode)) {
      this.code = this.data.teamCode;
      this.list = [];
      this.checkList = [];
      this.getList();
    }
  }

  search() {
    this.productCode = this.productCode1;
    this.stockCode = this.stockCode1;
    this.data.searchProCode = this.productCode1;
    this.data.searchStockCode = this.stockCode1;
    this.checkList = [];
    this.checkedAll = false;
    this.getList();
  }

  searchAll() {
    this.checkList = [];
    this.checkedAll = false;
    this.productCode = '';
    this.stockCode = '';
    this.getList();
  }


  clickAll() {
    this.checkedAll = !this.checkedAll;
    if (this.checkedAll) {
      // tslint:disable-next-line:forin
      for (const i in this.list) {
        this.checkList.push(i);
        this.list[i].isChecked = true;
      }
    } else {
      this.checkList = [];
      // tslint:disable-next-line:forin
      for (const i in this.list) {
        this.list[i].isChecked = false;
      }
    }
  }

  getList() {
    this.data.clearTimeOut();
    this.http.getHold(this.code, this.productCode, this.stockCode).subscribe((res) => {
      for (const i in res) {
        if (this.data.isNullArray(this.list)) { // 判断是否为第一次获取到数据
          res[i].ghcp = res[i].ableCnt;
          res[i].bcfp = res[i].ableCnt;
        } else if (this.checkList.includes(i)) {
          res[i].bcfp = this.list[i].bcfp;
          res[i].ghcp = this.list[i].ghcp;
        } else {
          res[i].ghcp = res[i].ableCnt;
          res[i].bcfp = res[i].ableCnt;
        }
      }
      this.list = res;
      if (this.checkList.length === 0) {
        // tslint:disable-next-line:forin
        for (const i in this.list) {
          this.list[i].isChecked = false;
        }
      } else {
        this.checkList.forEach((element) => {
          this.list[element].isChecked = true;
        });
      }
      this.data.settimeout = setTimeout(() => {
        this.getList();
      }, this.data.timeout);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  /**
   * 分配给交易员
   */
  fpjyy() {
    let i = 0;
    this.checkList.forEach((element) => {
      // if (this.list[element].bcfp % 100 !== this.list[element].ableCnt % 100) {
      //   if (!this.data.is100Int(this.list[element].bcfp)) {
      //     this.data.ErrorMsg('分配数量只能为100的整数倍');
      //     return i = 1;
      //   }
      // }

      if (this.list[element].bcfp <= 0) {
        this.data.ErrorMsg('分配数量必须大于0');
        return i = 1;
      } else if (this.list[element].bcfp > this.list[element].ableCnt) {
        this.data.ErrorMsg('分配数量不能大于可分配数量');
        return i = 1;
      }

    });
    if (i === 0) {
      this.alert = this.data.show;
      this.getJyyList();
    }

  }

  /**
   * 判断所分配的数量是否是100的整数倍
   */
  // pdfpsl() {
  //   this.checkList.forEach((element) => {
  //     if (!this.data.is100Int(this.list[element].bcfp)) {
  //       this.data.ErrorMsg('分配数量只能为100的整数倍');
  //       return false;
  //     }
  //   });
  // }

  /**
   * 选中复选框
   */
  checkbox(index) {
    index = index + '';
    // tslint:disable-next-line:no-unused-expression
    // 判断是否是选中状态的复选框，如果是，从数组中剔除，否，添加到数组中
    if (this.checkList.indexOf(index) >= 0) {
      this.checkList.splice(this.checkList.indexOf(index), 1);
      this.list[index].isChecked = false;
    } else {
      this.checkList.push(index);
      this.list[index].isChecked = true;
    }

    if (this.checkList.length === this.list.length) {
      this.checkedAll = true;
    } else {
      this.checkedAll = false;
    }
  }

  /**
   * 获取交易员列表
   */
  getJyyList() {
    this.data.Loading(this.data.show);
    this.http.getJyyList2(this.code).subscribe((res) => {
      this.jyyList = res;
      this.data.Loading(this.data.hide);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  close() {
    this.alert = this.data.hide;
    this.jyyCode = '';
  }

  disabled(length) {
    if (this.data.roleCode === '0') {
      return true;
    } else if (this.data.roleCode === '1' && length === 0) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * 选择交易员
   */
  selectJYY(code) {
    this.jyyCode = code;
  }

  /**
   * 确认选择
   */
  submitJYY() {
    const array = [];
    this.checkList.forEach((element) => {
      const data = {
        teamCode: this.code,
        productCode: '',
        stockCode: '',
        stockNum: '',
        execType: 2,
        accountCode: ''
      };
      data.accountCode = this.jyyCode;
      data.productCode = this.list[element].productCode;
      data.stockCode = this.list[element].stockCode;
      data.stockNum = this.list[element].bcfp;
      array.push(data);
    });
    if (!this.data.isNull(this.jyyCode)) {
      this.submit(array);
    }

  }

  /**
   * 归还给产品
   */
  ghcp() {
    this.ghArray = [];
    let temp = 0;

    this.checkList.forEach((element) => {
      const data = {
        teamCode: this.code,
        productCode: '',
        stockCode: '',
        stockNum: '',
        execType: 4,
        accountCode: ''
      };
      data.accountCode = this.jyyCode;
      data.productCode = this.list[element].productCode;
      data.stockCode = this.list[element].stockCode;
      if (this.list[element].ghcp <= 0) {
        this.data.ErrorMsg('归还股票数量必须大于0！');
        return temp = 1;
      } else if (this.list[element].ghcp > this.list[element].ableCnt) {
        this.data.ErrorMsg('归还股票数量不能大于可分配数量！');
        return temp = 1;
      } else {
        data.stockNum = this.list[element].ghcp;
        this.ghArray.push(data);
      }
    });

    if (temp === 0) {
      this.confirm = this.data.show;
    }

  }

  submitDelete(type) {
    if (type) {
      this.submitBack(this.ghArray);
    } else {
      this.closeConfirm();
    }

  }

  closeConfirm() {
    this.confirm = this.data.hide;
  }

  /**
   * 确认归还
   */
  submitBack(data) {
    this.data.Loading(this.data.show);
    this.http.coupon({ list: data }).subscribe((res) => {

      this.data.ErrorMsg('提交成功');
      this.list = [];
      this.getList();
      this.checkList = [];
      this.data.Loading(this.data.hide);
      this.closeConfirm();
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
      this.closeConfirm();
    });
  }

  /**
   * 确认分配给交易员
   */
  submit(data) {
    this.data.Loading(this.data.show);
    this.http.coupon({ list: data }).subscribe((res) => {

      this.data.ErrorMsg('提交成功');
      this.close();
      this.list = [];
      this.getList();
      this.checkList = [];
      this.data.Loading(this.data.hide);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  export() {
    const data = 'productCode=' + this.productCode + '&stockCode=' + this.stockCode + '&teamCode=' + this.code;
    this.http.exportHoldTeam(this.code, data).subscribe((res) => {

      this.data.downloadFile(res, '分配列表');
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  trackBy(a) {
    return a.bcfp;
  }
}
