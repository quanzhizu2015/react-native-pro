import React,{Component} from 'react'
import {View, ImageBackground, DeviceEventEmitter, ScrollView} from 'react-native';
import {screenH, screenW} from '../../comm/Unitl';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import Label from 'teaset/components/Label/Label';
import {appState, assetCapital, tradeUsdkOrder, verifyTradePassword} from '../../comm/sdk';
import {FONT_M, FONT_R, FONT_S} from '../../comm/Fonts';
import PropTypes from 'prop-types';
import {Input, NavigationPage, Overlay} from 'teaset';
import Toast from 'teaset/components/Toast/Toast';
import {pwdSecurity} from '../../comm/webSocket/UnitTool';
import LinearGradient from "react-native-linear-gradient";
import {WebSocketClient} from '../../comm/webSocket/WebSocketClient';
let Spinner = require('react-native-spinkit');
class SellBuyItem1 extends Component{

    static propTypes ={
        callbackAction:PropTypes.func,
    }

    static defaultProps={

        callbackAction:()=>{}

    }

    constructor(props) {
        super(props);
        this.state={
            isBuy:1
        }

    }

    changeStatus(status){
        this.setState({
            isBuy:status
        })

    }


    render() {

        let itemWidth = (screenW/2.0-23)
        return <View style={{width:(screenW/2.0-23),height:42,paddingLeft:0,paddingRight:7,flexDirection:'row'}}>
           <TouchableOpacity onPress={()=>{
               this.setState({isBuy:1})
               this.props.callbackAction(1)
           }}>
               <ImageBackground style={{width:itemWidth/2.0,height:42,alignItems:'center',justifyContent:'center'}}
                                resizeMode= 'contain'
                                source={this.state.isBuy?require('../../assert/trade/buy_selected.png'):require('../../assert/trade/buy_nor.png')}>
                   <Label style={{fontSize:17,fontFamily:FONT_M,color:'#fff'}}>{appState.lan.trade.title3}</Label>
               </ImageBackground>
           </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                this.setState({isBuy:0})
                this.props.callbackAction(0)
            }}>
                <ImageBackground style={{width:itemWidth/2.0,height:42,alignItems:'center',justifyContent:'center'}}
                                 resizeMode= 'contain'
                                 source={this.state.isBuy?require('../../assert/trade/sell_nor.png'):require('../../assert/trade/sell_selected.png')}>
                    <Label style={{fontSize:17,fontFamily:FONT_M,color:'#fff'}}>{appState.lan.trade.title4}</Label>
                </ImageBackground>
            </TouchableOpacity>

        </View>
    }

}

class SellBuyItem2 extends Component{

    static propTypes ={
        callbackAction:PropTypes.func,
    }

    static defaultProps={

        callbackAction:()=>{}

    }

    constructor(props) {
        super(props);
        this.state={
            isBuy:1,
            cnyRate:0.00,
            data:{
                asks:[],
                bids:[]
            },
            asks:[],
            bids:[],
            price:'22.86 CNY',
            item:{
                amount: "2.0336",
                matchType: 2,
                pairName: "ETH/USDT",
                price: "0.00",
                ts: 1603164493770
            }


        }



    }



    componentDidMount() {

        DeviceEventEmitter.addListener('pushEmitter1', (data)=>{

            this.setState({
                data:data.data.entrust,
                asks:data.data.entrust.asks,
                bids:data.data.entrust.bids,
            })

            //console.log(data)
        })



        DeviceEventEmitter.addListener('pushEmitter2', (data)=>{


            let item = {
                amount: "2.0336",
                matchType: 2,
                pairName: "ETH/USDT",
                price: "0.00",
                ts: 1603164493770
            }
            if (data.data.match && data.data.match.length>0){
                item = data.data.match[0]
            }

            let cnyRate = 0.00
            if(data.data.cnyRate){
                cnyRate = data.data.cnyRate

            }
            this.setState({
                cnyRate:cnyRate,
                item:item
            })

            //console.log(data)
        })

    }


    componentWillUnmount() {

        DeviceEventEmitter.removeListener('pushEmitter1')
        DeviceEventEmitter.removeListener('pushEmitter2')

    }


