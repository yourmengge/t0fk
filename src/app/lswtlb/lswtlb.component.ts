import { Component, DoCheck, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-lswtlb',
  templateUrl: './lswtlb.component.html',
  styleUrls: ['./lswtlb.component.css']
})
export class LswtlbComponent implements DoCheck, OnInit {
  list: any;
  code: any;
  url: any;
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

  constructor(public http: HttpService, public data: DataService) {
    this.historyKeyWord.selectDate = this.data.getTime('yyyy-MM-dd', new Date());
  }

  ngDoCheck() {
    if (this.code !== this.data.searchCode) {
      this.code = this.data.searchCode;
      console.log(this.code);
      if (!this.data.isNull(this.code)) {
        this.getList();
        this.data.clearPrice();
      }
    }
  }

  ngOnInit() {
    this.url = this.data.getUrl(2);
    this.historyKeyWord = this.data.historyKeyWord;
    if (this.historyKeyWord.selectDate === '') {
      this.historyKeyWord.selectDate = this.data.getTime('yyyy-MM-dd', new Date());
    }
    this.getList();
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
        this.http.historyAppoint(this.historyKeyWord, 'appoint').subscribe((res) => {
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
