
import React,{Component} from 'react'
import {View,ScrollView,Image,TouchableOpacity} from 'react-native'
import {screenW} from '../../comm/Unitl';
import {NavigationBar, NavigationPage,ListRow} from 'teaset';
import PropTypes from 'prop-types';
import Label from 'teaset/components/Label/Label';
import InComeDetailPage from './InComeDetailPage';
import moment from 'moment';
import {FONT_M, FONT_R, FONT_S} from '../../comm/Fonts';
import WalletRecordePage from './WalletRecordePage';
import {appState} from '../../comm/sdk';
import LinearGradient from "react-native-linear-gradient";
import ReceivePage from './ReceivePage';
import TransferPage from './Transfer/TransferPage';


export  default  class MyWalletItem extends NavigationPage{

    static propTypes ={
        item:PropTypes.object,
        navigator:PropTypes.object

    }

    static defaultProps={
        item:{
            id: 5,
            coin_num: 6775,
            frozen_coin_num: 0,
            valuation: 6775,
            wallet_type_name: "",
            icon: "",
            currency:''
        }

    }

    constructor(props){
        super(props)
    }



    render (){

        return <View style={{height:155+16,width:screenW,paddingLeft:16,paddingRight:16,paddingBottom:16}}>
            <TouchableOpacity onPress={()=>{this.props.navigator.push({view:<WalletRecordePage  currency={this.props.item.wallet_type_name}/>})}}>
                <View style={{backgroundColor:'#1E1D1E',height:155,width:screenW-32,padding:20,flexDirection:'column'}}>
                    <View style={{height:50,width:screenW-32-40,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',height:50,alignItems:'center'}}>
                            <Image style={{width:34,height:34}} source={{uri:this.props.item.icon}}/>
                            <Label style={{color:'#999999',fontSize:12,fontFamily:FONT_R,marginLeft:20}}>{this.props.item.wallet_type_name}</Label>

                            {/*<View style={{marginLeft:15}}>*/}
                            {/*    <Label style={{color:'#999999',fontSize:12,marginTop:5,fontFamily:FONT_R}}>{this.props.item.wallet_type_name}</Label>*/}
                            {/*    <Label style={{color:'#fff',fontSize:15,fontFamily:FONT_M}}>{this.props.item.valuation}</Label>*/}

                            {/*</View>*/}
                        </View>
                        <Label style={{color:'#fff',fontSize:12,fontFamily:FONT_R}}>{this.props.item.coin_num}</Label>
                        {/*<View style={{alignItems:'center'}}>*/}
                        {/*    <Label style={{color:'#fff',fontSize:12,fontFamily:FONT_R}}>{appState.lan.myWallet.title3+'：'+this.props.item.coin_num}</Label>*/}
                        {/*    <Label style={{color:'#999999',fontSize:12,marginTop:5,fontFamily:FONT_R}}>{appState.lan.myWallet.title4+'：'+this.props.item.frozen_coin_num}</Label>*/}
                        {/*</View>*/}
                    </View>
                    <View style={{flexDirection:'row',marginTop:24,justifyContent:'space-between'}}>
                        <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#B9EEFD','#D885F8']}
                                        style={{width:100,height:35,
                                            borderRadius:24,
                                            flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                            <TouchableOpacity
                                onPress={()=>{this.navigator.push({view:<ReceivePage currency={this.props.item.currency}/>})}}
                                style={{height:49,width:(screenW-51)/2,alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
                               <Label style={{fontSize:14,fontFamily:FONT_S,color:'#fff',marginLeft:6}}>{appState.lan.myWallet.title8}</Label>
                            </TouchableOpacity>

                        </LinearGradient>
                        <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#B9EEFD','#D885F8']}
                                        style={{width:100,height:35,
                                            borderRadius:24,
                                            flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                            <TouchableOpacity
                                onPress={()=>{this.navigator.push({view:<TransferPage currency={this.props.item.currency}/>})}}
                                style={{width:(screenW-51)/2,height:49,alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
                                <Label style={{fontSize:14,fontFamily:FONT_S,color:'#fff',marginLeft:6}}>{appState.lan.myWallet.title7}</Label>
                            </TouchableOpacity>


                        </LinearGradient>

                    </View>
                </View>
            </TouchableOpacity>
        </View>
    }

}
