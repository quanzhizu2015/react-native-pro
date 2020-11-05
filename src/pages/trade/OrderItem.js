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


export default class OrderItem extends Component{

    static propTypes ={
        item:PropTypes.object,
        callbackAction:PropTypes.func,
        isShowTopLine:PropTypes.bool,
    }

    static defaultProps={
       isShowTopLine:false,
       item:{
           assetId: 1,
           assetName: "ETH/USDT",
           entrustTime: 1603186159000,
           filledAmount: "0.0000",
           id: 852354365928187,
           orderDirection: 2,// orderDirection 1卖  2买
           orderType: 1,
           price: "324.3425",
           purchasePrice: "--",
           status: 8,
           totalAmount: "0.2000",

           // id: 992835451143599,
           // gmtCreate: 1602750347000,
           // gmtModified: 1602750347000,
           // userId: null,
           // assetId: 1,
           // assetName: "ETH/USDT",
           // orderDirection: 2, //1 卖  2买
           // orderType: 1,
           // totalAmount: "0.0200",
           // unfilledAmount: null,
           // price: "326.0560",
           // fee: "0.0000",
           // status: 10,
           // matchAmount: "0",
           // completeAmount: "0",
           // averagePrice: "326.0560"
       },
        callbackAction:()=>{}
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

    constructor(props) {
        super(props);
    }


    render() {

        let date =''
        if(this.props.item.entrustTime){
            date = moment(this.props.item.entrustTime).format('HH:mm YYYY/MM/DD')
        }
        return <View style={{width:screenW,height:120}}>
            {this.props.isShowTopLine? <View style={{backgroundColor:'#333333',height:1}}/>:<View/>}
            <View style={{paddingLeft:16,paddingRight:16}}>
                <View style={{height:40,alignItems:'center',flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Label style={{color:this.props.item.orderDirection==2?'#2DB58C':'#E74E61',fontSize:17,fontFamily:FONT_M}}>{this.props.item.orderDirection==2?appState.lan.trade.title3:appState.lan.trade.title4}</Label>
                        <Label style={{marginLeft:7,color:'#CCCCCC',fontSize:12,fontFamily:FONT_R}}>{date}</Label>
                    </View>
                    {
                        (this.props.item.status==8 || this.props.item.status==9)?<TouchableOpacity style={{backgroundColor:'#2A2A2A',paddingLeft:10,paddingRight:10,paddingTop:2,paddingBottom:2}}
                                                                    onPress={()=>{this.tradeDel()}}
                        >
                            <Label style={{color:'#3463FF',fontSize:12,fontFamily:FONT_M}}>{appState.lan.trade.title10}</Label>

                        </TouchableOpacity>:<View/>
                    }
                </View>
                <View style={{marginTop:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <View>
                        <Label style={{color:'#CCCCCC',fontSize:13,fontFamily:FONT_R}}>{appState.lan.trade.title11}</Label>
                        <Label style={{color:'#fff',fontSize:15,fontFamily:FONT_M}}>{this.props.item.price}</Label>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <Label style={{color:'#CCCCCC',fontSize:13,fontFamily:FONT_R}}>{appState.lan.trade.title12}</Label>
                        <Label style={{color:'#fff',fontSize:15,fontFamily:FONT_M}}>{this.props.item.totalAmount}</Label>
                    </View>
                    <View style={{alignItems:'flex-end'}}>
                        <Label style={{color:'#CCCCCC',fontSize:13,fontFamily:FONT_R}}>{appState.lan.trade.title13}</Label>
                        <Label style={{color:'#fff',fontSize:15,fontFamily:FONT_M}}>{this.props.item.purchasePrice}</Label>
                    </View>


                </View>
            </View>

        </View>;
    }

}
