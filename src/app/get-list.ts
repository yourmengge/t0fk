import { HttpService } from './http.service';
import { DataService } from './data.service';

export class GetList {
    public http: HttpService;
    public data: DataService;
    constructor() {
    }
    getList(fnName) {
        fnName.subscribe((res) => {
            return res;
        }, (err) => {
            this.data.error = err.error;
            this.data.isError();
        });
    }
}
