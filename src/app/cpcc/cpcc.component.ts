import { Component, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-cpcc',
  templateUrl: './cpcc.component.html',
  styleUrls: ['./cpcc.component.css']
})
export class CpccComponent implements DoCheck {
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

  }

  ngDoCheck() {
    if (this.code !== this.data.searchCode && !this.data.isNull(this.data.searchCode)) {
      this.code = this.data.searchCode;
      this.getHold();
    }
  }

  getHold() {
    this.data.Loading(this.data.show);
    this.http.productHold(this.code).subscribe((res) => {
      this.list = res;
      // tslint:disable-next-line:forin
      for (const i in this.list) {
        this.list[i].ghcp = this.list[i].ableCnt;
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

  fptd() {
    let i = 0;
    this.checkList.forEach((element) => {
      if (!this.data.is100Int(this.list[element].ableCnt)) {
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
 * 获取团队列表
 */
  getJyyList() {
    this.data.Loading(this.data.show);
    this.http.getTeamList().subscribe((res) => {
      this.jyyList = res;
      this.data.Loading(this.data.hide);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  /**
 * 选择交易员
 */
  selectJYY(a) {
    this.jyyCode = a.teamCode;
  }

  /**
 * 确认选择
 */
  submitJYY() {
    const array = [];
    this.checkList.forEach((element) => {
      const data = {
        teamCode: this.jyyCode,
        productCode: '',
        stockCode: '',
        stockNum: '',
        execType: 1
      };
      data.productCode = this.list[element].productCode;
      data.stockCode = this.list[element].stockNo;
      data.stockNum = this.list[element].ableCnt;
      array.push(data);
    });
    this.submit(array);
  }

  close() {
    this.alert = this.data.hide;
    this.jyyCode = '';
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
      this.getHold();
      this.checkList = [];
      this.data.Loading(this.data.hide);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

}
