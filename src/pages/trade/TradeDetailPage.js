import React, {Component} from 'react';
import {NavigationPage,NavigationBar,Label} from 'teaset';
import {FlatList, View, ScrollView, Image, DeviceEventEmitter} from 'react-native';
import NavigationIconButton from '../../comm/views/NavigationIconButton';
import {FONT_M, FONT_R, FONT_S} from '../../comm/Fonts';
import {screenH, screenW, statusBarHeight} from '../../comm/Unitl';
import {appState, collisionLog} from '../../comm/sdk';
import ByronKlineChart , {
    dispatchByronKline,
    KLineIndicator,
    CandleHollow,
} from 'react-native-kline';
import TradeRecordeItem from './TradeRecordeItem';
import Carousel from 'teaset/components/Carousel/Carousel';
import SegmentedBar from 'teaset/components/SegmentedBar/SegmentedBar';
import TradeRecorde from './TradeRecorde';
import PropTypes from 'prop-types';
import BasePage from 'teaset/components/BasePage/BasePage';
import {TradeDetailPageItem, TradeDetailPageItem1} from './TradeDetailPageItem';
//import Chart from './Chart';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import TradeRecordePage from './TradeRecordePage';
import {WebSocketClient} from '../../comm/webSocket/WebSocketClient';
import moment from 'moment';
import {isIos} from 'react-native-calendars/src/expandableCalendar/commons';
import DotLineChart from './DotLineChart';

export default class TradeDetailPage extends NavigationPage {

    static propTypes ={
        callBackAction:PropTypes.func,
        buyAction:PropTypes.func,
        sellAction:PropTypes.func,
        assetData:PropTypes.object,
        tradePair:PropTypes.object
    }

    static defaultProps={
        ...NavigationPage.defaultProps,
        buyAction:()=>{},
        sellAction:()=>{},
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
        tradePair:{
            pairId: 1,
            name: "",
            sort: 1,
            pricePrecision: 4,
            amountPrecision: 4,
            baseId: 1,
            hot: null
        },
    }

    constructor(props){
        super(props);

        this.state={
            activeIndex: 0,

            kdatas:[],
            kRealdatas:[],

            matchData:[],
            orderList:[]

        }
        this.barCustomItems = [
            1+appState.lan.trade.title17,
            15+appState.lan.trade.title17,
            1+appState.lan.trade.title18,
            1+appState.lan.trade.title19,
        ];
    }

    renderNavigationBar(): * {
        return  <NavigationBar
            title={<View><Label style={{fontFamily:FONT_S,color:'#fff',fontSize:18}}>{this.props.tradePair.name}</Label></View>}
            statusBarStyle={'light-content'}
            navigationBarInsets={true}
            background={<View style={{flex:1,backgroundColor:'#161F2F'}}/>}
            style={{paddingLeft:16}}
            leftView={<NavigationIconButton
                icon={require('../../assert/home/index_ico_arrow_left.png')}
                imageStyle={{width:20,height:20}}
                onPress={()=>{this.navigator.pop()}}
            />}
        >

        </NavigationBar>
    }



    componentDidMount() {
        super.componentDidMount();

        DeviceEventEmitter.addListener('pushEmitter2', (data)=>{

            this.setState({
                matchData:data.data.match,
            })

            //console.log(data)
        })


        DeviceEventEmitter.addListener('pushEmitter7', (data)=>{


            // amount: 0
            // close: 326.056
            // high: 326.056
            // klineId: 1
            // klineName: "ETH/USDT"
            // low: 326.056
            // open: 326.056
            // resolution: 2
            // time: 1602911700000
            // volume: 0

            // amount: 163621.35812038  //组件使用
            // close: 11370.5
            // count: 14.388581
            // high: 11376.06
            // id:   1602987300
            // low: 11369.61
            // open: 11373.43
            // vol: 14.388581

            let priceData = data.data.map((e) => {
                return{
                    amount: e.amount,
                    close: e.close,
                    count: e.volume,
                    high: e.high,
                    id: e.time/1000,
                    low: e.low,
                    open: e.open,
                    vol: e.volume
                }})
            this.setState({kdatas:priceData,kRealdatas:priceData})
        })


        DeviceEventEmitter.addListener('pushEmitter8', (data)=>{

            let priceData = data.data.map((e) => {
                return{
                    amount: e.amount,
                    close: e.close,
                    count: e.volume,
                    high: e.high,
                    id: e.time/1000,
                    low: e.low,
                    open: e.open,
                    vol: e.volume
                }})

            dispatchByronKline('update', priceData);
        })

        DeviceEventEmitter.addListener('pushEmitter9', (data)=>{

            let priceData = data.data.map((e) => {
                return{
                    amount: e.amount,
                    close: e.close,
                    count: e.volume,
                    high: e.high,
                    id: e.time/1000,
                    low: e.low,
                    open: e.open,
                    vol: e.volume
                }})


            let kdata = this.state.kdatas
            if (this.state.kdatas && this.state.kdatas.length>0){
                kdata = priceData.concat(this.state.kdatas)
            }
            this.setState({kRealdatas:kdata})
            dispatchByronKline('add', priceData);
        })

        let time1 = parseInt(new Date().valueOf()/1000)
        WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":7,"type":3,"param":{"resolution":"1","klineId":1,"type":2,"limit":1000,"endTime":time1}}))
        WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":7,"type":2,"param":{"resolution":"1","klineId":1,"type":2,"limit":1000,"endTime":time1}}))

    }


