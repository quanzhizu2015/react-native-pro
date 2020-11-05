import {
    DeviceEventEmitter
} from 'react-native';
import {action, observable} from 'mobx';
import {cn} from '../../lan/cn';
const url = 'ws://47.98.132.177:8888/api/websocket';
let that = null;


class websocketData {
    @observable loaded = false;


    @action setState(state) {
        // console.log('setState = ', state);
        for (let k in state) {
            this[k] = state[k]
        }
    }
}

const websocketDataState = new websocketData();

class WebSocketClient {
    constructor() {
        this.ws = null;
        that = this;
        that.firstKdata={}
        that.lastTime={}
        that.isRequestHistory=false


    }



    /**
     * 获取WebSocket单例
     * @returns {WebSocketClient}
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new WebSocketClient();
        }
        return this.instance;
    }

    /**
     * 初始化WebSocket
     */
    initWebSocket() {
        try {
            //timer为发送心跳的计时器
            this.timer && clearInterval(this.timer);
            this.ws = new WebSocket(url);
            this.initWsEvent();
        } catch (e) {
            console.log('WebSocket err:', e);
            //重连
            this.reconnect();
        }
    }

    /**
     * 初始化WebSocket相关事件
     */
    initWsEvent() {
        //建立WebSocket连接
        this.ws.onopen = function () {
            console.log('WebSocket:', 'connect to server');
        };

        //客户端接收服务端数据时触发
        this.ws.onmessage = function (evt) {

            // 正常数据
            let data = JSON.parse(evt.data)
            if (data.data !== 'pong') {
                //不是心跳消息，消息处理逻辑
                //console.log('WebSocket: response msg', evt.data);
                //接收到消息，处理逻辑...
                if (data.reqType) {
                    // reqType 4 24小时 2 成交 5委托 6钱包
                    switch (data.reqType){
                        case 4:
                            //console.log('4:'+data)
                            DeviceEventEmitter.emit('pushEmitter4', data);
                            break
                        case 2:
                            //console.log('2:'+data)
                            DeviceEventEmitter.emit('pushEmitter2', data);
                            break
                        case 1200:
                            DeviceEventEmitter.emit('pushEmitter1200', data);
                            break
                        case 1201:
                            DeviceEventEmitter.emit('pushEmitter1201', data);
                            break
                        case 1202:
                            DeviceEventEmitter.emit('pushEmitter1202', data);
                            break
                        default:
                            break
                    }
                    return true
                } else {
                    const { type } = data
                    if (type === 1) { //委托
                        // 对行情24小时表格进行特殊处理
                        DeviceEventEmitter.emit('pushEmitter1', data);
                    } else if (type === 7) { //k 线
                        // let firstHisFlag = data['firstHisFlag']
                        // let firstHisF =  data.firstHisFlag

                        if (!data || !data.data) return false
                        if (data['firstHisFlag'] == 'true' && data['noData'] == 'true') return false
                        if (data.data.length === 0) return false

                        if (data['firstHisFlag'] && data['firstHisFlag'] == 'true' && data.data && data.data.length>0 && !that.isRequestHistory){
                            that.firstKdata = data
                            that.lastTime = data.data[data.data.length-1].time
                            DeviceEventEmitter.emit('pushEmitter7', Object.assign({},data));
                            return true
                        }else if (data.data && data.data.length ==1) {
                            let barsData = data.data[0]
                            if (barsData.time > that.lastTime && that.firstKdata.data && that.firstKdata.data.length) {
                                that.firstKdata.data.push(barsData)
                                that.lastTime = barsData.time
                            } else if(barsData.time === that.lastTime &&that.firstKdata.data && that.firstKdata.data.length){
                                that.firstKdata.data[that.firstKdata.data.length - 1] = barsData
                            }
                            DeviceEventEmitter.emit('pushEmitter7', Object.assign({},that.firstKdata));
                            //DeviceEventEmitter.emit('pushEmitter8', Object.assign({},data));
                            return true

                        }else if (data['firstHisFlag'] && data['firstHisFlag'] == 'true' && data.data && data.data.length>0 && that.isRequestHistory){

                            let dataOld = data.data.concat(that.firstKdata.data)
                            that.firstKdata.data = dataOld


                            DeviceEventEmitter.emit('pushEmitter9', Object.assign({},data));
                            that.isRequestHistory = false
                            return true
                        }



                    } else if (type === 4) { //24小时
                        //console.log('4:'+data)
                        DeviceEventEmitter.emit('pushEmitter4', data);
                        return true
                    }
                }

            } else {
                console.log('WebSocket: response pong msg=', evt.data);
            }
        };
        //连接错误
        this.ws.onerror = function (err) {
            console.log('WebSocket:', 'connect to server error');
            //重连
            that.reconnect();
        };
        //连接关闭
        this.ws.onclose = function () {
            console.log('WebSocket:', 'connect close');
            //重连
            that.reconnect();
        };

        //每隔15s向服务器发送一次心跳
        this.timer = setInterval(() => {
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                console.log('WebSocket:', 'ping');
                this.ws.send('ping');
            }
        }, 15000);
    }

    //发送消息
    sendMessage(msg) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            try {
                this.ws.send(msg);
            } catch (err) {
                console.warn('ws sendMessage', err.message);
            }
        } else {
            console.log('WebSocket:', 'connect not open to send message');
        }
    }

    //重连
    reconnect() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout( () =>{
            //重新连接WebSocket
            this.initWebSocket();
        }, 15000);
    }

    destroy(){

        this.timer && clearInterval(this.timer);
        this.ws.close()
        this.timer = null
        this.ws = null
        this.instance = null

    }




}


export {websocketDataState,WebSocketClient}
