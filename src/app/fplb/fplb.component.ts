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
  constructor(public data: DataService, public http: HttpService) {
    this.alert = this.data.hide;
    this.checkedAll = false;
    this.listData = {
      ableCnt: '',
      productCode: '',
      productName: '',
      stockCnt: '',
      stockCode: '',
      stockName: '',
      teamCode: '',
      bcfp: '',
      ghcp: ''
    };
  }

  ngDoCheck() {
    if (this.code !== this.data.searchCode && !this.data.isNull(this.data.searchCode)) {
      this.code = this.data.searchCode;
      this.getTeamHold();
    }
  }

  clickAll() {
    this.checkedAll = !this.checkedAll;
    if (this.checkedAll) {
      // tslint:disable-next-line:forin
      for (const i in this.list) {
        this.checkList.push(i);
      }
    } else {
      this.checkList = [];
    }
  }

  getTeamHold() {
    this.data.Loading(this.data.show);
    this.http.getHold(this.code).subscribe((res) => {
      this.list = res;
      // tslint:disable-next-line:forin
      for (const i in this.list) {
        this.list[i].ghcp = this.list[i].ableCnt;
        this.list[i].bcfp = this.list[i].ableCnt;
      }
      this.data.Loading(this.data.hide);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  searchAll() {
    const data = {
      teamCode: this.code,
      accountCode: ''
    };
    this.http.getHold(data).subscribe((res) => {
      this.list = res;
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  history() {
    this.data.goto('main/lswtlb');
  }

  /**
   * 分配给交易员
   */
  fpjyy() {
    let i = 0;
    this.checkList.forEach((element) => {
      if (!this.data.is100Int(this.list[element].bcfp)) {
        this.data.ErrorMsg('分配数量只能为100的整数倍');
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
  pdfpsl() {
    this.checkList.forEach((element) => {
      if (!this.data.is100Int(this.list[element].bcfp)) {
        this.data.ErrorMsg('分配数量只能为100的整数倍');
        return false;
      }
    });
  }

  /**
   * 选中复选框
   */
  checkbox(index) {
    // tslint:disable-next-line:no-unused-expression
    // 判断是否是选中状态的复选框，如果是，从数组中剔除，否，添加到数组中
    this.checkList.indexOf(index) >= 0 ? this.checkList.splice(this.checkList.indexOf(index), 1) : this.checkList.push(index);
  }

  /**
   * 获取交易员列表
   */
  getJyyList() {
    this.data.Loading(this.data.show);
    this.http.getJyyList(this.code).subscribe((res) => {
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

  /**
   * 选择交易员
   */
  selectJYY(a) {
    this.jyyCode = a.accountCode;
    // if (confirm('确定分配至交易员' + a.accountName + '?')) {
    //   const array = [];
    //   this.checkList.forEach((element) => {
    //     const data = {
    //       teamCode: this.code,
    //       productCode: '',
    //       stockCode: '',
    //       stockNum: '',
    //       execType: 4,
    //       accountCode: ''
    //     };
    //     data.accountCode = a.accountCode;
    //     data.productCode = this.list[element].productCode;
    //     data.stockCode = this.list[element].stockCode;
    //     data.stockNum = this.list[element].bcfp;
    //     array.push(data);
    //   });
    //   this.submit(array);
    // }
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
    this.submit(array);
  }

  /**
   * 归还给产品
   */
  ghcp() {
    const array = [];
    if (confirm('确定归还至产品？')) {
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
        data.stockNum = this.list[element].ghcp;
        array.push(data);
      });
    }
  }

  /**
   * 确认归还
   */
  submitBack(data) {
    this.data.Loading(this.data.show);
    this.http.coupon({ list: data }).subscribe((res) => {
      console.log(res);
      this.data.ErrorMsg('提交成功');
      this.getTeamHold();
      this.checkList = [];
      this.data.Loading(this.data.hide);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  /**
   * 确认分配给交易员
   */
  submit(data) {
    this.data.Loading(this.data.show);
    this.http.coupon({ list: data }).subscribe((res) => {
      console.log(res);
      this.data.ErrorMsg('提交成功');
      this.close();
      this.getTeamHold();
      this.checkList = [];
      this.data.Loading(this.data.hide);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

}
