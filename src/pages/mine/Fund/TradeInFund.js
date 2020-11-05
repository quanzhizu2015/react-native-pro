import React,{Component,useState} from 'react'
import {View,ScrollView,Text,StyleSheet} from 'react-native'
import Label from 'teaset/components/Label/Label';
import {FONT_M, FONT_R, FONT_S} from '../../../comm/Fonts';
import LinearGradient from "react-native-linear-gradient";
import {screenW} from '../../../comm/Unitl';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import Input from 'teaset/components/Input/Input';
import {Overlay} from 'teaset';
import UnderlineInput from './UnderlineInput';
import {appState, miningPoolComputingPower, netRedFundTransferInto} from '../../../comm/sdk';
import Toast from 'teaset/components/Toast/Toast';

//import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

export default class TradeInFund extends Component{

    constructor(props) {
        super(props);
        this.state={
            coin_num:'',
            address:'',
            pay_password:''
        }

    }

    netRedFundTransferInto(){

        if(!this.state.coin_num.trim()){
            Toast.show({
                text:appState.lan.fundPage.tip1,
                position: 'center',
            })
            return
        }

        // if(!this.state.address.trim()){
        //     Toast.show({
        //         text:appState.lan.fundPage.tip2,
        //         position: 'center',
        //     })
        //
        //     return
        // }
        if(!this.state.pay_password.trim()){
            Toast.show({
                text:appState.lan.fundPage.tip3,
                position: 'center',
            })

            return
        }

        netRedFundTransferInto({
            coin_num:this.state.coin_num,
           // address:this.state.address,
            pay_password:this.state.pay_password

        }).then((respond)=>{
            if (respond.code==200){

                this.overlayPopView && this.overlayPopView.close()
                Toast.show({
                    text:appState.lan.fundPage.tip4,
                    position: 'center',
                })


            }else{
                Toast.show({
                    text:respond.message,
                    position: 'bottom',
                })

            }
        })

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
                        marginTop:100,
                        paddingLeft:15,
                        paddingRight:15,
                        paddingTop:30,
                        paddingBottom:30,
                        height: 225, borderRadius: 15,}}>

                        <View style={{marginTop: 20,alignItems:'center'}}>
                            <Label style={{color:'#333333',fontSize:20,fontFamily:FONT_M}} type='title' size='xl' text={appState.lan.fundPage.title17} />
                            <UnderlineInput  changeValue={(value)=>{

                                this.setState({pay_password:value})
                            }}/>
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

                                this.netRedFundTransferInto()
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


    render(){
       return <View style={{flex:1,paddingTop:15}}>
           <ScrollView>
               <Label style={{fontFamily:FONT_R,color:'#999999'}} numberOfLines={100}>{appState.lan.fundPage.title3}</Label>

               <View style={{height:356-120,backgroundColor:'#1E1D1E',marginTop:15,borderRadius:10,paddingTop:30,paddingLeft:15,paddingRight:15}}>
                   <View>
                       <Label style={{color:'#fff',fontSize:16,fontFamily:FONT_S}} type='title' size='xl' text={appState.lan.fundPage.title4} />
                       <Input
                           style={{marginTop: 10,borderColor:'#ffffff00',
                               height:44,fontSize:20,backgroundColor:'#393A43',color:'#fff',width:screenW-80}}
                           placeholder='0'
                           placeholderTextColor={'#69696E'}
                           keyboardType = 'number-pad'
                           onChangeText={text => this.setState({coin_num: text})}
                       />
                       <Label style={{color:'#999999',fontSize:13,fontFamily:FONT_R,marginTop:10}} type='title' size='xl' text={appState.lan.fundPage.title5+ '=0.000'} />
                   </View>
                   {/*<View style={{marginTop:40}}>*/}
                   {/*    <Label style={{color:'#fff',fontSize:15,fontFamily:FONT_R}} type='title' size='xl' text={appState.lan.fundPage.title6} />*/}
                   {/*    <Input*/}
                   {/*        style={{marginTop: 10,borderColor:'#ffffff00',*/}
                   {/*            height:44,fontSize:14,backgroundColor:'#393A43',color:'#fff',width:screenW-80}}*/}
                   {/*        placeholder={appState.lan.fundPage.tip}*/}
                   {/*        placeholderTextColor={'#69696E'}*/}
                   {/*        keyboardType = 'email-address'*/}
                   {/*        onChangeText={text => this.setState({address: text})}*/}
                   {/*    />*/}
                   {/*    <Label style={{color:'#999999',fontSize:13,fontFamily:FONT_R,marginTop:10}} type='title' size='xl' text={appState.lan.fundPage.title7} />*/}
                   {/*</View>*/}

               </View>

              <TouchableOpacity onPress={()=>{ this.showInPop('zoomOut', true, 'Pop modal')}}>
                  <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#B9EEFD','#D885F8']}
                                  style={{width:screenW-50,height:48,
                                      marginTop:25,
                                      borderRadius:24,
                                      flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                      <Label
                          style={{color:'#FFFFFF',fontSize:16,fontFamily:FONT_M}}>
                          {appState.lan.fundPage.title8}
                      </Label>


                  </LinearGradient>
              </TouchableOpacity>
           </ScrollView>

        </View>
    }


}


