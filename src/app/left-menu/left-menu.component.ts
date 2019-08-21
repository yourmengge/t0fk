import { Component, OnInit, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements DoCheck {
  list: any;
  url: string;
  teamList: any;
  teamCode: any;
  proList: any;
  productCode: any;
  teamShow = this.data.hide;
  proShow = this.data.hide;
  constructor(public data: DataService, public http: HttpService) {
    this.teamList = '';
    this.proList = '';
    this.url = this.data.getUrl(2);
    if (this.url === 'tdgl' || this.url === 'teamdplb') {
      this.getTeamList();
    } else {
      this.getProList();
    }

  }

  ngDoCheck() {
    this.url = this.data.getUrl(2);
  }


  goto(url) {
    this.data.clearPrice();
    this.data.clearTimeOut();
    this.data.initHistoryWord();
    this.data.userCode = '';
    this.url = url;
    this.data.goto('main/' + url);
  }

  /**
   * 获取团队列表
   */
  getTeamList() {
    this.http.getTeamList().subscribe((res) => {
      if (!this.data.isNull(res)) {
        this.teamList = res;
        this.productCode = '';
        this.teamCode = res[0].teamCode;
        this.data.teamCode = this.teamCode;
        this.data.teamName = res[0].teamName;
      } else {
        this.getTeamList();
      }
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });

  }

  /**
   * 获取产品列表
   */
  getProList() {
    this.http.getProList().subscribe((res: Array<any>) => {
      if (!this.data.isNull(res.length)) {
        this.proList = res;
        this.teamCode = '';
        this.productCode = res[0].productCode;
        this.data.productCode = this.productCode;
        this.data.productName = res[0].productName;
      } else {
        this.getProList();
      }
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  /**
   * 选择团队
   */
  selectTeam(code, name) {
    if (this.url !== 'tdgl') {
      this.goto('tdgl');
    }
    this.data.userCode = '';
    this.teamCode = code;
    this.data.teamName = name;
    this.data.teamCode = this.teamCode;
    this.proShow = this.data.hide;
  }

  /**
   * 选择产品
   */
  selectPro(code, name) {
    if (this.url !== 'cpgl') {
      this.goto('cpgl');
    }
    this.productCode = code;
    this.data.productName = name;
    this.data.productCode = this.productCode;
    this.teamShow = this.data.hide;
  }

  openTeam(url) {
    this.data.clearPrice();
    this.data.clearTimeOut();
    this.data.initHistoryWord();
    this.data.userCode = '';
    this.url = url;
    this.data.goto('main/' + url);
    if (url === 'tdgl') {
      this.teamShow = !this.teamShow;
      this.getTeamList();
    } else {
      this.proShow = !this.proShow;
      this.getProList();
    }
  }

}
