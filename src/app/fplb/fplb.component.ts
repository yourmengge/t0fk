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
      ghcp: '',
      isChecked: false
    };
  }

  ngDoCheck() {
    if (this.code !== this.data.searchCode && !this.data.isNull(this.data.searchCode)) {
      this.code = this.data.searchCode;
      this.list = [];
      this.getList();
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

  getList() {
    this.data.clearTimeOut();
    this.http.getHold(this.code).subscribe((res) => {
      // this.list = res;
      // // tslint:disable-next-line:forin
      // for (const i in this.list) {
      //   this.list[i].ghcp = this.list[i].ableCnt;
      //   this.list[i].bcfp = this.list[i].ableCnt;
      // }
      for (const i in res) {
        if (this.data.isNullArray(this.list)) { // 判断是否为第一次获取到数据
          res[i].ghcp = res[i].ableCnt;
          res[i].bcfp = res[i].ableCnt;
        } else if (this.list[i].ghcp !== res[i].ableCnt || this.list[i].bcfp !== res[i].ableCnt) {
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
      if (this.list[element].bcfp % 100 !== this.list[element].ableCnt % 100) {
        if (!this.data.is100Int(this.list[element].bcfp)) {
          this.data.ErrorMsg('分配数量只能为100的整数倍');
          return i = 1;
        }
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
    // tslint:disable-next-line:no-unused-expression
    // 判断是否是选中状态的复选框，如果是，从数组中剔除，否，添加到数组中
    if (this.checkList.indexOf(index) >= 0) {
      this.checkList.splice(this.checkList.indexOf(index), 1);
      this.list[index].isChecked = false;
    } else {
      this.checkList.push(index);
      this.list[index].isChecked = true;
    }
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
    let temp = 0;
    const array = [];
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
      if (this.list[element].ghcp > this.list[element].ableCnt) {
        this.data.ErrorMsg('归还股票数量不能大于股票数量！');
        return temp = 1;
      } else {
        data.stockNum = this.list[element].ghcp;
        array.push(data);
      }
    });
    if (temp === 0) {
      if (confirm('确定归还至产品？')) {
        this.submitBack(array);
      }
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
      this.list = [];
      this.getList();
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
    this.http.exportHoldTeam(this.code).subscribe((res) => {
      console.log(res);
      this.data.downloadFile(res, '分配列表');
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }
}
