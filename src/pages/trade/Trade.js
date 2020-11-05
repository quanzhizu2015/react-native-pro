import React, {Component} from 'react';
import {NavigationPage} from 'teaset';
import {Image, StatusBar, View,ScrollView,ImageBackground,RefreshControl,DeviceEventEmitter} from 'react-native';
import {safeAreaViewHeight, screenH, screenW, statusBarHeight} from '../../comm/Unitl';
import Label from 'teaset/components/Label/Label';
import {appState, assetCapital, tradePairAll, tradeSpotHistory} from '../../comm/sdk';
import {screenHeight} from 'react-native-calendars/src/expandableCalendar/commons';
import {FONT_M, FONT_R, FONT_S} from '../../comm/Fonts';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import InvitePage from '../mine/InvitePage';
import {SellBuyItem, SellBuyItem2} from './SellBuyItem';
import OrderItem from './OrderItem';
import TradeRecordePage from './TradeRecordePage';
import TradeDetailPage from './TradeDetailPage';
import Toast from 'teaset/components/Toast/Toast';
import {WebSocketClient} from '../../comm/webSocket/WebSocketClient';
import moment from 'moment';



export default class Trade extends NavigationPage {

    constructor(props){
        super(props);
        this.state={
            isRefreshing:false,

            tradePair:{
                pairId: 1,
                name: "",
                sort: 1,
                pricePrecision: 4,
                amountPrecision: 4,
                baseId: 1,
                hot: null
            },
            assetData:{
                amount: "0.00",
                assetId: 12,
                assetName: "ETH",
                coinIconUrl: "https://img.fota.com/group1/M00/00/01/Ch8Ci1vzkUGAK3CGAAAH9OKlB94942.png",
                lockAccountAmount: "0.00",
                lockedAmount: "1.60",
                minWithdrawAmount: "0.0051",
                minWithdrawPrecision: 4,
                totalAmount: "78.05",
                usdtMinWithdrawFee: "0.005",
                usdtMinWithdrawProportion: "0.0005",
                valuation: "78.05000000"
            },
            orderList:[]
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


    assetcapital(){

        assetCapital().then((respond)=>{

            if (respond.code==0){
                if (respond.data.item!= null && respond.data.item.length>0){
                    this.setState({
                        assetData:respond.data.item[0]
                    })
                }

            }else {
                Toast.show({
                    text:respond.msg,
                    position: 'center',
                })
            }

        })

    }

    history(){

        this.setState({isRefreshing:true})

        //status   3 部分撤单 4 已撤单 8 未成交  9 部分成交 10 已成交
        tradeSpotHistory({status:'8'}).then((respond)=>{
            this.setState({isRefreshing:false})

            if (respond.code==0){
                if (respond.data.data!= null && respond.data.data.length>0){
                    this.setState({
                        orderList:respond.data.data
                    })
                }

            }else {
                Toast.show({
                    text:respond.msg,
                    position: 'center',
                })
            }


        })
    }

    componentDidMount() {
        super.componentDidMount();
        this.tradePair()
        // this.assetcapital()
        // this.history()


        DeviceEventEmitter.addListener('pushEmitter1200', (data)=>{

            this.setState({
                orderList:data.data.item
            })

            console.log(data)

        })



        WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":4,"type":1,"id":1}))
        WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":2,"type":1,"id":1}))
        WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":1,"type":1,"id":1,"param":"4"}))
        WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":1201,"handleType":1,"type":1,"token":appState.trade_token} ))

    }

    componentWillUnmount() {
        super.componentWillUnmount();
        DeviceEventEmitter.removeListener('pushEmitter1200')


    }


    render(){
        return <View style={{flex:1,backgroundColor:'#111214'}}>
            <StatusBar barStyle={'light-content'} />
            <View style={{height:statusBarHeight+safeAreaViewHeight,backgroundColor:'#2A2A2A'}}/>
            <View style={{height:44,width:screenW,flexDirection:'row',paddingLeft:25,paddingRight:25,
                alignItems:'center',justifyContent:'space-between',backgroundColor:'#2A2A2A'}}>
                <View>
                    <Label style={{fontFamily:FONT_S,color:'#fff',fontSize:18}}>{this.state.tradePair.name}</Label>
                </View>

                <TouchableOpacity onPress={()=>{
                    this.navigator.push({view:<TradeDetailPage
                            buyAction={()=>{

                                this.buyItem.changeStatus(1)
                            }}
                            sellAction={()=>{
                                this.buyItem.changeStatus(0)

                            }}
                            tradePair={this.state.tradePair}
                        />})
                }}>
                    <Image style={{width:20,height:20}} source={require('../../assert/trade/k_image.png')}/>
                </TouchableOpacity>

            </View>
            <View styled={{flex:1}}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={()=>{
                               this.tradePair()
                                //this.history()
                            }}
                        />}
                >
                    <View style={{paddingTop:15,paddingBottom:15,width:screenW}}>
                       <View style={{flexDirection:'row'}}>
                           <SellBuyItem ref={(c)=>{this.buyItem=c}} />
                           <SellBuyItem2/>
                       </View>
                        <View style={{height:5,width:screenW,backgroundColor:'#2F2F2F50'}}/>
                        <View style={{flexDirection:'row',justifyContent:'space-between',
                            paddingLeft:16,paddingRight:16,
                            width:screenW,height:42,marginBottom:5,alignItems:'center'}}>
                            <Label style={{color:'#fff',fontSize:18,fontFamily:FONT_M}}>{appState.lan.trade.title7}</Label>
                            <TouchableOpacity onPress={()=>{
                                this.navigator.push({view:<TradeRecordePage type={1}/>})
                            }}>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Image style={{width:17,height:17}} resizeMode={'contain'} source={require('../../assert/trade/oreder_recode.png')}/>
                                    <Label style={{color:'#CCCCCC',fontSize:15,fontFamily:FONT_M,marginLeft:2}}>{appState.lan.trade.title8}</Label>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {
                            (this.state.orderList&&this.state.orderList.length==0)?
                                <View style={{alignItems:'center'}}>
                                    <Image style={{width:135,height:135}} source={require('../../assert/trade/noOrder.png')}/>
                                    <Label style={{marginTop:15,color:'#666666',fontFamily:FONT_R}}>{appState.lan.trade.title9}</Label>

                                </View>:
                                <View style={{alignItems:'center'}}>
                                    {
                                        this.state.orderList.map((item,index)=>{
                                            return <OrderItem item={item} isShowTopLine={index==0?true:false}/>
                                        })
                                    }

                                </View>
                        }


                    </View>
                    <View style={{height:50}}/>
                </ScrollView>

            </View>


        </View>
    }

}
