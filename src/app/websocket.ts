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
                this.stockHQ = res['resultInfo']['quotation'];
                if (this.stockName.includes('ST')) {
                    this.stockHQ.lowPrice = Math.round(this.stockHQ.preClosePrice * 95) / 100;
                    this.stockHQ.highPrice = Math.round(this.stockHQ.preClosePrice * 105) / 100;
                } else {
                    this.stockHQ.lowPrice = Math.round(this.stockHQ.preClosePrice * 90) / 100;
                    this.stockHQ.highPrice = Math.round(this.stockHQ.preClosePrice * 110) / 100;
                }
                this.fullcount = res['resultInfo']['maxAppointCnt'];
                this.appointPrice = Math.round(parseFloat(this.stockHQ.lastPrice) * 100) / 100;
            } else {
                this.stockHQ = this.data.stockHQ;
            }
            this.connect();
        }, (err) => {
            this.data.error = err.error;
            this.data.isError();
        });
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
                that.stockHQ = JSON.parse(res.body);
                if (that.stockName.includes('ST')) {
                    that.stockHQ.lowPrice = Math.round(that.stockHQ.preClosePrice * 95) / 100;
                    that.stockHQ.highPrice = Math.round(that.stockHQ.preClosePrice * 105) / 100;
                } else {
                    that.stockHQ.lowPrice = Math.round(that.stockHQ.preClosePrice * 90) / 100;
                    that.stockHQ.highPrice = Math.round(that.stockHQ.preClosePrice * 110) / 100;
                }
            });
            this.socketInterval = setInterval(() => {
                that.stompClient.send(' ');
            }, 60000);
        }, err => {
            console.log('err', err);
        });
    }
}
