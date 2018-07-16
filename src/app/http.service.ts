import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable()
export class HttpService {
  public host = 'http://192.168.1.104:8082/t0proxy/t0/';
  public ws = 'http://192.168.1.104:8082/t0proxy/webSocket';
  // public host = 'http://218.85.23.217:8082/t0proxy/t0/';
  // public ws = 'http://218.85.23.217:8082/t0proxy/webSocket';
  // public host = 'http://106.15.92.93:10008/tnproxy/t0/';
  // public ws = 'http://106.15.92.93:10008/tnproxy/webSocket';
  public stockHQ: any;

  constructor(public http: HttpClient, public data: DataService) {
  }

  POST(url, data) {
    this.data.getHeader();
    return this.http.post(this.host + url, data, this.data.getHeader());
  }

  export(url, data) {
    this.data.getExportHeader();
    return this.http.post(this.host + url, data, { headers: this.data.getExportHeader(), responseType: 'arraybuffer' });
  }

  /**
   * 登录接口
   */
  login(data) {
    return this.http.post(this.host + 'login', data);
  }

  /**
   * 获取团队列表
   */
  getTeamList() {
    return this.POST('team/list', {});
  }

  /**
   * 获取产品列表
   */
  getProList() {
    return this.POST('product/list', {});
  }

  /**
   * 获取团队交易员
   */
  getTeamMember(data) {
    return this.POST('team/account', data);
  }

  /**
   * 获取委托列表
   */
  getWtList(data) {
    return this.POST('today/appoint', data);
  }

  /**
   * 获取团队当日盈亏
   */
  getTeamPrice(code) {
    return this.POST('team/' + code + '/profit', {});
  }

  /**
   * 获取分配列表
   */
  getHold(code) {
    return this.POST('team/' + code + '/hold', {});
  }

  /**
   * 分券还券
   */
  coupon(data) {
    return this.POST('coupon', data);
  }

  /**
   * 获取交易员列表
   */
  getJyyList(teamCode) {
    return this.POST('team/account', { teamCode: teamCode });
  }

  /**
 * 获取交易员列表（用于弹窗中的交易员列表）
 */
  getJyyList2(teamCode) {
    return this.POST('team/' + teamCode + '/account', {});
  }

  /**
   * 获取私券列表
   */
  getPrivateHold(data) {
    return this.POST('private/hold', data);
  }

  /**
   * 获取成交列表
   */
  getTrade(data) {
    return this.POST('today/trade', data);
  }

  /**
   * 获取待平列表
   */
  getClosed(data) {
    return this.POST('today/unclose', data);
  }

  /**
   * 修改（UPDATE）新增（ADD）交易员
   */
  addJyy(data, type) {
    return this.POST('account/' + type, data);
  }

  /**
   * 删除交易员
   */
  delJyy(data) {
    return this.POST('account/delete', data);
  }

  /**
   * 重置交易员密码
   */
  reset(data) {
    return this.POST('account/pwdReset', data);
  }

  /**
   * 产品发生金额
   */
  productProfit(code) {
    return this.POST('product/' + code + '/profit', {});
  }

  /**
   * 产品持仓
   */
  productHold(code) {
    return this.POST('product/' + code + '/hold', {});
  }

  /**
   * 产品当日委托
   */
  productAppoint(code) {
    return this.POST('product/' + code + '/appoint', {});
  }

  /**
   * 产品成交列表
   */
  productTrade(code) {
    return this.POST('product/' + code + '/trade', {});
  }

  /**
   * 获取团队利润统计
   */
  teamProfit(data) {
    return this.POST('today/profit', data);
  }

  /**
   * 获取产品利润统计
   */
  productProfitDetail(code) {
    return this.POST('product/' + code + '/profitDetail', {});
  }

  /**
   * 查询历史委托
   */
  historyAppoint(data, type) {
    return this.POST('history/' + type, data);
  }

  /**
   * 平仓
   */
  appointSELL(data, type) {
    return this.POST('appoint/' + type, data);
  }

  /**
   * 撤单
   */
  appointCancel(data, pkOrder) {
    return this.POST('cancel?pkOrder=' + pkOrder, data);
  }

  /**
   * 清除委托
   */
  appointClear(pkOrder) {
    return this.POST('orderCtrl/DELETE?pkOrder=' + pkOrder, {});
  }

  /**
   * 导出团队分配列表
   */
  exportHoldTeam(code) {
    return this.export('team/' + code + '/hold/export', {});
  }

  /**
   * 导出团队委托列表
   */
  exportAppointTeam(data) {
    return this.export('today/appoint/export', data);
  }

  /**
   * 导出团队成交列表
   */
  exportTradeTeam(data) {
    return this.export('today/trade/export', data);
  }

  /**
  * 导出团队利润统计列表
  */
  exportProfitTeam(data) {
    return this.export('today/profit/export', data);
  }

  /**
  * 导出产品委托列表
  */
  exportAppointProduct(code) {
    return this.export('product/' + code + '/appoint/export', {});
  }

  /**
   * 导出产品成交列表
   */
  exportTradeProduct(code) {
    return this.export('product/' + code + '/trade/export', {});
  }

  /**
   * 导出产品利润统计列表
   */
  exportProfitProduct(code) {
    return this.export('product/' + code + '/profitDetail/export', {});
  }

  /**
   * 产品持仓刷新按钮
   */
  refresh(code) {
    return this.POST('product/' + code + '/hold/refresh', {});
  }
}
