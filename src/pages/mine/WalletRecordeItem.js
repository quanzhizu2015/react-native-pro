import React,{Component} from 'react'
import {View,ScrollView,Image,TouchableOpacity} from 'react-native'
import {screenW} from '../../comm/Unitl';
import {NavigationBar, NavigationPage,ListRow} from 'teaset';
import PropTypes from 'prop-types';
import Label from 'teaset/components/Label/Label';
import InComeDetailPage from './InComeDetailPage';
import moment from 'moment';
import {FONT_M, FONT_R} from '../../comm/Fonts';
import TransferDetailPage from './TransferDetailPage';
import {appState} from '../../comm/sdk';


export  default  class WalletRecordeItem extends NavigationPage{

    static propTypes ={
        item:PropTypes.object,
        currency:PropTypes.string,
        navigator:PropTypes.object

    }

    static defaultProps={
        currency:'',
        item:{
            // type:1, //1转入  2转出
            // status:3,//1 成功 2 失败 3 处理中
            // amount: 0.00,//
            // gmtCreate: "2020-03-23T10:09:45.000+0000",
            // name:'Talenter',
            // address:'Qz099SSasE2930…JUS993'
            id: 1,
            coin_num: 1000,
            created_at: "2020-07-20 10:39:53",
            state: 1,  //交易状态 0-待确认 1-确认成功 2-确认失败
            state_explain: "",
            traget_address: "testb5fa3ef21f6d1112da0d58af3a5cf145aaed2c",
            transfer_in:0  //判断转入还是转出 0-转出 1-转入 2-收益
        }

    }

    constructor(props){
        super(props)
    }

    getIcon(type){

        return type==0?require('../../assert/mine/wallet_ico_record_rollout.png'):require('../../assert/mine/wallet_ico_record_into.png')
    }

    getStatuString(type,status){

        if (type==1){
            switch (status) {
                case 0:
                    return appState.lan.myWallet.title11;

                 break
                case 1:
                    return appState.lan.myWallet.title9;

                    break
                case 2:
                    return appState.lan.myWallet.title10;
                    break
                default:
                    return ''
                break

            }
        }else if (type==0){
            switch (status) {
                case 0:
                    return  appState.lan.myWallet.title14;

                    break
                case 1:
                    return  appState.lan.myWallet.title12;

                    break
                case 2:
                    return  appState.lan.myWallet.title13;
                    break
                default:
                    return ''
                    break

            }
        }else{
            return  appState.lan.myWallet.title33;
        }


    }

    getStatuColor(type,status){
        if (type == 2){
            return '#FF514C'
        }else{
            switch (status) {
                case 0:
                    return type==1? '#FF514C':'#62DFB9';
                    break
                case 1:
                    return '#666666';
                    break
                case 2:
                    return '#FFC769';
                    break
                default:
                    return '#FFC769';
                    break

            }
        }


    }


    render (){
        let time = moment(this.props.item.created_at).format('YYYY-MM-DD HH:mm:ss')
        let imComeCount = this.props.item.coin_num==null?0.00:parseFloat(this.props.item.coin_num).toFixed(2)
        return <View style={{height:75,width:screenW,flexDirection:'row',backgroundColor:'#1E1D1E00',borderBottomWidth:1,borderColor:'#303030'}}>
            <TouchableOpacity onPress={()=>{

                if (this.props.item.transfer_in==2){
                    this.props.navigator.push({view:<InComeDetailPage id={this.props.item.id}/>})
                    return
                }
                this.props.navigator.push({view:<TransferDetailPage item={this.props.item} currency={this.props.currency}/>})
            }}>
                <View style={{height:74,width:screenW,justifyContent:'center',backgroundColor:'#1E1D1E00',paddingRight:25,paddingLeft:25}}>

                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image style={{width:19,height:19}} source={this.getIcon(this.props.item.transfer_in)}/>
                            <Label style={{color:'#fff',fontSize:15,fontFamily:FONT_M,marginLeft:10}}>{time}</Label>
                        </View>
                        <Label style={{color:this.getStatuColor(this.props.item.transfer_in,this.props.item.state),fontSize:15,fontFamily:FONT_M}}>{this.props.item.state_explain}</Label>
                    </View>
                    <View style={{flexDirection:'row',paddingLeft:30,alignItems:'center',justifyContent:'space-between'}}>

                        <Label style={{color:'#999999',fontSize:12,marginTop:5,fontFamily:FONT_R,maxWidth:160}}>{this.props.item.traget_address}</Label>
                        <Label style={{color:'#fff',fontSize:18,fontFamily:FONT_M}}> {(this.props.item.transfer_in==0?'-':'+')+imComeCount}</Label>

                    </View>

                </View>
            </TouchableOpacity>
            <View style={{width:screenW-20,height:1,backgroundColor:'#cccccc'}}/>


        </View>
    }

}