    componentWillUnmount() {

        DeviceEventEmitter.removeListener('pushEmitter2')
        DeviceEventEmitter.removeListener('pushEmitter7')
        DeviceEventEmitter.removeListener('pushEmitter8')
        DeviceEventEmitter.removeListener('pushEmitter9')

    }


    onMoreKLineData = async (params) => {

       // let  time1 =(new Date().valueOf()/1000)
       //  if (this.state.kRealdatas && this.state.kRealdatas.length>0){
       //      time1 = this.state.kRealdatas[0].id
       //  }
       //  WebSocketClient.getInstance().isRequestHistory = true
       //      switch (this.state.activeIndex){
       //          case 0:
       //              WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":7,"type":3,"param":{"resolution":"1","klineId":1,"type":2,"limit":1000,"endTime":time1}}))
       //              WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":7,"type":2,"param":{"resolution":"1","klineId":1,"type":2,"limit":1000,"endTime":time1}}))
       //
       //              break
       //          case 1:
       //              WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":7,"type":3,"param":{"resolution":"15","klineId":1,"type":2,"limit":1000,"endTime":time1}}))
       //              WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":7,"type":2,"param":{"resolution":"15","klineId":1,"type":2,"limit":1000,"endTime":time1}}))
       //
       //              break
       //          case 2:
       //              WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":7,"type":3,"param":{"resolution":"60","klineId":1,"type":2,"limit":1000,"endTime":time1}}))
       //              WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":7,"type":2,"param":{"resolution":"60","klineId":1,"type":2,"limit":1000,"endTime":time1}}))
       //
       //              break
       //          case 3:
       //              WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":7,"type":3,"param":{"resolution":"1D","klineId":1,"type":2,"limit":1000,"endTime":time1}}))
       //              WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":7,"type":2,"param":{"resolution":"1D","klineId":1,"type":2,"limit":1000,"endTime":time1}}))
       //
       //              break
       //          default:
       //              break
       //
       //      }

    }


    onSegmentedBarChange(index) {
        //this.chart.tabSelected(index)
        let time1 = parseInt(new Date().valueOf()/1000)
        if (index != this.state.activeIndex) {
            switch (index){
                case 0:
                    WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":7,"type":3,"param":{"resolution":"1","klineId":1,"type":2,"limit":1000,"endTime":time1}}))
                    WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":7,"type":2,"param":{"resolution":"1","klineId":1,"type":2,"limit":1000,"endTime":time1}}))

                    break
                case 1:
                    WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":7,"type":3,"param":{"resolution":"15","klineId":1,"type":2,"limit":1000,"endTime":time1}}))
                    WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":7,"type":2,"param":{"resolution":"15","klineId":1,"type":2,"limit":1000,"endTime":time1}}))

                    break
                case 2:
                    WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":7,"type":3,"param":{"resolution":"60","klineId":1,"type":2,"limit":1000,"endTime":time1}}))
                    WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":7,"type":2,"param":{"resolution":"60","klineId":1,"type":2,"limit":1000,"endTime":time1}}))

                    break
                case 3:
                    WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":7,"type":3,"param":{"resolution":"1D","klineId":1,"type":2,"limit":1000,"endTime":time1}}))
                    WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":7,"type":2,"param":{"resolution":"1D","klineId":1,"type":2,"limit":1000,"endTime":time1}}))

                    break
                default:
                    break

            }
            this.setState({activeIndex: index});
            if (this.refs.carousel) {
                this.refs.carousel.scrollToPage(index, false);
            }
        }
    }

    onCarouselChange(index) {
        index != this.state.activeIndex && this.setState({activeIndex: index});
    }



    renderCustomItems() {

        let {activeIndex} = this.state;
        return this.barCustomItems.map((item, index) => {
            let isActive = index == activeIndex;
            let tintColor = isActive ? '#3463FF' : '#CCCCCC';
            return (
                <View key={index} style={{paddingBottom:8,width:isActive?112:90, alignItems:'center'}}>

                    <Label style={{color: tintColor, paddingTop: 4,fontSize:12}} text={item} />
                </View>
            );
        });
    }


