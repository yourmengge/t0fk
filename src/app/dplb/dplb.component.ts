import { Component, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-dplb',
  templateUrl: './dplb.component.html',
  styleUrls: ['./dplb.component.css']
})
export class DplbComponent implements DoCheck {
  code: string;
  list: any;
  proName: any;
  userCode: any;
  constructor(public data: DataService, public http: HttpService) {
    this.code = '';
    this.userCode = this.data.userCode;
  }

  ngDoCheck() {
    if (this.code !== this.data.searchCode) {
      this.code = this.data.searchCode;
      this.getList();
    }
  }

  getList() {
    this.data.userCode = this.userCode;
    const data = {
      teamCode: this.code,
      accountCode: this.userCode
    };
    this.http.getClosed(data).subscribe((res) => {
      this.list = res;
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  searchAll() {
    const data = {
      teamCode: this.code,
      accountCode: ''
    };
    this.data.Loading(this.data.show);
    this.http.getClosed(data).subscribe((res) => {
      this.list = res;
      this.data.Loading(this.data.hide);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

}
