import { Component, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
import { GetList } from '../get-list';

@Component({
  selector: 'app-cpcjlb',
  templateUrl: './cpcjlb.component.html',
  styleUrls: ['./cpcjlb.component.css']
})
export class CpcjlbComponent implements DoCheck {

  code: string;
  list: any;
  proName: any;
  listData: any;
  constructor(public data: DataService, public http: HttpService) {
    this.code = '';
    this.listData = new GetList();
  }

  ngDoCheck() {
    if (this.code !== this.data.searchCode) {
      this.code = this.data.searchCode;
      this.getList();
    }
  }

  getList() {
    this.http.productTrade(this.code).subscribe((res) => {
      this.list = res;
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  // getData() {
  //   this.listData.getList(this.http.productTrade(this.code)).subscribe((res) => {

  //   });
  // }

}
