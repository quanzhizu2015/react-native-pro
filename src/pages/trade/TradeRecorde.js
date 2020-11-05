import React, {Component} from 'react';

import {DeviceEventEmitter, FlatList, View} from 'react-native';

import {screenH, screenW, statusBarHeight} from '../../comm/Unitl';
import {appState, collisionLog, tradePairAll} from '../../comm/sdk';

import {TradeRecordeItem,TradeRecordeItem2} from './TradeRecordeItem';
import PropTypes from 'prop-types';
import {WebSocketClient} from '../../comm/webSocket/WebSocketClient';
import Toast from 'teaset/components/Toast/Toast';

export default class TradeRecorde extends Component {

    static propTypes ={
        callBackAction:PropTypes.func,
        type:PropTypes.number, // 1全部委托  2 历史记录 3 成交明细
    }

    static defaultProps={
        callBackAction:()=>{},
        type:1
    }

    constructor(props){
        super(props);
        this.state={
            refreshing: false,
            current_page:1,
            last_page:1,
            tradePair:{
                pairId: 1,
                name: "",
                sort: 1,
                pricePrecision: 4,
                amountPrecision: 4,
                baseId: 1,
                hot: null
            },
            list:[]
        }
    }


    tradePair(){
        tradePairAll().then((respond)=>{
            if (respond.code==0){

                if (respond.data!= null && respond.data.length>0){

                    let tradePair = {
                        pairId: 1,
                        name: "",
                        sort: 1,
                        pricePrecision: 4,
                        amountPrecision: 4,
                        baseId: 1,
                        hot: null
                    }
                    if (respond.data && respond.data.length>0){
                        tradePair = respond.data[0]
                    }
                    this.setState({
                        tradePair:tradePair
                    })


                    WebSocketClient.getInstance().sendMessage(JSON.stringify(
                        {"id":1,"param":{"pageSize":20,"pageNo":1,"assetId":1,"status":"8,9","type":1,"pairId":this.state.tradePair.pairId,"tab":1},"reqType":1200,"handleType":1,"type":1,"token":appState.trade_token}))

                }

            }else{
                Toast.show({
                    text:respond.msg,
                    position: 'center',
                })

            }
        })
    }



    componentDidMount() {

        this.tradePair()
        // this.assetcapital()
        // this.history()

        if (this.props.type == 1){
            DeviceEventEmitter.addListener('pushEmitter1200', (data)=>{

                this.setState({
                    list:data.data.item
                })

                console.log(data)

            })
        }else if (this.props.type == 2){
            DeviceEventEmitter.addListener('pushEmitter1202', (data)=>{

                this.setState({
                    list:data.data.item
                })

                console.log(data)

            })
        }


        if (this.props.type == 1){
            this.tradePair()
        }else if(this.props.type == 2){

            WebSocketClient.getInstance().sendMessage(JSON.stringify(
                {"param":{"pageSize":20,"pageNo":1,"startTime":"","endTime":"","type":1,"tab":2},"reqType":1202,"handleType":1,"type":1,"token":appState.trade_token}

            ))

        }



    }

    componentWillUnmount() {

        if (this.props.type== 1){
            DeviceEventEmitter.removeListener('pushEmitter1200')
        }else if (this.props.type== 2){
            DeviceEventEmitter.removeListener('pushEmitter1202')
        }



    }

    _keyExtractor = (item, index) => index.toString();

    renderItem({item, index}) {

        if (this.props.type==1){
            return <TradeRecordeItem item={item}/>
        }else if (this.props.type==2){
            return <TradeRecordeItem2 item={item}/>
        }else {
            return  <View/>
        }

    }


    render(){
        return <View style={{width:screenW,height:screenH-statusBarHeight-44-65,marginTop:10,backgroundColor:'#111214'}}>
            <FlatList
                data={this.state.list}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={(data)=>this.renderItem(data)}

                //onScroll={this.props.onScroll}
                onRefresh={()=>{
                    if (this.props.type == 1){
                        this.tradePair()
                    }else if(this.props.type == 2){

                        WebSocketClient.getInstance().sendMessage(JSON.stringify(
                            {"param":{"pageSize":20,"pageNo":1,"startTime":"","endTime":"","type":1,"tab":2},"reqType":1202,"handleType":1,"type":1,"token":appState.trade_token}

                        ))

                    }

                }}
                // onEndReached={()=>{
                //
                //
                // }}
                onEndReachedThreshold={0.2}
                refreshing={this.state.refreshing}/>
        </View>
    }


}
