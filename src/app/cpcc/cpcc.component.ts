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
  confirm: boolean;
  checkList = [];
  confirmText: string;
  confirm2 = false;
  lockData: any;
  confirmText2 = '确定一键归还产品持仓？';
  constructor(public data: DataService, public http: HttpService) {
    this.confirm = this.data.hide;
  }

  submitGoback(type) {
    if (type) {
      this.http.goback(this.code).subscribe((res) => {
        this.getList();
        this.closeConfirm();
        this.data.ErrorMsg('归还成功');
      }, (err) => {
        this.data.error = err.error;
        this.closeConfirm();
        this.data.isError();
      });
    } else {
      this.closeConfirm();
    }

  }

  goback() {
    this.confirm2 = true;
    // this.http.goback(this.code).subscribe((res) => {
    //   this.getList();
    //   this.data.ErrorMsg('归还成功');
    // }, (err) => {
    //   this.data.error = err.error;
    //   this.data.isError();
    // });
  }

  disabled(temp) {
    if (this.data.roleCode === '0') {
      return true;
    } else if (this.data.roleCode === '1' && (temp === '' || temp === 0)) {
      return true;
    } else {
      return false;
    }
  }

  submitDelete(type) {
    if (this.lockData.lockFlag === 1 && this.lockData.lockCnt <= 0) {
      this.data.ErrorMsg('冻结数量必须大于0');
    } else {
      this.lockData.lockFlag = this.lockData.lockFlag === 0 ? 1 : 0;
      if (this.lockData.lockFlag === 0) {
        this.lockData.lockCnt = 0;
      }
      this.http.lock(this.lockData).subscribe((res) => {
        this.getList();
        this.data.ErrorMsg((this.lockData.lockFlag ? '冻结' : '解锁') + '成功！');
        this.closeConfirm();
      }, (err) => {
        this.data.error = err.error;
        this.data.isError();
        this.closeConfirm();
      });
    }
  }

  closeConfirm() {
    this.confirm = this.data.hide;
    this.confirm2 = this.data.hide;
  }

  lock(data) {
    if (this.data.roleCode !== '0') {
      this.lockData = data;
      this.lockData.stockCode = data.stockNo;
      const type = data.lockFlag;
      this.confirmText = '确定' + (!type ? '冻结' : '解锁') + '该产品';
      this.confirm = this.data.show;
    }
  }

  ngDoCheck() {
    if (this.code !== this.data.productCode) {
      this.code = this.data.productCode;
      this.list = [];
      this.checkList = [];
      if (!this.data.isNull(this.code)) {
        this.getList();
      }

    }
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

  refresh() {
    this.http.refresh(this.code).subscribe((res) => {
      this.getList();
      this.data.ErrorMsg('列表刷新成功');
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  getList() {
    this.data.clearTimeOut();
    this.http.productHold(this.code).subscribe((res) => {
      for (const i in res) {
        if (!this.data.isNullArray(this.list)) {
          res[i].kfp = res[i].ableCnt;
          if (this.checkList.includes(i)) {
            res[i].ableCnt = this.list[i].ableCnt;
          }
        } else {
          res[i].kfp = res[i].ableCnt;
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

  fptd() {
    let i = 0;
    this.checkList.forEach((element) => {
      if (this.list[element].ableCnt <= 0) {
        this.data.ErrorMsg('分配数量必须大于0');
        return i = 1;
      } else if (this.list[element].ableCnt > this.list[element].kfp) {
        this.data.ErrorMsg('分配数量不能大于可分配数量');
        return i = 1;
      }
      // if (this.list[element].ableCnt % 100 !== this.list[element].ghcp % 100) {
      //   // if (!this.data.is100Int(this.list[element].ableCnt)) {
      //   //   this.data.ErrorMsg('分配数量只能为100的整数倍');
      //   //   return i = 1;
      //   // }
      // }

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

  history() {
    this.data.goto('main/cpgl/history');
  }

  trackBy(a) {
    return a.ableCnt;
  }

}