    render() {

        let itemWidth = (screenW/2.0-23)
        return <View style={{width:screenW/2.0,height:42,paddingLeft:7,paddingRight:16}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',width:itemWidth,height:42,marginBottom:5}}>
                <Label style={{color:'#DDDDDD',fontSize:13,fontFamily:FONT_M}}>{appState.lan.trade.title6}</Label>
                <Label style={{color:'#DDDDDD',fontSize:13,fontFamily:FONT_M}}>{appState.lan.trade.title5}</Label>
            </View>

            {
                this.state.asks && this.state.asks.map((item,index)=>{

                    if (index>4){
                        return <View/>
                    }
                   return  <View style={{flexDirection:'row',justifyContent:'space-between',width:itemWidth,height:25}}>
                       <Label style={{color:'#E74E61',fontSize:13,fontFamily:FONT_M}}>{item.price}</Label>
                       <Label style={{color:'#DDDDDD',fontSize:13,fontFamily:FONT_M}}>{item.amount}</Label>
                   </View>
                })
            }
            <Label style={{color:'#E74E61',fontSize:13,fontFamily:FONT_M}}>{this.state.item.price}</Label>
            <Label style={{color:'#fff',fontSize:13,fontFamily:FONT_M}}>{'≈'  +(this.state.cnyRate *this.state.item.price).toFixed(2)}</Label>
            {
                this.state.bids && this.state.bids.map((item,index)=>{
                    if (index>4){
                        return <View/>
                    }
                    return  <View style={{flexDirection:'row',justifyContent:'space-between',width:itemWidth,height:25}}>
                        <Label style={{color:'#2DB58C',fontSize:13,fontFamily:FONT_M}}>{item.price}</Label>
                        <Label style={{color:'#DDDDDD',fontSize:13,fontFamily:FONT_M}}>{item.amount}</Label>
                    </View>
                })
            }



        </View>
    }

}

class SellBuyItem extends Component{


    constructor(props) {
        super(props);
        this.state={
            isBuy:1,
            price:'',
            amount:'',
            pay_password:'',
            isVisible:false,
            assetData:{
               item: [
                    {
                        amount: "0.00",
                        assetId: 12,
                        assetName: "ETH"
                    },
                   {
                       amount: "0.00",
                       assetId: 13,
                       assetName: "USDT"
                   }
                   ],
               totalUsdValuation: "0.00",
               totalValuation: "0.00000000"
            }
        }

    }

    changeStatus(status){
        this.setState({
            isBuy:status
        })
        this.sellBuyItem.changeStatus(status)
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


    tradeOrder(trade_token){
        // 下单   orderDirection   //1 卖出   2买入
        // priceType  1现价 2市价

        this.setState({isVisible:true})

        tradeUsdkOrder({tradeToken:trade_token,
            obj:{assetId:1,totalAmount:this.state.amount,
                price:this.state.price,orderDirection:this.state.isBuy==1?2:1,priceType:1
            }}).then((respond)=>{

            this.setState({isVisible:false})

            if (respond.code==0){
                this.setState({price:'',amount:''})
            }else {
                Toast.show({
                    text:respond.msg,
                    position: 'center',
                })
            }

        })

    }

    verifyPwd(){   // 下单



        if(!this.state.pay_password.trim()){
            Toast.show({
                text:appState.lan.myPool.tip13,
                position: 'center',
            })

            return
        }

       // verifyTradePassword({password:'a2N4WKjJkL4LmiPkt5UsiGMICjKT0tOannRWvmvIOJQ='})
        verifyTradePassword({password:pwdSecurity(this.state.pay_password,'zXApPY2Xd2nkC')})
            .then((respond)=>{
                if (respond.code==0){

                    appState.setState({tradePwd_token:respond.data})
                    this.overlayPopView && this.overlayPopView.close()
                    this.tradeOrder(respond.data)
                }else {
                    Toast.show({
                        text:respond.msg,
                        position: 'center',
                    })
                }
            })
    }



    componentDidMount() {


        DeviceEventEmitter.addListener('pushEmitter1201', (data)=>{

            this.setState({
                assetData:data.data
            })

            console.log(data)
        })
        WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":1201,"handleType":1,"type":1,"token":appState.trade_token} ))


    }


    componentWillUnmount() {

        DeviceEventEmitter.removeListener('pushEmitter1201')

    }


    showInPop(type, modal, text) {

        let overlayView = (
            <Overlay.PopView
                style={{alignItems: 'center', justifyContent: 'center'}}
                type={type}
                modal={modal}
                ref={v => this.overlayPopView = v}
            >
                <ScrollView>
                    <View style={{backgroundColor: '#fff', width: screenW-70,
                        marginTop:150,
                        paddingLeft:15,
                        paddingRight:15,
                        paddingTop:25,
                        paddingBottom:30,
                        height: 225, borderRadius: 15,}}>

                        <View style={{alignItems:'center'}}>
                            <Label style={{color:'#333333',fontSize:20,fontFamily:FONT_M}} type='title' size='xl' text={appState.lan.fundPage.title17} />
                            {/*<UnderlineInput  changeValue={(value)=>{*/}

                            {/*    this.setState({pay_password:value})*/}
                            {/*}}/>*/}

                            <Input
                                style={{width: screenW-100,marginTop:28,fontSize:15}}
                                size='lg'

                                placeholder= {appState.lan.mnemonic.tip8}
                                onChangeText={text => this.setState({pay_password: text})}
                            />
                        </View>

                        <View style={{flexDirection: 'row',justifyContent: 'space-between',marginTop: 20}}>
                            <TouchableOpacity onPress={() => this.overlayPopView && this.overlayPopView.close()}>
                                <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#383838','#383838']} style={{paddingLeft:10,paddingRight:10,width:(screenW-115)/2,height:44,borderRadius:22,flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                                    <Label
                                        style={{color:'#FFFFFF',fontSize:13,fontFamily:FONT_M}}>
                                        {appState.lan.myPool.title2}
                                    </Label>

                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {

                                this.verifyPwd()
                            }}>
                                <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#B9EEFD','#D885F8']} style={{paddingLeft:10,paddingRight:10,width:(screenW-115)/2,height:44,borderRadius:22,flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                                    <Label
                                        style={{color:'#FFFFFF',fontSize:13,fontFamily:FONT_M}}>
                                        {appState.lan.myPool.title1}
                                    </Label>


                                </LinearGradient>
                            </TouchableOpacity>

                        </View>
                        {/*{modal ? <Button title='Close' onPress={() => this.overlayPopView && this.overlayPopView.close()} /> : null}*/}
                    </View>
                </ScrollView>
            </Overlay.PopView>
        );
        Overlay.show(overlayView);
    }


