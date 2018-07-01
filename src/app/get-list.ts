import { HttpService } from './http.service';
import { DataService } from './data.service';
import { DoCheck } from '@angular/core';

export class GetList implements DoCheck {
    code: any;
    getlist: any;
    public http: HttpService;
    public data: DataService;
    constructor() {
    }

    ngDoCheck() {
        if (this.code !== this.data.searchCode) {
            this.code = this.data.searchCode;
            // this.getTeamMember();
            console.log(this.code);
            this.getList();
        }
    }
    getList() {
        return this.getlist;
    }
}
