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
    if (this.code !== this.data.productCode) {
      this.code = this.data.productCode;
      if (!this.data.isNull(this.code)) {
        this.getList();
      }
    }
  }

  /**
 * 获取委托列表
 */
  getList() {
    this.data.clearTimeOut();
    this.http.productAppoint(this.code).subscribe((res) => {
      this.list = res;
      this.data.settimeout = setTimeout(() => {
        this.getList();
      }, this.data.timeout);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  export() {
    this.http.exportAppointProduct(this.code).subscribe((res) => {
      this.data.downloadFile(res, '产品委托列表');
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

}
