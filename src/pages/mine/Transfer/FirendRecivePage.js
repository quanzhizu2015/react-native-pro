
import React, {Component} from 'react';
import {NavigationPage,NavigationBar,Label} from 'teaset';
import {View,ScrollView} from 'react-native';
import NavigationIconButton from '../../../comm/views/NavigationIconButton';
import {FONT_M, FONT_R} from '../../../comm/Fonts';
import {InputItem, TitleInputItem} from '../../../comm/views/InputItem';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import Input from 'teaset/components/Input/Input';
import {screenW} from '../../../comm/Unitl';
import SelectButton from '../../../comm/views/SelectButton';
import VerifyCode from '../../../comm/views/VerifyCode';
import InputScrollView from 'react-native-input-scroll-view';
import {
    appState,
    miningPoolComputingPower, sendMsg,
    walletInternalTransfer,
    walletTransferFee,
    walletTransferPageData,
} from '../../../comm/sdk';
import Toast from 'teaset/components/Toast/Toast';
import PropTypes from 'prop-types';
import CollideTrade from '../CollideTrade';
import LinearGradient from "react-native-linear-gradient";
import {isIos} from 'react-native-calendars/src/expandableCalendar/commons';

export default class FirendRecivePage extends Component {


    static propTypes={
        currency:PropTypes.string
    }

    static defaultProps={
        currency:'',
    }

    constructor(props){
        super(props);
        this.state={
            isVisible:true,
            coin_num: 0,
            address: "",
            pay_password: "",
            code: "",
            enable:false,
            walletData:{
                coin_num: 0,
                mobile: ""
            },
            transferFee:{
                transfer_free:0.00

            }
        }
    }

    sendMsg(){

        sendMsg({
            area: appState.area,
            mobile:appState.phone,
            type: 6
        }).then((respond)=>{
            if (respond.code==200){
                this.setState({
                    enable:true
                })
            }else {
                this.setState({
                    enable:false
                })
                Toast.show({
                    text:respond.message,
                    position: 'center',
                })

            }

        })
        return true
    }

    loadData(){
        walletTransferPageData({
            currency:this.props.currency
        }).then((respond)=>{
            if (respond.code==200){
                this.setState({
                    walletData:respond.data,
                })
            }else{
                Toast.show({
                    text:respond.message,
                    position: 'center',
                })

            }
        })
    }

    walletTransferFee(){
        walletTransferFee({
            coin_num:this.state.coin_num,
            currency:this.props.currency
        }).then((respond)=>{
            if (respond.code==200){
                this.setState({
                    transferFee:respond.data,
                })
            }else{
                Toast.show({
                    text:respond.message,
                    position: 'center',
                })

            }
        })
    }

    walletInternalTransfer(){
        if(!this.state.address.trim()){
            Toast.show({
                text:appState.lan.myWallet.tip4,
                position: 'center',
            })
            return
        }

        if(!this.state.coin_num.trim()){
            Toast.show({
                text:appState.lan.myWallet.tip1,
                position: 'center',
            })
            return
        }
        if(!this.state.pay_password.trim()){
            Toast.show({
                text:appState.lan.myWallet.tip2,
                position: 'center',
            })
            return
        }
        if(!this.state.code.trim()){
            Toast.show({
                text:appState.lan.myWallet.tip3,
                position: 'center',
            })
            return
        }
        walletInternalTransfer({
            coin_num:this.state.coin_num,
            currency:this.props.currency,
            user_name:this.state.address,
            pay_password:this.state.pay_password,
            code:this.state.code

        }).then((respond)=>{
            if (respond.code==200){
                Toast.show({
                    text:appState.lan.myWallet.tip5,
                    position: 'center',
                })
            }else{
                Toast.show({
                    text:respond.message,
                    position: 'center',
                })

            }
        })

    }

    componentDidMount() {
        this.loadData()
    }




