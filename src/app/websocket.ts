import { HttpService } from './http.service';
import { DataService } from './data.service';
import * as SockJS from 'sockjs-client';
import { over } from '@stomp/stompjs';
import { GetList } from './get-list';

export class Websocket extends GetList {
    resetAlert: boolean;
    fullcount: any;
    ccount: any;
    appointPrice: any;
    classType: string;
    appointCnt: any;
    socketInterval: any;
    accountCode: any;
    stockHQ: any;
    accountName: any;
    stompClient: any;
    stockName: string;
    connectStatus = true;

    constructor(public data: DataService, public http: HttpService) {
        super(data.GET_TODAY_CLOSE);
        this.stockHQ = this.data.stockHQ;
        this.connect();
    }
    /**
* 取消订阅
*/
    cancelSubscribe() {
        window.clearInterval(this.socketInterval);
        this.http.cancelSubscribe().subscribe((res) => {
            console.log('取消订阅');
        });
    }
    /**
  * 断开连接
  */
    disconnect() {
        if (this.connectStatus) {
            this.stompClient.disconnect((() => {
                console.log('断开链接');
                window.clearInterval(this.socketInterval);
            }));
        }
    }

    /**
  * 获取行情
  */
    getHanQing(data) {

        this.http.getHanQing(data).subscribe((res) => {
            if (!this.data.isNull(res['resultInfo']['quotation'])) {
                this.stockHQ = Object.assign(res['resultInfo']['quotation']);
                this.fullcount = data.uncloseCnt;
                this.appointPrice = Math.round(parseFloat(this.stockHQ.lastPrice) * 100) / 100;
            } else {
                this.stockHQ = this.data.stockHQ;
            }
        }, (err) => {
            this.data.error = err.error;
            this.data.isError();
        });
    }

    /**
     * 买入
     */
    buy() {
        if (this.data.Decimal(this.appointPrice) > 2) {
            this.data.ErrorMsg('委托价格不能超过两位位小数');
        } else if (this.data.isNull(this.appointPrice)) {
            this.data.ErrorMsg('委托价格不能为空');
        } else if (parseInt(this.appointCnt, 0) !== this.appointCnt) {
            this.data.ErrorMsg('平仓数量必须是整数');
        } else if (this.appointCnt > this.fullcount) {
            this.data.ErrorMsg('平仓数量必须小于待平数');
        } else if (this.appointCnt <= 0) {
            this.data.ErrorMsg('平仓数量必须大于0');
        } else {
            this.submintBuy();
        }

    }
    /**
       * 买入确认
       */
    submintBuy() {

    }

    /**
       * 连接ws
       */
    connect() {
        const that = this;
        // this.cancelSubscribe();
        const socket = new SockJS(this.http.ws);
        const headers = { token: this.data.getToken() };
        this.stompClient = over(socket);
        this.connectStatus = true;
        this.stompClient.connect(headers, () => {
            // console.log('Connected: ' + frame);
            that.stompClient.subscribe('/user/' + that.data.getToken() + '/topic/market', res => {
                that.stockHQ = Object.assign(JSON.parse(res.body));
            });
            this.socketInterval = setInterval(() => {
                that.stompClient.send(' ');
            }, 60000);
        }, err => {
            console.log('err', err);
        });
    }
    /**
  * 选择买入量
  */
    selectCount(text) {
        if (this.fullcount !== '--') {
            this.ccount = text;
            switch (text) {
                case 'full':
                    // 选择全仓的时候，判断是否是买入，买入的话，全仓数量按照正常规则。卖出的话，全仓数量为可卖数量
                    if (this.classType === 'BUY') {
                        this.appointCnt = this.data.roundDown(this.fullcount);
                    } else {
                        this.appointCnt = this.fullcount;
                    }

                    break;
                case 'half':
                    this.appointCnt = this.data.roundDown(this.fullcount / 2);
                    break;
                case '1/3full':
                    this.appointCnt = this.data.roundDown(this.fullcount / 3);
                    break;
                case '1/4full':
                    this.appointCnt = this.data.roundDown(this.fullcount / 4);
                    break;
            }
        }

    }

    /**
       * 增加减少买入价
       */
    count(type) {
        if (!this.data.isNull(this.appointPrice)) {
            if (type === -1 && this.appointPrice > 0 && this.appointPrice > this.stockHQ.priceDownlimit) {
                this.appointPrice = this.appointPrice - 0.01;
            } else if (type === 1 && this.appointPrice < this.stockHQ.priceUplimit) {
                this.appointPrice = this.appointPrice + 0.01;
            }
            this.appointPrice = parseFloat(this.appointPrice.toFixed(4));
        }
    }


    /**
    * 选取价格
    */
    selectPrice(price) {
        this.appointPrice = parseFloat(price);
    }
}
