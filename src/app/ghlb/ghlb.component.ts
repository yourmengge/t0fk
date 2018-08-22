import { Component, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
import { GetList } from '../get-list';
@Component({
  selector: 'app-ghlb',
  templateUrl: './ghlb.component.html',
  styleUrls: ['./ghlb.component.css']
})
export class GhlbComponent extends GetList {
  constructor(public data: DataService, public http: HttpService) {
    super();
    this.url = 'private/hold';
    this.initData();
  }

  initData() {
    this.checkedAll = false;
    this.autofocusId = '';
    this.confirm = this.data.hide;
    this.confirmText = '确认归还数量给团队？';
    this.userCode = this.data.userCode;
  }


  searchAll() {
    this.checkList = [];
    this.checkId = '';
    this.checkedAll = false;
    this.searchCode = '';
    this.data.selectType = this.selectType;
    this.getList();
  }

  getList() {
    this.data.clearTimeOut();
    this.getListData();
    this.http.getList(this.url, this.listData).subscribe((res) => {
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
        // console.log(element);
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

  trackBy(a) {
    return a.bcgh;
  }
}
