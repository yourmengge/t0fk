import { Component, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-cpwtlb',
  templateUrl: './cpwtlb.component.html',
  styleUrls: ['./cpwtlb.component.css']
})
export class CpwtlbComponent implements DoCheck {
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
      this.getWtList();
    }
  }

  /**
 * 获取委托列表
 */
  getWtList() {
    this.data.Loading(this.data.show);
    this.http.productAppoint(this.code).subscribe((res) => {
      this.list = res;
      this.data.Loading(this.data.hide);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

}
