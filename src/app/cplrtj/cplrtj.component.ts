import { Component, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-cplrtj',
  templateUrl: './cplrtj.component.html',
  styleUrls: ['./cplrtj.component.css']
})
export class CplrtjComponent implements DoCheck {

  code: string;
  list: any;
  proName: any;
  userCode: any;
  constructor(public http: HttpService, public data: DataService) {
    this.userCode = this.data.userCode;
    this.code = '';
  }

  ngDoCheck() {
    if (this.code !== this.data.searchCode) {
      this.code = this.data.searchCode;
      this.getList();
    }
  }

  /**
   * 获取委托列表
   */
  getList() {
    this.data.Loading(this.data.show);
    this.http.productProfitDetail(this.code).subscribe((res) => {
      this.list = res;
      this.data.Loading(this.data.hide);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

}
