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
  confirm: boolean;
  array = [];
  confirmText: string;
  constructor(public data: DataService, public http: HttpService) {
    this.checkedAll = false;
    this.autofocusId = '';
    this.confirm = this.data.hide;
    this.confirmText = '确认归还数量给团队？';
    this.userCode = this.data.userCode;
  }

  ngDoCheck() {
    if (this.code !== this.data.searchCode && !this.data.isNull(this.data.searchCode)) {
      this.code = this.data.searchCode;
      this.list = [];
      this.checkList = [];
      this.search();
    }
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
        } else if (this.checkList.includes(i)) {
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
    console.log(this.checkList);
  }

  fpjyy() {
    this.array = [];
    let temp = 0;
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
      if (this.list[element].bcgh <= 0) {
        this.data.ErrorMsg('归还股票数量必须大于0！');
        return temp = 1;
      } else if (this.list[element].bcgh > this.list[element].ableCnt) {
        this.data.ErrorMsg('归还股票数量不能大于可归还数量！');
        return temp = 1;
      } else {
        data.stockNum = this.list[element].bcgh;
        this.array.push(data);
      }
    });
    if (temp === 0) {
      this.confirm = this.data.show;
    }
  }

  submit(type) {
    if (type) {
      this.http.coupon({ list: this.array }).subscribe((res) => {
        this.data.ErrorMsg('提交成功');
        this.checkList = [];
        this.list = [];
        this.getList();
        this.data.Loading(this.data.hide);
        this.closeConfirm();
      }, (err) => {
        this.data.error = err.error;
        this.data.isError();
        this.closeConfirm();
      });
    } else {
      this.closeConfirm();
    }
  }

  closeConfirm() {
    this.confirm = this.data.hide;
  }

  searchAll() {
    this.searchCode = '';
    this.getList();
  }

  trackBy(a) {
    return a.bcgh;
  }
}