    render() {

        let itemWidth = (screenW/2.0-23)
        let buyAmount = 0.00
        let sellAmount = 0.00
        if (this.state.assetData.item  && this.state.assetData.item.length>1){
            sellAmount  = parseFloat(this.state.assetData.item[1]['amount'])
        }
        if (this.state.assetData.item  && this.state.assetData.item.length>0){

            buyAmount  = parseFloat(this.state.assetData.item[0]['amount'])
        }
       return <View style={{width:screenW/2.0,height:352,paddingLeft:16,paddingRight:7}}>
           <View>
               <SellBuyItem1 ref={(c)=>{this.sellBuyItem=c}} callbackAction={(isBuy)=>{
                   this.setState({isBuy:isBuy,price:'',amount:''})

               }}/>
               <View style={{paddingTop:12}}>
                   <View style={{flexDirection:'row'}}>
                       <TouchableOpacity style={{width:35,height:35,borderColor:'#666666',borderWidth:1,justifyContent:'center',alignItems:'center'}}
                                         onPress={()=>{
                                             let  amountValue = 0
                                             if(!this.state.price.trim() || this.state.price.length<=0){
                                                 amountValue= 0
                                             }else if (parseFloat(this.state.price)==0 || parseFloat(this.state.price)<=0.01) {
                                                 amountValue= 0
                                             }else{
                                                 amountValue = parseFloat(this.state.price)-0.01
                                             }

                                             this.setState({
                                                 price: amountValue.toFixed(4).toString()
                                             })

                                         }}
                       >
                           <Label style={{color:'#BBBBBB',fontSize:13,fontFamily:FONT_M}}>-</Label>
                       </TouchableOpacity>
                       <TouchableOpacity style={{width:35,height:35,borderColor:'#666666',borderWidth:1,borderLeftWidth:0,justifyContent:'center',alignItems:'center'}}
                                         onPress={()=>{

                                             let pp = parseFloat(this.state.price)
                                             let  amountValue = parseFloat(this.state.price)+0.01
                                             if(!this.state.price.trim() || this.state.price.length<=0){
                                                 amountValue = 0.01
                                             }
                                             this.setState({
                                                 price: amountValue.toFixed(4).toString()
                                             })

                                         }}
                       >
                           <Label style={{color:'#BBBBBB',fontSize:13,fontFamily:FONT_M}}>+</Label>
                       </TouchableOpacity>
                       <Input style={{width:itemWidth-70,height:35,backgroundColor:'#ffffff00',
                           fontSize:12,fontFamily:FONT_M,
                           color:'#fff',
                           borderLeftWidth:0,borderColor:'#666666',borderRadius:0}}
                              onChangeText={text => this.setState({price: text})}
                              value={this.state.price}
                              keyboardType={'decimal-pad'}
                              placeholder={appState.lan.trade.tip1}
                       />
                   </View>
                   <Label style={{fontFamily:FONT_R,color:'#fff',fontSize:13,marginTop:11}}>  </Label>
                   <View style={{paddingLeft:5,paddingRight:5,borderColor:'#666666',borderWidth:1,
                       justifyContent:'space-between',
                       height:35,marginTop:10,width:itemWidth,flexDirection:'row',alignItems:'center'}}>
                       <Label style={{fontSize:12,color:'#BBBBBB',fontFamily:FONT_M}}>{appState.lan.trade.title5}</Label>
                       <Input style={{minWidth:90,height:35,backgroundColor:'#ffffff00',
                           fontSize:12,fontFamily:FONT_M,
                           color:'#fff',
                           borderWidth:0,borderRadius:0}}
                              onChangeText={text => this.setState({amount: text})}
                              value={this.state.amount}
                              keyboardType={'decimal-pad'}
                              placeholder={appState.lan.trade.tip2}
                              textAligin={'left'}
                       />
                   </View>

                   <View style={{paddingLeft:5,paddingRight:5,
                       justifyContent:'space-between',
                       height:35,marginTop:10,width:170,flexDirection:'row',alignItems:'center'}}>
                       <Label style={{fontFamily:FONT_R,color:'#fff',fontSize:13}}>{appState.lan.trade.tip3}</Label>
                       <Label style={{fontFamily:FONT_R,color:'#fff',fontSize:13}}>{
                           this.state.isBuy==1? buyAmount.toFixed(2):sellAmount.toFixed(2)
                       }</Label>
                   </View>
                   <View style={{flexDirection:'row',marginTop:5}}>
                       <TouchableOpacity style={{padding:5,backgroundColor:'#2A2A2A',alignItems:'center',justifyContent:'center'}}
                                         onPress={()=>{
                                             this.setState({amount:(this.state.isBuy==1? buyAmount*0.25:sellAmount*0.25).toFixed(4).toString()})
                                         }}
                       >
                           <Label style={{fontSize:12,color:'#DDDDDD',fontFamily:FONT_S}}>25%</Label>
                       </TouchableOpacity>
                       <TouchableOpacity style={{padding:5,backgroundColor:'#2A2A2A',alignItems:'center',justifyContent:'center',marginLeft:5}}
                                         onPress={()=>{
                                             this.setState({amount:(this.state.isBuy==1? buyAmount*0.5:sellAmount*0.5).toFixed(4).toString()})

                                         }}
                       >
                           <Label style={{fontSize:12,color:'#DDDDDD',fontFamily:FONT_S}}>50%</Label>
                       </TouchableOpacity>
                       <TouchableOpacity style={{padding:5,backgroundColor:'#2A2A2A',alignItems:'center',justifyContent:'center',marginLeft:5}}
                                         onPress={()=>{
                                             this.setState({amount:(this.state.isBuy==1? buyAmount*0.75:sellAmount*0.75).toFixed(4).toString()})

                                         }}
                       >
                           <Label style={{fontSize:12,color:'#DDDDDD',fontFamily:FONT_S}}>75%</Label>
                       </TouchableOpacity>
                       <TouchableOpacity style={{padding:5,backgroundColor:'#2A2A2A',alignItems:'center',justifyContent:'center',marginLeft:5}}
                                         onPress={()=>{

                                             this.setState({amount:this.state.isBuy==1? buyAmount.toString():sellAmount.toString()})
                                         }}
                       >
                           <Label style={{fontSize:12,color:'#DDDDDD',fontFamily:FONT_S}}>100%</Label>
                       </TouchableOpacity>

                   </View>

                   <View style={{paddingLeft:5,paddingRight:5,
                       height:35,marginTop:5,width:170,flexDirection:'row',alignItems:'center'}}>
                       <Label style={{fontFamily:FONT_R,color:'#999999',fontSize:13}}>{appState.lan.trade.tip4}</Label>
                       <Label style={{fontFamily:FONT_R,color:'#fff',fontSize:13}}>0</Label>
                   </View>

                   <TouchableOpacity
                       onPress={()=>{

                           if(!this.state.price.trim()){
                               Toast.show({
                                   text:appState.lan.trade.tip1,
                                   position: 'center',
                               })

                               return
                           }
                           if(!this.state.amount.trim()){
                               Toast.show({
                                   text:appState.lan.trade.tip2,
                                   position: 'center',
                               })

                               return
                           }
                           if(!this.state.pay_password.trim()){
                               this.showInPop('zoomOut', true, 'Pop modal')
                           }else {
                               this.tradeOrder(appState.tradePwd_token)
                           }
                       }}
                       style={{width:itemWidth,alignItems:'center',justifyContent:'center',height:40,marginTop:5,backgroundColor:this.state.isBuy?'#2DB58C':'#E74E61'}}>
                       <Label style={{fontSize:17,color:'#fff',fontFamily:FONT_M}}>{this.state.isBuy?appState.lan.trade.tip5:appState.lan.trade.tip6}</Label>
                   </TouchableOpacity>
               </View>

           </View>


           <Spinner style={{
               top: (screenH-100)/2,
               left: (screenW-30)/2,
               position:'absolute'
           }} isVisible={this.state.isVisible}
                    size={30} type={'Circle'} color={'#FF4179'}/>

        </View>
    }

}

export {SellBuyItem,SellBuyItem2}