    renderPage(){

        let itemWidth = (screenW-32)/4
        return <View style={{width:screenW,height:isIos?screenH-statusBarHeight-44:screenH-statusBarHeight-20,backgroundColor:'#161F2F'}}>
           <ScrollView>
               <View>
                   <TradeDetailPageItem/>
                   <SegmentedBar
                       justifyItem={'fixed'}
                       indicatorType={'customWidth'}
                       indicatorPosition={'bottom'}
                       style={{backgroundColor:'#161F2F',width:screenW,height:36,justifyContent:'space-between'}}
                       indicatorLineColor={'#3463FF'}
                       indicatorLineWidth={2}
                       indicatorWidth={40}
                       indicatorPositionPadding={0}
                       animated={true}
                       autoScroll={true}
                       activeIndex={this.state.activeIndex}
                       onChange={index => this.onSegmentedBarChange(index)}
                   >
                       {this.renderCustomItems()}
                   </SegmentedBar>
                   {/*<Chart ref={(c)=>{this.chart =c}}/>*/}
                   <ByronKlineChart
                       style={{height:368,backgroundColor:'#0D1627'}}
                       datas={this.state.kdatas}
                       onMoreKLineData={this.onMoreKLineData.bind(this)}
                       pricePrecision={0.0001}
                       indicators={[KLineIndicator.TimeLineShow, KLineIndicator.VolumeShow]}
                       // limitTextColor={'#FF2D55'}
                        mainBackgroundColor={'#0D1627'}
                       // candleHollow={CandleHollow.ALL_HOLLOW}
                   />
                   {/*<DotLineChart/>*/}
                   <View style={{width:screenW,height:20,backgroundColor:'#111214'}}/>
                   <View>
                       <View style={{flexDirection:'row',justifyContent:'space-between',
                           paddingLeft:16,paddingRight:16,backgroundColor:'#161F2F',
                           width:screenW,height:42,marginBottom:5,alignItems:'center',borderBottomWidth:1,borderBottomColor:'#ffffff30'}}>
                           <Label style={{color:'#fff',fontSize:18,fontFamily:FONT_M}}>{appState.lan.trade.title24}</Label>
                           <TouchableOpacity onPress={()=>{
                               this.navigator.push({view:<TradeRecordePage type={1}/>})
                           }}>
                               <View style={{flexDirection:'row',alignItems:'center'}}>
                                   <Image style={{width:17,height:17}} resizeMode={'contain'} source={require('../../assert/trade/oreder_recode.png')}/>
                                   <Label style={{color:'#CCCCCC',fontSize:15,fontFamily:FONT_M,marginLeft:2}}>{appState.lan.trade.title8}</Label>
                               </View>
                           </TouchableOpacity>
                       </View>
                       <View style={{height:26,paddingLeft:16,paddingRight:16,width:screenW,
                           justifyContent:'space-between',
                           flexDirection:'row',alignItems:'center'}}>
                           <Label style={{color:'#CCCCCC',fontSize:10,fontFamily:FONT_R,width:itemWidth}}>{appState.lan.trade.title25}</Label>
                           <Label style={{color:'#CCCCCC',fontSize:10,fontFamily:FONT_R,width:itemWidth,textAlign:'center'}}>{appState.lan.trade.title26}</Label>
                           <Label style={{color:'#CCCCCC',fontSize:10,fontFamily:FONT_R,width:itemWidth,textAlign:'center'}}>{appState.lan.trade.title27}</Label>
                           <Label style={{color:'#CCCCCC',fontSize:10,fontFamily:FONT_R,width:itemWidth,textAlign:'right'}}>{appState.lan.trade.title28}</Label>

                       </View>
                       <View>
                           { this.state.matchData && this.state.matchData.map((item,index)=>{


                               return <TradeDetailPageItem1 item={item}/>

                           })}
                       </View>
                   </View>

               </View>

           </ScrollView>

            <View style={{height:66,width:screenW,backgroundColor:'#161F2F',flexDirection:'row',
                paddingLeft:16,paddingRight:16,
                alignItems:'center',justifyContent:'space-between',borderTopWidth:1,borderTopColor:'#ffffff30'}}>

                <TouchableOpacity style={{width:158,height:49,alignItems:'center',
                    borderRadius:5,
                    justifyContent:'center',backgroundColor:'#2DB58C' }}
                                  onPress={()=>{
                                      this.props.buyAction()
                                      this.navigator.pop()
                                  }}
                >
                   <Label style={{color:'#FFFFFF',fontSize:18}}>{appState.lan.trade.title3}</Label>

                </TouchableOpacity>

                <TouchableOpacity style={{width:158,height:49,alignItems:'center',
                    borderRadius:5,
                    justifyContent:'center',backgroundColor:'#E74E61'}}
                                  onPress={()=>{
                                      this.props.sellAction()
                                      this.navigator.pop()

                                  }}
                >
                    <Label style={{color:'#FFFFFF',fontSize:18}}>{appState.lan.trade.title4}</Label>

                </TouchableOpacity>

            </View>
        </View>
    }


}
