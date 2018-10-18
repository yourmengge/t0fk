import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class DataService {

  public GET_ACCOUNT_LIST = 'team/account';
  public GET_TEAM_PROFIT = 'today/profit';
  public EXPORT_TODAY_PROFIT = 'today/profit/export';
  public GET_TODAY_CLOSE = 'today/unclose';
  public GET_TODAY_TRADE = 'today/trade';
  public EXPORT_TODAY_TRADE = 'today/trade/export';
  public GET_TODAY_APPOINT = 'today/appoint';
  public EXPORT_TODAY_APPOINT = 'today/appoint/export';
  public GET_PRIVATE_HOLD = 'private/hold';
  isPhone = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
  alert = false;
  loading = false;
  errMsg = '出错啦';
  error: Error;
  show = true;
  hide = false;
  username: string; // 用户名
  token: string;
  settimeout: any;
  settimeoutprice: any;
  timeout = 3000;
  userCode: string; // 交易员账户

  roleCode: string; // 0	查询权限  1	操作权限

  teamCode: string; // 团队查询或产品查询的code
  teamName: string; // 团队查询或产品查询的名字
  productName: string;
  productCode: string;

  searchProCode: string; // 分配列表输入框产品编号
  searchStockCode: string; // 分配列表输入框股票编号
  selectType: any;
  pageNum: number; // 当前展示的列表条数

  accountValid = /^[0-9A-Za-z_]+$/;

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

  stockHQ = {
    'closePrice': '',
    'highPrice': '',
    'lowPrice': '',
    'lastPrice': '',
    'openPrice': '',
    'orderTime': '',
    'preClosePrice': '',
    'stockCode': '',
    'buyLevel': {
      'buyPrice01': '--',
      'buyPrice02': '--',
      'buyPrice03': '--',
      'buyPrice04': '--',
      'buyPrice05': '--',
      'buyPrice06': '--',
      'buyPrice07': '--',
      'buyPrice08': '--',
      'buyPrice09': '--',
      'buyPrice10': '--',
      'buyVolume01': '--',
      'buyVolume02': '--',
      'buyVolume03': '--',
      'buyVolume04': '--',
      'buyVolume05': '--',
      'buyVolume06': '--',
      'buyVolume07': '--',
      'buyVolume08': '--',
      'buyVolume09': '--',
      'buyVolume10': '--'
    },
    'sellLevel': {
      'sellPrice01': '--',
      'sellPrice02': '--',
      'sellPrice03': '--',
      'sellPrice04': '--',
      'sellPrice05': '--',
      'sellPrice06': '--',
      'sellPrice07': '--',
      'sellPrice08': '--',
      'sellPrice09': '--',
      'sellPrice10': '--',
      'sellVolume01': '--',
      'sellVolume02': '--',
      'sellVolume03': '--',
      'sellVolume04': '--',
      'sellVolume05': '--',
      'sellVolume06': '--',
      'sellVolume07': '--',
      'sellVolume08': '--',
      'sellVolume09': '--',
      'sellVolume10': '--'
    }

  };
  constructor(public router: Router) {
    this.teamCode = '';
    this.userCode = '';
    this.selectType = '1';
    this.pageNum = 50;
    this.productCode = '';
    this.searchProCode = '';
    this.searchStockCode = '';
    console.log(this.getSession('roleCode'));
    this.roleCode = this.getSession('roleCode') === undefined ? 0 : this.getSession('roleCode');
    // this.roleCode = 2;
  }
  /**
   * 获取当前url最后的参数
   */
  getUrl(num) {
    return window.location.hash.split('/')[num];
  }

  /**
   * 清楚settimeout
   */
  clearTimeOut() {
    window.clearTimeout(this.settimeout);
  }

  /**
 * 清楚settimeout
 */
  clearPrice() {
    window.clearTimeout(this.settimeoutprice);
  }
  getToken() {
    if (this.isNull(this.token)) {
      return this.getSession('token');
    } else {
      return this.token;
    }
  }
  /**
   * 页面跳转
   */
  goto(url) {
    return this.router.navigate([url]);
  }

  getUserName() {
    if (this.isNull(this.username)) {
      return this.getSession('username');
    } else {
      return this.username;
    }
  }

  /**
   * 请求出错提示
   */
  isError() {
    this.Loading(this.hide);
    this.alert = true;
    setTimeout(() => {
      this.alert = false;
    }, 2000);
    this.errMsg = this.error.resultInfo;
    if (this.error.resultCode === 'token.error') {
      this.removeSession('token');
      this.goto('/');
    }
  }

  /**
   * 初始化historyKeyWord
   */
  initHistoryWord() {
    this.historyKeyWord = {
      beginTime: '',
      endTime: '',
      teamCode: '',
      productCode: '',
      accountCode: '',
      appointOrderCode: '',
      selectDate: this.getTime('yyyy-MM-dd', new Date()),
      selectMonth: ''
    };
  }

  /**
   * 输入出错提示
   */
  ErrorMsg(desc) {
    this.alert = true;
    setTimeout(() => {
      this.alert = false;
    }, 2000);
    this.errMsg = desc;
  }

  /**
   * 加载中提示
   */
  Loading(type) {
    this.loading = type;
  }

  /**
   * 判断空数组
   */
  isNullArray(array) {
    return array.length === 0 ? true : false;
  }

  /**
  * 判断是否为空
  */
  isNull(string) {
    // tslint:disable-next-line:max-line-length
    return (string === 0 || string === 'undefined' || string === '' || string === null || string === 'null' || string === undefined || string === 'NaN') ? true : false;
  }

  getHeader() {
    if (this.isNull(this.token)) {
      if (this.isNull(this.getSession('token'))) {
        this.ErrorMsg('请重新登录');
        this.goto('/login');
        return;
      } else {
        this.token = this.getSession('token');
        return { headers: new HttpHeaders({ 'Authorization': this.getSession('token') }) };
      }

    } else {
      return { headers: new HttpHeaders({ 'Authorization': this.token }) };
    }
  }

  getExportHeader() {
    if (this.isNull(this.token)) {
      if (this.isNull(this.getSession('token'))) {
        this.ErrorMsg('请重新登录');
        this.goto('/login');
        return;
      } else {
        this.token = this.getSession('token');
        // tslint:disable-next-line:max-line-length
        return new HttpHeaders({ 'Authorization': this.getSession('token'), 'Content-Type': 'application/x-www-form-urlencoded' });
      }

    } else {
      return new HttpHeaders({ 'Authorization': this.token, 'Content-Type': 'application/x-www-form-urlencoded' });
    }
  }

  downloadFile(res, text) {
    if (window.URL.createObjectURL(new Blob()).indexOf(location.host) < 0) {// 判断是否为IE
      if (window.navigator.msSaveOrOpenBlob) {// IE10+方法
        const name = text + '.xls';
        const blobObject = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const result = window.navigator.msSaveOrOpenBlob(blobObject, name);
      }
    } else {
      const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.setAttribute('href', objectUrl);
      a.setAttribute('download', text + '.xls');
      a.click();
      URL.revokeObjectURL(objectUrl);
    }

  }

  getSession(name): any {
    return sessionStorage.getItem(name);
  }
  setSession(name, data) {
    return sessionStorage.setItem(name, data);
  }

  removeSession(name) {
    return sessionStorage.removeItem(name);
  }

  getLocalStorage(name) {
    return localStorage.getItem(name);
  }

  setLocalStorage(name, data) {
    return localStorage.setItem(name, data);
  }

  /**
   * 获取历史列表
   */
  getHistoryFooter() {
    return [{
      id: 'lswtlb',
      name: '历史委托'
    }, {
      id: 'lscj',
      name: '历史成交'
    }, {
      id: 'lsyk',
      name: '历史盈亏'
    }, {
      id: 'lslyl',
      name: '历史利用率'
    }];
  }

  /**
   * 获取左边菜单栏列表
   */
  getMenuList() {
    return [{
      id: 'cpgl',
      name: '产品管理'
    }, {
      id: 'tdgl',
      name: '团队管理'
    },
    // {
    //   id: 'jyygl',
    //   name: '交易员管理'
    // },
    {
      id: 'jyyccgl',
      name: '交易员持仓管理'
    }, {
      id: 'wtgl',
      name: '委托管理'
    }, {
      id: 'cjgl',
      name: '成交管理'
    }, {
      id: 'wpgl',
      name: '未平管理'
    }, {
      id: 'fqgl',
      name: '分券管理',
      second: [{
        id: 'cpfq',
        name: '产品分券'
      }, {
        id: 'tdfq',
        name: '团队分券'
      }]
    }, {
      id: 'hqgl',
      name: '还券管理',
      second: [{
        id: 'tdhq',
        name: '团队还券'
      }, {
        id: 'jyyhq',
        name: '交易员还券'
      }]
    }];
  }

  /**
   * 获取团队管理底部菜单栏
   */
  getTdglFooter() {
    return [{
      id: 'zhxx',
      name: '账户信息'
    }, {
      id: 'fplb',
      name: '分配列表'
    }, {
      id: 'ghlb',
      name: '归还列表'
    }, {
      id: 'wtlb',
      name: '委托列表'
    }, {
      id: 'cjlb',
      name: '成交列表'
    }, {
      id: 'dplb',
      name: '待平列表'
    }, {
      id: 'lrtj',
      name: '利润统计'
    }];
  }

  /**
   * 获取产品管理底部菜单栏
   */
  getCpglFooter() {
    return [{
      id: 'cpcc',
      name: '产品持仓'
    }, {
      id: 'cpwtlb',
      name: '产品委托列表'
    }, {
      id: 'cpcjlb',
      name: '产品成交列表'
    }, {
      id: 'cplrtj',
      name: '产品利润统计'
    }];
  }

  /**
   * 是否为整百
   */
  is100Int(num) {
    return num % 100 === 0 ? true : false;
  }

  /**
  * 获取当前时间：毫秒
  */
  getTime(type, time) {
    time = new Date(time);
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const millseconds = time.getMilliseconds();
    switch (type) {
      case 'yyyyMMddhhmmss':
        return year + this.add0(month).toString() + this.add0(day) +
          this.add0(hour) + this.add0(minutes) + this.add0(seconds) + this.add0(millseconds);
      case 'yyyy-MM-dd':
        return year + '-' + this.add0(month) + '-' + this.add0(day);
      case 'yyyyMMss':
        return year + this.add0(month).toString() + this.add0(day);
      case 'yyyy-MM':
        return year + '-' + this.add0(month);
    }
  }

  /**
  * 个位数补充0
  */
  add0(num) {
    return num < 10 ? '0' + num : num;
  }

  /**
   * 获取某月份的最后一天：获取下个月的第一天，减去一天，就是某个月的最后一天
   */
  getLastDateOfMonth(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(new Date(year, month + 1, 1).getTime() - 1000 * 60 * 60 * 24);
  }

  /**
 * 买入卖出数量向上取整
 */
  roundDown(num) {
    return parseInt((num / 100).toString(), 0) * 100;
  }
}



export interface Error {
  resultCode: string;
  resultInfo: string;
  success: boolean;
}

export interface CodeType {
  type: string;
  code: string;
}

