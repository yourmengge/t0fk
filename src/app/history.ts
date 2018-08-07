import { DataService } from './data.service';
import { HttpService } from './http.service';
import { DoCheck, OnInit } from '@angular/core';

export class History implements DoCheck, OnInit {
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
    exportData: any;
    historyType: string;
    dateType: string;
    exportName: string;
    constructor(public data: DataService, public http: HttpService) {

    }

    ngDoCheck() {
        if (this.data.getUrl(2) === 'cpgl' && this.code !== this.data.productCode) {
            this.code = this.data.productCode;
            this.getList();
            this.data.clearPrice();
        } else if (this.data.getUrl(2) === 'tdgl' && this.code !== this.data.teamCode) {
            this.code = this.data.teamCode;
            this.getList();
            this.data.clearPrice();
        }

    }

    ngOnInit() {
        this.url = this.data.getUrl(2);
        this.historyKeyWord = this.data.historyKeyWord;
        if (this.dateType === 'month') {
            if (this.historyKeyWord.selectDate === '') {
                this.historyKeyWord.selectMonth = this.data.getTime('yyyy-MM', new Date());
            } else {
                this.historyKeyWord.selectMonth = this.data.getTime('yyyy-MM', this.historyKeyWord.selectDate);
            }
        } else {
            if (this.historyKeyWord.selectDate === '') {
                this.historyKeyWord.selectDate = this.data.getTime('yyyy-MM-dd', new Date());
            }
        }


        this.getList();
    }

    getList() {
        if (this.dateType === 'month') {
            if (this.data.isNull(this.historyKeyWord.selectMonth)) {
                this.data.ErrorMsg('请选择交易月份');
            } else {
                this.historyKeyWord.beginTime = this.data.getTime('yyyyMMss', this.historyKeyWord.selectMonth);
                // tslint:disable-next-line:max-line-length
                this.historyKeyWord.endTime = this.data.getTime('yyyyMMss', this.data.getLastDateOfMonth(new Date(this.historyKeyWord.selectMonth)));
            }
        } else {
            if (this.data.isNull(this.historyKeyWord.selectDate)) {
                this.data.ErrorMsg('请选择交易日期');
            } else {
                this.historyKeyWord.beginTime = this.data.getTime('yyyyMMss', this.historyKeyWord.selectDate);
                this.historyKeyWord.endTime = this.historyKeyWord.beginTime;
            }
        }
        if (this.url === 'cpgl') {
            this.historyKeyWord.accountCode = '';
            this.historyKeyWord.productCode = this.code;
        } else {
            this.historyKeyWord.teamCode = this.code;
        }
        this.data.historyKeyWord = this.historyKeyWord;
        if (!this.data.isNull(this.code)) {
            this.http.getHistoryList(this.historyKeyWord, this.historyType).subscribe((res) => {
                this.list = res;
            }, (err) => {
                this.data.error = err.error;
                this.data.isError();
            });
        }

    }
    export() {
        this.exportData = 'accountCode=' + this.historyKeyWord.accountCode +
            '&appointOrderCode=' + this.historyKeyWord.appointOrderCode + '&beginTime=' + this.historyKeyWord.beginTime +
            '&endTime=' + this.historyKeyWord.endTime + '&productCode=' + this.historyKeyWord.productCode +
            '&teamCode=' + this.historyKeyWord.teamCode;
        this.http.exportHistoryList(this.exportData, this.historyType).subscribe((res) => {
            console.log(res);
            this.data.downloadFile(res, this.exportName);
        }, (err) => {
            this.data.error = err.error;
            this.data.isError();
        });
    }
}
