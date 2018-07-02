import { Component, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-ghlb',
  templateUrl: './ghlb.component.html',
  styleUrls: ['./ghlb.component.css']
})
export class GhlbComponent implements DoCheck {
  checkList = [];
  code: string;
  checkedAll: boolean;
  list: any;
  userCode: any;
  autofocusId: any;
  searchCode: any;
  constructor(public data: DataService, public http: HttpService) {
    this.checkedAll = false;
    this.autofocusId = '';
    this.userCode = this.data.userCode;
  }

  ngDoCheck() {
    if (this.code !== this.data.searchCode && !this.data.isNull(this.data.searchCode)) {
      this.code = this.data.searchCode;
      this.list = [];
      this.search();
    }
  }

  search() {
    this.searchCode = this.userCode;
    this.data.userCode = this.searchCode;
    this.getList();
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
    this.data.Loading(this.data.show);
    const data = {
      teamCode: this.code,
      accountCode: this.searchCode
    };
    this.http.getPrivateHold(data).subscribe((res) => {
      // tslint:disable-next-line:forin
      for (const i in res) {
        if (this.data.isNullArray(this.list)) { // 判断是否为第一次获取到数据
          res[i].bcgh = res[i].ableCnt;
        } else if (this.list[i].bcgh !== res[i].ableCnt) {
          res[i].bcgh = this.list[i].bcgh;
        } else {
          res[i].bcgh = res[i].ableCnt;
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
      this.data.Loading(this.data.hide);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

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

  fpjyy() {
    let temp = 0;
    const array = [];
    this.checkList.forEach((element) => {
      const data = {
        teamCode: this.code,
        productCode: '',
        stockCode: '',
        stockNum: '',
        execType: 3,
        accountCode: ''
      };
      data.accountCode = this.list[element].accountCode;
      data.productCode = this.list[element].productCode;
      data.stockCode = this.list[element].stockCode;
      if (this.list[element].bcgh > this.list[element].ableCnt) {
        this.data.ErrorMsg('归还股票数量不能大于股票数量！');
        return temp = 1;
      } else {
        data.stockNum = this.list[element].bcgh;
        array.push(data);
      }
    });
    if (temp === 0) {
      if (confirm('确认归还至团队？')) {
        this.http.coupon({ list: array }).subscribe((res) => {
          console.log(res);
          this.data.ErrorMsg('提交成功');
          this.checkList = [];
          this.list = [];
          this.getList();
          this.data.Loading(this.data.hide);
        }, (err) => {
          this.data.error = err.error;
          this.data.isError();
        });
      }
    }
  }
  searchAll() {
    this.searchCode = '';
    this.getList();
  }

  trackBy(a) {
    return a.bcgh;
  }
}
