import { Component, DoCheck, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-lslyl',
  templateUrl: './lslyl.component.html',
  styleUrls: ['./lslyl.component.css']
})
export class LslylComponent implements DoCheck, OnInit {

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
  showType = '';
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
    this.showType = this.data.historyKeyWord.accountCode;
    this.getList();
    this.url = this.data.getUrl(2);
  }

  search() {
    this.showType = this.historyKeyWord.accountCode;
    this.getList();
  }

  getList() {
    if (this.data.isNull(this.historyKeyWord.selectDate)) {
      this.data.ErrorMsg('请选择交易日期');
    } else {
      this.data.Loading(this.data.show);
      this.historyKeyWord.beginTime = this.data.getTime('yyyyMMss', this.historyKeyWord.selectDate);
      this.historyKeyWord.endTime = this.historyKeyWord.beginTime;
      this.data.historyKeyWord = this.historyKeyWord;
      if (this.url === 'cpgl') {
        this.historyKeyWord.productCode = this.code;
        this.historyKeyWord.accountCode = '';
      } else {
        this.historyKeyWord.teamCode = this.code;
      }
      if (!this.data.isNull(this.code)) {
        this.http.historyAppoint(this.historyKeyWord, 'coeff').subscribe((res) => {
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
