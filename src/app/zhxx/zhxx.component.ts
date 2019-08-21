import { Component, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
import { Md5 } from 'ts-md5';
import { GetList } from '../get-list';

@Component({
  selector: 'app-zhxx',
  templateUrl: './zhxx.component.html',
  styleUrls: ['./zhxx.component.css']
})
export class ZhxxComponent extends GetList {

  constructor(public data: DataService, public http: HttpService) {
    super(data.GET_ACCOUNT_LIST);
    this.exportUrl = 'team/account/export';
    this.exportName = '账户信息';
    this.initData();
  }

  afterGetList() {
    if (this.isSort) {
      super.sort(this.sortData, this.sortName);
    }
  }

  initData() {
    this.accountDetail = {
      accountCode: '',
      accountCommission: '',
      accountName: '',
      accountPwd: '',
      accountStatus: 0,
      bpLine: '',
      closingDownLine: '',
      isAutoShutdown: 1,
      isEveningUp: 1,
      teamCode: this.code
    };
    this.sortType = 0;
    this.confirmText = '确定删除交易员？';
    this.confirm = this.data.hide;
    this.checkId = '';
    this.newPass = '';
    this.resetAlert = this.data.hide;
    this.selectDetail = this.accountDetail;
    this.temp = '';
    this.code = '';
    this.isAutoShutdown = 1;
    this.accountStatus = 0;
    if (this.data.selectType === '1') {
      this.userCode = this.data.userCode;
    } else {
      this.userCode = '';
    }

    this.alert = this.data.hide;
    this.textType = '新增';
    this.isSort = false;
  }



  close() {
    if (this.textType === '新增') {
      this.accountDetail = {
        accountCode: '',
        accountCommission: '',
        accountName: '',
        accountPwd: '',
        accountStatus: 0,
        bpLine: '',
        closingDownLine: '',
        isAutoShutdown: 1,
        teamCode: this.code,
        isEveningUp: 1
      };
    }
    this.resetAlert = this.data.hide;
    this.alert = this.data.hide;
  }

  add() {
    this.accountDetail = {
      accountCode: '',
      accountCommission: '',
      accountName: '',
      accountPwd: '',
      accountStatus: 0,
      bpLine: '',
      closingDownLine: '',
      isAutoShutdown: 1,
      teamCode: this.code,
      isEveningUp: 1
    };
    this.textType = '新增';
    this.alert = this.data.show;
  }

  addSubmit() {
    if (this.textType === '新增') {
      if (this.accountDetail.accountCode === '') {
        this.data.ErrorMsg('交易账号不能为空');
      } else if (this.accountDetail.accountName === '') {
        this.data.ErrorMsg('中文名字不能为空');
      } else if (!this.data.accountValid.test(this.accountDetail.accountCode)) {
        this.data.ErrorMsg('交易员编号不能为中文和特殊字符，只能是数字字母下划线');
      } else if (this.accountDetail.accountPwd === '') {
        this.data.ErrorMsg('交易员密码不能为空');
      } else if (this.accountDetail.bpLine === '') {
        this.data.ErrorMsg('BP值不能为空');
      } else if (this.accountDetail.bpLine === null) {
        this.data.ErrorMsg('BP值只能为数字');
      } else if (this.accountDetail.closingDownLine === '') {
        this.data.ErrorMsg('停机位不能为空');
      } else if (this.accountDetail.closingDownLine === null) {
        this.data.ErrorMsg('停机位只能为数字');
      } else if (this.accountDetail.accountCommission === '') {
        this.data.ErrorMsg('交易佣金不能为空');
      } else if (this.accountDetail.accountCommission === null) {
        this.data.ErrorMsg('交易佣金只能为数字');
      } else {
        this.accountDetail.teamCode = this.code;
        // this.accountDetail.accountPwd = Md5.hashStr(this.accountDetail.accountPwd);
        this.submit(this.accountDetail, 'ADD', '添加');
      }
    } else {
      if (this.accountDetail.accountName === '') {
        this.data.ErrorMsg('中文名字不能为空');
      } else if (this.accountDetail.bpLine === '') {
        this.data.ErrorMsg('BP值不能为空');
      } else if (this.accountDetail.bpLine === null) {
        this.data.ErrorMsg('BP值只能为数字');
      } else if (this.accountDetail.closingDownLine === '') {
        this.data.ErrorMsg('停机位不能为空');
      } else if (this.accountDetail.closingDownLine === null) {
        this.data.ErrorMsg('停机位只能为数字');
      } else if (this.accountDetail.accountCommission === '') {
        this.data.ErrorMsg('交易佣金不能为空');
      } else if (this.accountDetail.accountCommission === null) {
        this.data.ErrorMsg('交易佣金只能为数字');
      } else {
        this.accountDetail.teamCode = this.code;
        this.submit(this.accountDetail, 'UPDATE', '修改');
      }
    }
  }

  submit(data, type, text) {
    this.http.addJyy(data, type).subscribe((res) => {
      this.data.ErrorMsg(text + '成功');
      this.checkId = '';
      this.temp = '';
      this.getList();
      this.close();
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  select(data, index) {
    this.checkId = index;
    this.temp = data.accountCode;
    this.userCode = data.accountCode;
    this.selectDetail = Object.assign(this.selectDetail, data);
    this.selectDetail.teamCode = this.code;
  }

  update() {
    if (this.temp !== '') {
      this.add();
      this.textType = '修改';
      this.accountDetail = Object.assign({}, this.selectDetail);
    }
  }

  del() {
    this.deleteData = {
      accountCode: this.selectDetail.accountCode,
      teamCode: this.code
    };
    this.confirm = this.data.show;

  }

  submitDelete(type) {
    if (type) {
      this.http.delJyy(this.deleteData).subscribe((res) => {
        this.data.ErrorMsg('删除成功');
        this.checkId = '';
        this.getList();
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

  dplb() {
    this.searchCode = this.selectDetail.accountCode;
    this.data.userCode = this.searchCode;
    this.data.goto('main/tdgl/dplb');
  }

  closeConfirm() {
    this.confirm = this.data.hide;
  }

  reset() {
    this.resetAlert = this.data.show;
  }

  resetSubmit() {
    const data = {
      accountCode: this.selectDetail.accountCode,
      newPasswd: Md5.hashStr(this.newPass)
    };
    if (this.newPass !== '') {
      this.http.reset(data).subscribe((res) => {
        this.data.ErrorMsg('重置密码成功');
        this.getList();
        this.close();
      }, (err) => {
        this.data.error = err.error;
        this.data.isError();
      });
    } else {
      this.data.ErrorMsg('请输入新密码');
    }

  }



}
