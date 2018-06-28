import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line:import-spacing
// import *  as SockJS from 'sockjs-client';
// tslint:disable-next-line:import-spacing
// import *  as Stomp from '@stomp/stompjs';

import { DataService, CodeType } from '../data.service';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  // stompClient: any;
  // stockHQ: any;

  // list: any;
  // url: string;
  // teamList: any;
  // teamCode: any;
  // proList: any;
  // productCode: any;
  // teamShow = this.data.hide;
  // proShow = this.data.hide;
  // codeType: CodeType;
  // codeAndType = '';

  constructor(public data: DataService, public http: HttpService) {
    // this.codeType.type = '';
    // this.codeType.code = '';


    // this.teamList = '';
    // this.proList = '';
    // this.url = this.data.getUrl(2);
    // if (this.url === 'tdgl') {
    //   this.getTeamList();
    // } else {
    //   this.getProList();
    // }

  }

  ngOnInit() {
    // this.url = this.data.getUrl(2);
  }


  // goto(url) {
  //   this.data.goto('main/' + url);
  //   this.url = url;
  //   if (url === 'tdgl') {
  //     this.getTeamList();
  //     this.proShow = this.data.hide;
  //   } else {
  //     this.getProList();
  //     this.teamShow = this.data.hide;
  //   }
  // }

  // /**
  //  * 获取团队列表
  //  */
  // getTeamList() {
  //   if (!this.teamShow) {
  //     this.http.getTeamList().subscribe((res) => {
  //       this.teamShow = this.data.show;
  //       this.teamList = res;
  //       this.productCode = '';
  //       this.teamCode = res[0].teamCode;
  //       // this.codeType.type = 'team';
  //       // this.codeType.code = this.teamCode;
  //       this.codeAndType = this.teamCode + '-' + 'team';
  //     }, (err) => {
  //       this.data.error = err.error;
  //       this.data.isError();
  //     });
  //   } else {
  //     this.teamShow = this.data.hide;
  //   }

  // }

  // /**
  //  * 获取产品列表
  //  */
  // getProList() {
  //   if (!this.proShow) {
  //     this.http.getProList().subscribe((res) => {
  //       this.proShow = this.data.show;
  //       this.proList = res;
  //       this.teamCode = '';
  //       this.productCode = res[0].productCode;
  //       // this.codeType.type = 'product';
  //       // this.codeType.code = this.productCode;
  //       this.codeAndType = this.productCode + '-' + 'product';
  //     }, (err) => {
  //       this.data.error = err.error;
  //       this.data.isError();
  //     });
  //   } else {
  //     this.proShow = this.data.hide;
  //   }
  // }

  // /**
  //  * 选择团队
  //  */
  // selectTeam(code) {
  //   if (this.url !== 'tdgl') {
  //     this.goto('tdgl');
  //   }
  //   this.teamCode = code;
  //   this.codeAndType = this.teamCode + '-' + 'team';
  // }

  // /**
  //  * 选择产品
  //  */
  // selectPro(code) {
  //   if (this.url !== 'cpgl') {
  //     this.goto('cpgl');
  //   }
  //   this.productCode = code;
  //   this.codeAndType = this.productCode + '-' + 'product';
  // }
  /**
 * 连接ws
 */
  // connect() {
  //   console.log('发起ws请求');
  //   const that = this;
  //   const socket = new SockJS(this.http.ws);
  //   const headers = { opUserCode: this.data.getUserName() };
  //   this.stompClient = Stomp.over(socket);
  //   this.stompClient.connect(headers, function (frame) {
  //     console.log('Connected: ' + frame);
  //     that.stompClient.subscribe('/user/' + that.data.getUserName() + '/topic/t0', function (res) {
  //       that.stockHQ = JSON.parse(res.body);
  //       console.log(that.stockHQ);
  //       console.log(res);
  //     });


  //   }, function (err) {
  //     console.log('err', err);
  //   });
  // }
}
