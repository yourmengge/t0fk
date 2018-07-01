import { Component, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-zhxx',
  templateUrl: './zhxx.component.html',
  styleUrls: ['./zhxx.component.css']
})
export class ZhxxComponent implements DoCheck {
  temp: any;
  searchCode: any;
  accountStatus: any;
  isAutoShutdown: any;
  code: string;
  list: any;
  proName: any;
  userCode: any;
  alert: boolean;
  textType: string;
  accountDetail: any;
  resetAlert: any;
  selectDetail: any;
  newPass: any;
  constructor(public data: DataService, public http: HttpService) {
    this.accountDetail = {
      accountCode: '',
      accountCommission: '',
      accountName: '',
      accountPwd: '',
      accountStatus: 0,
      bpLine: '',
      closingDownLine: '',
      isAutoShutdown: 1,
      teamCode: this.code
    };
    this.newPass = '';
    this.resetAlert = this.data.hide;
    this.selectDetail = this.accountDetail;
    this.temp = '';
    this.code = '';
    this.isAutoShutdown = 1;
    this.accountStatus = 0;
    this.userCode = this.data.userCode;
    this.alert = this.data.hide;
    this.textType = '新增';
  }

  ngDoCheck() {
    if (this.code !== this.data.searchCode) {
      this.code = this.data.searchCode;
      this.search();
    }
  }

  search() {
    this.searchCode = this.userCode;
    this.data.userCode = this.searchCode;
    this.getList();
  }

  getList() {
    this.data.clearTimeOut();
    const data = {
      teamCode: this.code,
      accountCode: this.searchCode
    };
    this.http.getTeamMember(data).subscribe((res) => {
      this.list = res;
      this.data.settimeout = setTimeout(() => {
        this.getList();
      }, this.data.timeout);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  goto(url) {
    this.data.goto('main/tdgl/' + url);
  }

  searchAll() {
    this.searchCode = '';
    this.getList();
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
        teamCode: this.code
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
      teamCode: this.code
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
      } else if (this.accountDetail.accountPwd === '') {
        this.data.ErrorMsg('交易员密码不能为空');
      } else if (this.accountDetail.bpLine === '') {
        this.data.ErrorMsg('BP值不能为空');
      } else if (this.accountDetail.closingDownLine === '') {
        this.data.ErrorMsg('停机位不能为空');
      } else if (this.accountDetail.accountCommission === '') {
        this.data.ErrorMsg('交易佣金不能为空');
      } else {
        this.accountDetail.teamCode = this.code;
        this.accountDetail.accountPwd = Md5.hashStr(this.accountDetail.accountPwd);
        this.submit(this.accountDetail, 'ADD');
      }
    } else {
      if (this.accountDetail.accountName === '') {
        this.data.ErrorMsg('中文名字不能为空');
      } else if (this.accountDetail.bpLine === '') {
        this.data.ErrorMsg('BP值不能为空');
      } else if (this.accountDetail.closingDownLine === '') {
        this.data.ErrorMsg('停机位不能为空');
      } else if (this.accountDetail.accountCommission === '') {
        this.data.ErrorMsg('交易佣金不能为空');
      } else {
        this.accountDetail.teamCode = this.code;
        this.submit(this.accountDetail, 'UPDATE');
      }
    }
  }

  submit(data, type) {
    this.http.addJyy(data, type).subscribe((res) => {
      this.data.ErrorMsg('添加成功');
      this.getList();
      this.close();
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  select(data) {
    this.temp = data.accountCode;
    this.selectDetail = {
      accountCode: data.accountCode,
      accountCommission: data.accountCommission,
      accountName: data.accountName,
      accountPwd: data.accountPwd,
      accountStatus: data.accountStatus,
      bpLine: data.bpLine,
      closingDownLine: data.closingDownLine,
      isAutoShutdown: data.isAutoShutdown,
      teamCode: this.code
    };
  }

  update() {
    if (this.temp !== '') {
      this.add();
      this.textType = '修改';
      this.accountDetail = this.selectDetail;
    }
  }

  del() {
    const data = {
      accountCode: this.selectDetail.accountCode,
      teamCode: this.code
    };
    if (confirm('确定删除交易员？')) {
      this.http.delJyy(data).subscribe((res) => {
        this.data.ErrorMsg('删除成功');
        this.getList();
      }, (err) => {
        this.data.error = err.error;
        this.data.isError();
      });
    }
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
