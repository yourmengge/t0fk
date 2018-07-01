import { Component, DoCheck, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { DataService } from '../data.service';
@Component({
  selector: 'app-lsyk',
  templateUrl: './lsyk.component.html',
  styleUrls: ['./lsyk.component.css']
})
export class LsykComponent implements DoCheck, OnInit {
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
  code: any;
  url: any;
  constructor(public http: HttpService, public data: DataService) {
    this.historyKeyWord.selectMonth = this.data.getTime('yyyy-MM', new Date());
  }

  ngDoCheck() {
    if (this.code !== this.data.searchCode) {
      this.code = this.data.searchCode;
      if (this.code !== '') {
        this.getList();
      }

    }
  }

  ngOnInit() {
    this.url = this.data.getUrl(2);
    this.historyKeyWord = this.data.historyKeyWord;
    this.historyKeyWord.selectMonth = this.data.getTime('yyyy-MM', this.historyKeyWord.selectDate);
    this.getList();
  }

  getList() {
    this.data.Loading(this.data.show);
    if (this.url === 'cpgl') {
      this.historyKeyWord.accountCode = '';
      this.historyKeyWord.productCode = this.code;
    } else {
      this.historyKeyWord.teamCode = this.code;
    }
    this.historyKeyWord.beginTime = this.data.getTime('yyyyMMss', this.historyKeyWord.selectMonth);
    // tslint:disable-next-line:max-line-length
    this.historyKeyWord.endTime = this.data.getTime('yyyyMMss', this.data.getLastDateOfMonth(new Date(this.historyKeyWord.selectMonth)));
    this.data.historyKeyWord = this.historyKeyWord;
    this.http.historyAppoint(this.historyKeyWord, 'profit').subscribe((res) => {
      this.list = res;
      this.data.Loading(this.data.hide);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }
}
