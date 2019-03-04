import { HttpService } from './http.service';
import { DataService } from './data.service';
import { DoCheck } from '@angular/core';

export class GetList implements DoCheck {
    url: string;
    exportName: string;
    exportUrl: string;
    getlist: any;
    public http: HttpService;
    public data: DataService;
    isSort: boolean;
    sortType: any;
    sortName: any;
    sortData: any;
    temp: any;
    searchCode: any;
    accountStatus: any;
    isAutoShutdown: any;
    code: string;
    list: Array<any>;
    proName: any;
    checkId: any;
    userCode: any;
    alert: boolean;
    textType: string;
    deleteData: any;
    accountDetail: any;
    resetAlert: any;
    selectDetail: any;
    newPass: any;
    roleCode = '1';
    confirm: boolean;
    confirmText: string;
    actionType: string;
    sellType: string;
    resData: any;
    pkOrder: any;

    checkList = [];
    checkedAll: boolean;
    autofocusId: any;
    array = [];

    statusType = [{
        id: 8,
        name: '已成'
    }, {
        id: 5,
        name: '部成已撤'
    }, {
        id: 6,
        name: '已撤'
    }, {
        id: 9,
        name: '废单'
    }];
    selectType: any;
    selectList = [{
        id: '1',
        name: '交易账户'
    }, {
        id: '2',
        name: '产品编号'
    }, {
        id: '3',
        name: '股票代码'
    }];

    listData: any; // 列表查询条件

    constructor(url: string) {
        this.url = url;
    }

    ngDoCheck() {
        if (this.code !== this.data.teamCode && !this.data.isNull(this.data.teamCode)) {
            this.code = this.data.teamCode;
            this.userCode = this.data.userCode;
            this.selectType = this.data.selectType;
            if (this.data.getUrl(3) === 'zhxx') {
                this.temp = '';
                if (this.data.selectType === '1') {
                    this.userCode = this.data.userCode;
                } else {
                    this.userCode = '';
                }
                this.selectType = '1';
            }
            this.checkId = '';
            this.list = [];
            this.checkList = [];
            this.search();
        }
    }

    search() {
        this.searchCode = this.userCode;
        this.data.userCode = this.userCode;
        this.data.selectType = this.selectType;
        this.checkList = [];
        this.checkId = '';
        this.checkedAll = false;
        this.getList();
    }
    clickAll() {
        this.checkedAll = !this.checkedAll;
        if (this.checkedAll) {
            // tslint:disable-next-line:forin
            for (const i in this.list) {
                this.checkList.push(i);
                this.list[i].isChecked = true;
            }
        } else {
            this.checkList = [];
            for (const i of this.list) {
                i.isChecked = false;
            }
        }
    }


    fontColor(text) {
        return text === '买入' ? 'red' : text === '卖出' ? 'green' : '';
    }

    /**
     * 跳转到历史列表界面
     */
    history() {
        this.data.goto('main/tdgl/history');
    }

    /**
     * 判断盈亏
     * @param data
     */
    proFit(data) {
        if (data === 0) {
            return '';
        } else if (data > 0) {
            return 'red';
        } else {
            return 'green';
        }
    }

    getList() {
        this.data.clearTimeOut();
        this.getListData();
        this.http.getList(this.url, this.listData).subscribe((res: Array<any>) => {
            this.list = res;
            this.afterGetList();
            this.data.settimeout = setTimeout(() => {
                this.getList();
            }, this.data.timeout);
        }, (err) => {
            this.data.error = err.error;
            this.data.isError();
        });
    }

    getListData() {
        switch (this.selectType) {
            case '1':
                this.listData = {
                    teamCode: this.code,
                    accountCode: this.searchCode
                };
                break;
            case '2':
                this.listData = {
                    teamCode: this.code,
                    productCode: this.searchCode
                };
                break;
            case '3':
                this.listData = {
                    teamCode: this.code,
                    stockCode: this.searchCode
                };
                break;
        }
    }

    afterGetList() {

    }

    sortList(data, type) {
        this.sortType = !this.sortType;
        this.sortData = data;
        this.sortName = type;
        this.sort(this.sortData, this.sortName);
    }

    sort(data, type) {
        this.isSort = true;
        this.list.sort((a, b) => {
            if (type === 'num') {
                if (this.sortType) {
                    return (b[data] - a[data]);
                } else {
                    return (a[data] - b[data]);
                }
            } else {
                if (this.sortType) {
                    return a[data].localeCompare(b[data]);
                } else {
                    return b[data].localeCompare(a[data]);
                }
            }


        });

    }

    /**
     * 页面跳转
     * @param url
     */
    goto(url) {
        this.data.goto('main/tdgl/' + url);
    }

    searchAll() {
        this.searchCode = '';
        this.getList();
    }

    /**
     * 判断按钮是否可点击
     * @param temp
     */
    disabled(temp) {
        if (this.data.roleCode === '0') {
            return true;
        } else if (this.data.roleCode === '1' && (temp === '' || temp === 0)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 导出列表
     */
    export() {
        let data;
        switch (this.selectType) {
            case '1':
                data = 'teamCode=' + this.code + '&accountCode=' + this.searchCode;
                break;
            case '2':
                data = 'teamCode=' + this.code + '&productCode=' + this.searchCode;
                break;
            case '3':
                data = 'teamCode=' + this.code + '&stockCode=' + this.searchCode;
                break;
        }

        this.http.exportTEAM(this.exportUrl, data).subscribe((res) => {
            this.data.downloadFile(res, this.exportName);
        }, (err) => {
            this.data.error = err.error;
            this.data.isError();
        });
    }

}
