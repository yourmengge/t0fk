import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Md5 } from 'ts-md5';
@Injectable()
export class HttpService {
  // 测试环境
  public host = 'http://218.85.23.217:8082/t0proxy/t0/';
  public host2 = 'http://218.85.23.217:8082/t0proxy/';
  public ws = 'http://218.85.23.217:8082/t0proxy/webSocket';
  // 演示/开发环境
  // public host = 'http://101.132.65.124:10008/t0proxy/t0/';
  // public ws = 'http://101.132.65.124:10008/t0proxy/webSocket';
  public stockHQ: any;

  constructor(public http: HttpClient, public data: DataService) {
  }

  POST2(url, data) {
    this.data.getHeader();
    return this.http.post(this.host2 + url, data, this.data.getHeader());
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
   * 重启itg
   */
  restart() {
    return this.POST2(`dev/reconnect/TRADE_T0`, {});
  }
  /**
   * 获取行情
   */
  getHanQing(data) {
    return this.POST2(`push/subsMarket/${data.stockCode}`, {});
  }
  /**
   * 登录接口
   */
  login(data) {
    return this.http.post(this.host + 'login', data);
  }
  /**
 * 下单 参数 买入：BUY 卖出：SELL
 */
  order(type, data) {
    return this.POST(`appoint/${type}?limit=true`, data);
  }
  /**
   * 获取列表带参数data
   */
  getList(url, data) {
    return this.POST(url, data);
  }

  /**
 * 获取列表带参数data
 */
  getListPage(url, data) {
    return this.POST(url, data);
  }

  /**
* 导出团队利润统计列表
*/
  exportTEAM(url, data) {
    return this.export(url, data);
  }

  /**
   * 冻结或解锁产品
   */
  lock(data) {
    return this.POST('product/lock', data);
  }
  /**
 * 取消订阅
 */
  cancelSubscribe() {
    return this.POST2('push/unsubsMarket', {});
  }
  /**
   * 获取团队列表
   */
  getTeamList() {
    return this.POST('team/list', {});
  }

  /**
   * 修改委托单
   */
  updateAppoint(data) {
    return this.POST('orderCtrl/UPDATE', data);
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
  getHold(code, proCode, stockCode) {
    return this.POST('team/' + code + '/hold?productCode=' + proCode + '&stockCode=' + stockCode, {});
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
  getPrivateHold(data, proCode, stockCode) {
    return this.POST('private/hold?productCode=' + proCode + '&stockCode=' + stockCode, data);
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
    const detail = Object.assign({}, data);
    if (type === 'ADD') {
      detail['accountPwd'] = Md5.hashStr(detail['accountPwd']);
    }
    console.log(detail);
    return this.POST('account/' + type, detail);
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
   * 重置登陆用户密码
   */
  resetUserPass(data) {
    return this.POST('modifyPwd', data);
  }

  /**
   * 产品发生金额
   */
  productProfit(code) {
    return this.POST('product/' + code + '/info', {});
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
  exportHoldTeam(code, data) {
    return this.export('team/' + code + '/hold/export', data);
  }
  /**
* 导出历史列表
*/
  exportHistoryList(data, type) {
    // return this.POST('tn/history/' + type + '/export', data);
    this.data.getExportHeader();
    return this.http.post(this.host + 'tn/history/' + type + '/export', data,
      { headers: this.data.getExportHeader(), responseType: 'arraybuffer' });

  }
  /**
 * 查询历史列表
 */
  getHistoryList(data, type) {
    return this.POST('tn/history/' + type, data);
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

  /**
 * 一键归还产品持仓按钮
 */
  goback(code) {
    return this.POST('product/' + code + '/hold/reset', {});
  }
}
