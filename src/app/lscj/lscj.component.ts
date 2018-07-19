import { Component, DoCheck, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-lscj',
  templateUrl: './lscj.component.html',
  styleUrls: ['./lscj.component.css']
})
export class LscjComponent implements DoCheck, OnInit {

  historyKeyWord = {
    beginTime: '',
    endTime: '',
    teamCode: '',
    productCode: '',
    accountCode: '',
    appointOrderCode: '',
    selectDate: '',
    selectMonth: ''
  };
  list: any;
  url: any;
  code: any;
  constructor(public http: HttpService, public data: DataService) {
    this.historyKeyWord.selectDate = this.data.getTime('yyyy-MM-dd', new Date());
  }

  ngDoCheck() {
    if (this.code !== this.data.teamCode) {
      this.code = this.data.teamCode;
      if (this.code !== '') {
        this.getList();
        this.data.clearPrice();
      }
    }
  }

  ngOnInit() {
    this.historyKeyWord = this.data.historyKeyWord;
    if (this.historyKeyWord.selectDate === '') {
      this.historyKeyWord.selectDate = this.data.getTime('yyyy-MM-dd', new Date());
    }
    this.getList();
    this.url = this.data.getUrl(2);
  }

  getList() {
    if (this.data.isNull(this.historyKeyWord.selectDate)) {
      this.data.ErrorMsg('请选择交易日期');
    } else {
      this.data.Loading(this.data.show);
      if (this.url === 'cpgl') {
        this.historyKeyWord.productCode = this.code;
      } else {
        this.historyKeyWord.teamCode = this.code;
      }
      this.historyKeyWord.beginTime = this.data.getTime('yyyyMMss', this.historyKeyWord.selectDate);
      this.historyKeyWord.endTime = this.historyKeyWord.beginTime;
      this.data.historyKeyWord = this.historyKeyWord;
      if (!this.data.isNull(this.code)) {
        this.http.historyAppoint(this.historyKeyWord, 'trade').subscribe((res) => {
          this.list = res;
          this.data.Loading(this.data.hide);
        }, (err) => {
          this.data.error = err.error;
          this.data.isError();
        });
      }
    }
  }

}