    render(){
        return <View style={{flex:1,backgroundColor:'#111214',paddingTop:10}}>
            <InputScrollView>
                <InputItem
                    containStyle={{paddingLeft:25,paddingRight:25}}
                    style={{backgroundColor:'#1E1D1E',marginTop:0}}
                    detailElement={
                        <View>
                            <Input
                                style={{borderColor:'#ffffff00',paddingLeft:0,fontSize:14,backgroundColor:'#ffffff00',color:'#fff',width:screenW-50-46}}
                                placeholder={appState.lan.myWallet.tip4}
                                placeholderTextColor={'#9E9E9E'}
                                keyboardType = 'email-address'

                                onChangeText={text => this.setState({address: text})}
                            />
                        </View>
                    }
                />


                <TitleInputItem
                    title={appState.lan.myWallet.title18}
                    containStyle={{paddingLeft:25,paddingRight:25,height:69}}
                    style={{backgroundColor:'#1E1D1E',marginTop:0,height:70}}

                    detailElement={
                        <View>
                            <Input
                                style={{borderColor:'#ffffff00',paddingLeft:0,fontSize:14,backgroundColor:'#ffffff00',color:'#fff',width:screenW-50-110}}
                                placeholder={appState.lan.myWallet.tip1}
                                placeholderTextColor={'#9E9E9E'}
                                keyboardType = 'decimal-pad'
                                //onBlur={this.walletTransferFee.bind(this)}
                                onChangeText={text => this.setState({coin_num: text})}
                            />
                        </View>
                    }
                    rightElement={
                        <View style={{width:110,alignItems:'flex-end'}}>
                            <Label style={{color:'#999999'}}>{appState.lan.myWallet.title23 +parseFloat(this.state.walletData.coin_num).toFixed(2)}</Label>
                        </View>
                    }
                />


                <TitleInputItem
                    title={appState.lan.myWallet.title19}
                    containStyle={{paddingLeft:25,paddingRight:25,height:69}}
                    style={{backgroundColor:'#1E1D1E',marginTop:0,height:70}}
                    detailElement={
                        <View>
                            <Input
                                style={{borderColor:'#ffffff00',paddingLeft:0,fontSize:14,backgroundColor:'#ffffff00',color:'#fff',width:screenW-50-110}}
                                placeholder={appState.lan.myWallet.tip2}
                                secureTextEntry={this.state.isVisible}
                                placeholderTextColor={'#9E9E9E'}
                                keyboardType = {isIos?'email-address':'default'}
                                onChangeText={text => this.setState({pay_password: text})}
                            />
                        </View>
                    }
                    rightElement={
                        <View style={{width:110,alignItems:'flex-end'}}>
                            <SelectButton imageStyle={{width:22,height:22}}
                                          onPress={()=>{this.setState({isVisible:!this.state.isVisible})}}
                                          normalImage={require('../../../assert/mine/wallet_ico_tr_password_nor.png')}
                                          selectImage={require('../../../assert/mine/wallet_ico_tr_password_pre.png')}
                            />
                        </View>
                    }
                />
                <View style={{paddingLeft:15,paddingRight:15,height:50,justifyContent:'center'}}>
                    <Label style={{color:'#999999'}}>{appState.lan.myWallet.title20 + appState.phone}</Label>
                </View>

                <TitleInputItem
                    title={appState.lan.myWallet.title21}
                    containStyle={{paddingLeft:25,paddingRight:25,height:69}}
                    style={{backgroundColor:'#1E1D1E',marginTop:0,height:70}}
                    detailElement={
                        <View>
                            <Input
                                style={{borderColor:'#ffffff00',paddingLeft:0,fontSize:14,backgroundColor:'#ffffff00',color:'#fff',width:screenW-50-65}}
                                placeholder={appState.lan.myWallet.tip3}
                                placeholderTextColor={'#9E9E9E'}
                                keyboardType = 'email-address'
                                onChangeText={text => this.setState({code: text})}
                            />
                        </View>
                    }
                    rightElement={
                        <View style={{height:30,alignItems:'center'}}>
                            <VerifyCode bgColor={'#CFABFF'} onPress={this.sendMsg.bind(this)}/>
                        </View>
                    }
                />

                <InputItem
                    containStyle={{paddingLeft:25,paddingRight:25}}
                    style={{backgroundColor:'#1E1D1E',marginTop:0}}
                    isShowBottomLine={false}
                    leftElement={
                        <TouchableOpacity>
                            <Label style={{fontFamily:FONT_M,fontSize:14,color:'#fff'}}>{appState.lan.myWallet.title22}</Label>
                        </TouchableOpacity>
                    }
                    detailElement={
                        <View style={{marginLeft:10}}>
                            <Label style={{fontFamily:FONT_M,fontSize:14,color:'#fff'}}>0.00</Label>
                        </View>
                    }
                />


                <View style={{padding:25}}>
                    <TouchableOpacity onPress={()=>{
                        this.walletInternalTransfer()
                    }}>
                        <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#B9EEFD','#D885F8']}
                                        style={{width:(screenW-50),height:48,
                                            marginTop:25,
                                            borderRadius:24,
                                            flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                            <Label
                                style={{color:'#FFFFFF',fontSize:16,fontFamily:FONT_M}}>
                                {appState.lan.myPool.title1}
                            </Label>


                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={{height:100}}/>
            </InputScrollView>



        </View>
    }

}
