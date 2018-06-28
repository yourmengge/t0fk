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
  constructor(public data: DataService, public http: HttpService) {
    this.checkedAll = false;
    this.userCode = this.data.userCode;
  }

  ngDoCheck() {
    if (this.code !== this.data.searchCode && !this.data.isNull(this.data.searchCode)) {
      this.code = this.data.searchCode;
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
    this.data.Loading(this.data.show);
    const data = {
      teamCode: this.code,
      accountCode: this.userCode
    };
    this.http.getPrivateHold(data).subscribe((res) => {
      this.list = res;
      // tslint:disable-next-line:forin
      for (const i in this.list) {
        this.list[i].bcgh = this.list[i].ableCnt;
      }
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
    this.checkList.indexOf(index) >= 0 ? this.checkList.splice(this.checkList.indexOf(index), 1) : this.checkList.push(index);
  }

  fpjyy() {
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
      data.stockNum = this.list[element].bcgh;
      array.push(data);
    });
    if (confirm('确认归还至团队？')) {
      this.http.coupon({ list: array }).subscribe((res) => {
        console.log(res);
        this.data.ErrorMsg('提交成功');
        this.getList();
        this.data.Loading(this.data.hide);
      }, (err) => {
        this.data.error = err.error;
        this.data.isError();
      });
    }
  }
  searchAll() {
    const data = {
      teamCode: this.code,
      accountCode: ''
    };
    this.data.Loading(this.data.show);
    this.http.getPrivateHold(data).subscribe((res) => {
      this.list = res;
      // tslint:disable-next-line:forin
      for (const i in this.list) {
        this.list[i].bcgh = this.list[i].ableCnt;
      }
      this.data.Loading(this.data.hide);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }
}
