import React,{Component} from 'react'
import {View} from 'react-native'
import PropTypes from 'prop-types';
import {screenW} from '../../comm/Unitl';
import Label from 'teaset/components/Label/Label';
import {appState, tradeUsdkDelOrder} from '../../comm/sdk';
import moment from 'moment';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import {FONT_M, FONT_R} from '../../comm/Fonts';
import Toast from 'teaset/components/Toast/Toast';


class TradeRecordeItem extends Component{

    static propTypes ={
        item:PropTypes.object,
        callbackAction:PropTypes.func,

    }

    static defaultProps={

        item:{

            // assetName: "ETH/USDT"
            // filledAmount: "0.0100"
            // filledDate: 1603232926000
            // filledPrice: "325.7625"
            // orderDirection: 1

            assetId: 1,
            assetName: "ETH/USDT",
            entrustTime: 1603186159000,
            filledAmount: "0.0000",
            id: 852354365928187,
            orderDirection: 2, // 1卖  2买
            orderType: 1,
            price: "324.3425",
            purchasePrice: "--",
            status: 8,
            totalAmount: "0.2000",
        },
        callbackAction:()=>{}
    }

    constructor(props) {
        super(props);
    }


    tradeDel(){
        tradeUsdkDelOrder({id:this.props.item.id}).then((respond)=>{

            if (respond.code==0){


            }else {
                Toast.show({
                    text:respond.msg,
                    position: 'center',
                })
            }

        })
    }


    render() {

        let date =''
        if(this.props.item.entrustTime){
            date = moment(this.props.item.entrustTime).format('HH:mm MM/DD')
        }
        return <View style={{width:screenW,height:110,backgroundColor:'#2A2A2A00'}}>
            <View style={{width:screenW,height:109,backgroundColor:'#2A2A2A',padding:16}}>

                <View style={{alignItems:'center',flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Label style={{color:this.props.item.orderDirection==2?'#2DB58C':'#E74E61',fontSize:17,fontFamily:FONT_M}}>{this.props.item.orderDirection==2?appState.lan.trade.title3:appState.lan.trade.title4}</Label>
                        <Label style={{marginLeft:7,color:'#CCCCCC',fontSize:12,fontFamily:FONT_R}}>{date}</Label>
                    </View>
                    {
                        (this.props.item.status==8 || this.props.item.status==9)?<TouchableOpacity style={{backgroundColor:'#4A4A4A',paddingLeft:10,paddingRight:10,paddingTop:2,paddingBottom:2}}
                                                                    onPress={()=>{this.tradeDel()}}
                        >
                            <Label style={{color:'#3463FF',fontSize:12,fontFamily:FONT_M}}>{appState.lan.trade.title10}</Label>

                        </TouchableOpacity>:<View/>
                    }
                </View>
                <View style={{marginTop:15,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <View>
                        <Label style={{color:'#CCCCCC',fontSize:13,fontFamily:FONT_R}}>{appState.lan.trade.title11}</Label>
                        <Label style={{color:'#fff',marginTop:3,fontSize:15,fontFamily:FONT_M}}>{this.props.item.price}</Label>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <Label style={{color:'#CCCCCC',fontSize:13,fontFamily:FONT_R}}>{appState.lan.trade.title12}</Label>
                        <Label style={{color:'#fff',marginTop:3,fontSize:15,fontFamily:FONT_M}}>{this.props.item.totalAmount}</Label>
                    </View>
                    <View style={{alignItems:'flex-end'}}>
                        <Label style={{color:'#CCCCCC',fontSize:13,fontFamily:FONT_R}}>{appState.lan.trade.title13}</Label>
                        <Label style={{color:'#fff',marginTop:3,fontSize:15,fontFamily:FONT_M}}>{this.props.item.purchasePrice}</Label>
                    </View>


                </View>


            </View>
        </View>;
    }

}


class TradeRecordeItem2 extends Component{

    static propTypes ={
        item:PropTypes.object,
        callbackAction:PropTypes.func,

    }

    static defaultProps={

        item:{

            assetName: "ETH/USDT",
            filledAmount: "0.0100",
            filledDate: 1603232926000,
            filledPrice: "325.7625",
            orderDirection: 1 // 2卖  1买

            // assetId: 1,
            // assetName: "ETH/USDT",
            // entrustTime: 1603186159000,
            // filledAmount: "0.0000",
            // id: 852354365928187,
            // orderDirection: 2, // 1卖  2买
            // orderType: 1,
            // price: "324.3425",
            // purchasePrice: "--",
            // status: 8,
            // totalAmount: "0.2000",
        },
        callbackAction:()=>{}
    }

    constructor(props) {
        super(props);
    }


    render() {

        let date =''
        if(this.props.item.filledDate){
            date = moment(this.props.item.filledDate).format('HH:mm MM/DD')
        }
        return <View style={{width:screenW,height:110,backgroundColor:'#2A2A2A00'}}>
            <View style={{width:screenW,height:109,backgroundColor:'#2A2A2A',padding:16}}>

                <View style={{alignItems:'center',flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Label style={{color:this.props.item.orderDirection==1?'#2DB58C':'#E74E61',fontSize:17,fontFamily:FONT_M}}>{this.props.item.orderDirection==1?appState.lan.trade.title3:appState.lan.trade.title4}</Label>
                        <Label style={{marginLeft:7,color:'#CCCCCC',fontSize:12,fontFamily:FONT_R}}>{date}</Label>
                    </View>

                </View>
                <View style={{marginTop:15,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <View>
                        <Label style={{color:'#CCCCCC',fontSize:13,fontFamily:FONT_R}}>{appState.lan.trade.title11}</Label>
                        <Label style={{color:'#fff',marginTop:3,fontSize:15,fontFamily:FONT_M}}>{this.props.item.filledPrice}</Label>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <Label style={{color:'#CCCCCC',fontSize:13,fontFamily:FONT_R}}>{appState.lan.trade.title12}</Label>
                        <Label style={{color:'#fff',marginTop:3,fontSize:15,fontFamily:FONT_M}}>{this.props.item.filledAmount}</Label>
                    </View>
                    <View style={{alignItems:'flex-end'}}>
                        <Label style={{color:'#CCCCCC',fontSize:13,fontFamily:FONT_R}}>{appState.lan.trade.title13}</Label>
                        <Label style={{color:'#fff',marginTop:3,fontSize:15,fontFamily:FONT_M}}>{this.props.item.filledPrice}</Label>
                    </View>


                </View>


            </View>
        </View>;
    }

}


export {TradeRecordeItem,TradeRecordeItem2}
