import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  phone: string;
  password: string;
  constructor(public data: DataService, public http: HttpService) {
    this.password = '';
    this.phone = '';
  }

  ngOnInit() {
    this.data.clearPrice();
    this.data.clearTimeOut();
  }

  login() {
    if (this.phone === '') {
      this.data.ErrorMsg('请输入账号');
    } else if (this.password === '') {
      this.data.ErrorMsg('请输入密码');
    } else {
      const data = {
        username: this.phone,
        password: Md5.hashStr(this.password)
      };
      this.data.Loading(this.data.show);
      this.http.login(data).subscribe((res) => {
        this.data.setSession('username', this.phone);
        this.data.username = this.phone;
        this.data.token = res['resultInfo']['token'];
        // this.data.token = res['resultInfo'];
        this.data.roleCode = res['resultInfo']['roleCode'] + '';
        this.data.setSession('token', this.data.token);
        this.data.setSession('roleCode', this.data.roleCode);
        this.data.Loading(this.data.hide);
        this.data.ErrorMsg('登录成功');
        this.data.goto('main');
      }, (err) => {
        this.data.error = err.error;
        this.data.isError();
      });
    }
  }

}
