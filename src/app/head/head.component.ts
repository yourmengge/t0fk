import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Md5 } from 'ts-md5';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  username: string;
  resetAlert: boolean;
  newPass = '';
  oldPass = '';
  clickCnt = 0;
  constructor(public data: DataService, public http: HttpService) {
    this.resetAlert = this.data.hide;
  }

  ngOnInit() {
    this.username = this.data.getSession('username');
  }

  teamdplb() {
    this.data.goto('main/teamdplb');
  }

  logout(text) {
    this.data.ErrorMsg(text);
    this.data.userCode = '';
    this.data.teamCode = '';
    this.data.productCode = '';
    this.data.removeSession('token');
    this.data.goto('/');
  }

  restart() {
    const t = setTimeout(() => {
      this.clickCnt = 0;
    }, 10000);
    this.clickCnt++;
    if (this.clickCnt === 10) {
      this.http.restart().subscribe(res => {
        this.clickCnt = 0;
        this.data.ErrorMsg('重连成功');
        clearTimeout(t);
      });
    }


  }

  reset() {
    this.resetAlert = this.data.show;
  }

  resetSubmit() {
    const data = {
      monitorCode: this.username,
      newPasswd: Md5.hashStr(this.newPass),
      oldPasswd: Md5.hashStr(this.oldPass)
    };
    if (this.newPass !== '') {
      this.http.resetUserPass(data).subscribe((res) => {
        this.data.ErrorMsg('修改密码成功');
        this.close();
        setTimeout(() => {
          this.logout('请重新登录');
        }, 2000);

      }, (err) => {
        this.data.error = err.error;
        this.data.isError();
      });
    } else {
      this.data.ErrorMsg('请输入新密码');
    }
  }

  close() {
    this.resetAlert = this.data.hide;
  }

}
