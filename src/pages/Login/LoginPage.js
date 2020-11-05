
import React, {Component} from 'react';
import {View,Text,ScrollView,TouchableOpacity,Image,Alert,ImageBackground} from 'react-native';
import {NavigationPage,Input,Button,Overlay,Theme,Label} from 'teaset';
import {appState, login, setToken, sendMsg, userCodeLogin, accountUserLogin, setTradeToken} from '../../comm/sdk';
import {statusBarHeight, screenW, unitWidth, unitHeight, screenH, Device_No} from '../../comm/Unitl';
import RegisterPage from './RegisterPage';
import InputScrollView from 'react-native-input-scroll-view';
import Toast from 'teaset/components/Toast/Toast';
import {FONT_M} from '../../comm/Fonts';
import LinearGradient from "react-native-linear-gradient";
import VerifyCode from '../../comm/views/VerifyCode';
import {isEmail} from '../../comm/Tool';
import MnemonicLogin from '../../Mnemonic/MnemonicLogin';
import {WebSocketClient} from '../../comm/webSocket/WebSocketClient';
import {pwdSecurity} from '../../comm/webSocket/UnitTool';


export  default class  LoginPage extends NavigationPage {

    constructor(props){
        super(props)

        this.state={
            unlock:false,
            phone:'13004280223',
            area:'+86',
            password:'123456',
            code:'',
            isCodeLogin:false,
            lockSendMsg:false
        }
    }

    showPop(type, modal, text) {
        let overlayView = (
            <Overlay.PopView
                style={{alignItems: 'center', justifyContent: 'center'}}
                type={type}
                modal={modal}
                ref={v => this.overlayPopView = v}
            >
                <View style={{backgroundColor: Theme.defaultColor, minWidth: 260, minHeight: 180, borderRadius: 15, justifyContent: 'center', alignItems: 'center'}}>
                    <Label type='title' size='xl' text={text} />
                    {modal ? <View style={{height: 60}} /> : null}
                    {modal ? <Button title='Close' onPress={() => this.overlayPopView && this.overlayPopView.close()} /> : null}
                </View>
            </Overlay.PopView>
        );
        Overlay.show(overlayView);
    }



    login= async() =>{
        //appState.setState({login:true})

        WebSocketClient.getInstance().initWebSocket()

        if(!this.state.phone.trim()){
            Toast.show({
                text:appState.lan.login.tip1,
                position: 'center',
            })

            return
        }


        if(this.state.isCodeLogin){
            if(!this.state.code.trim()){
                Toast.show({
                    text:appState.lan.login.tip2,
                    position: 'center',
                })

                return
            }

            userCodeLogin({mobile:this.state.phone,code:this.state.code,device_no:Device_No}).then((respond)=>{
                if (respond.code==200){
                    //(token,phone,userName, userId,url,sex,birth,sign,address)
                    //appState.setState({inviteCode:respond.data.code})
                   // JPush.setAlias({sequence:respond.data.id,alias:respond.data.id.toString()})
                    setToken(
                        respond.data.token,
                        respond.data.user.mobile,
                        respond.data.user.username,
                        respond.data.user.avatar,
                        respond.data.user.sex,
                        respond.data.user.birthday,
                        '',
                        respond.data.user.address,
                        respond.data.user.iceberg_invitation_code,
                        respond.data.user.qing_feng_invitation_code,
                        respond.data.user.area,
                        respond.data.user.mobile,
                        respond.data.user.is_node_user
                    );

                }else{
                    Toast.show({
                        text:respond.message,
                        position: 'center',
                    })

                }

            })


        }else {

            if(!this.state.password.trim()){
                Toast.show({
                    text:appState.lan.login.tip8,
                    position: 'center',
                })

                return
            }

            //await autoLogin()

            login({mobile:this.state.phone,password:this.state.password,device_no:Device_No}).then((respond)=>{
                if (respond.code==200){
                    //(token,phone,userName, userId,url,sex,birth,sign,address)
                    //appState.setState({inviteCode:respond.data.code})
                    //JPush.setAlias({sequence:respond.data.id,alias:respond.data.id.toString()})

                    // address: null
                    // avatar: null
                    // birthday: null
                    // iceberg_invitation_code: "ZPdxtC"
                    // qing_feng_invitation_code: "5v5LDf"
                    // sex: "男"
                    // username: "qzz"
                    setToken(respond.data.token,
                        respond.data.user.mobile,
                        respond.data.user.username,
                        respond.data.user.avatar,
                        respond.data.user.sex,
                        respond.data.user.birthday,
                        '',
                        respond.data.user.address,
                        respond.data.user.invitation_code,
                        //respond.data.user.qing_feng_invitation_code,
                        respond.data.user.area,
                        respond.data.user.mobile,
                        respond.data.user.is_node_user,
                        respond.data.user.has_backed_up
                        );

                    //accountUserLogin({phone:'15858260950',pwd:'R3OMFzdu44SGer3Cw1MfyvYcTLSpWcK0ZSlcWLA2+Sk=',type:'0'})
                    //accountUserLogin({phone:'15381590768',pwd:pwdSecurity('qwe1230.'),type:'0'})
                    accountUserLogin({phone:'15858260950',pwd:pwdSecurity('111111','tTdx3sZFmWGgd'),type:'0'})
                        .then((respond)=>{

                            if (respond.code==0){
                                setTradeToken(respond.data.token)
                            }
                            WebSocketClient.getInstance().initWebSocket()
                           //  let time1 = parseInt(new Date().valueOf()/1000)
                           //  WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":4,"type":1,"id":1}))
                           //  //WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":7,"type":3,"param":{"resolution":"60","klineId":1,"type":2,"limit":150,"endTime":time1}}))
                           // // WebSocketClient.getInstance().sendMessage(JSON.stringify({"id":1,"param":{"pageSize":20,"pageNo":1,"assetId":1,"status":"8,9","type":1,"pairId":"","tab":1},"reqType":1000,"type":1,"token":respond.data.token}))
                           //  WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":2,"type":1,"id":1}))
                           //  WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":1,"type":1,"id":1,"param":"4"}))
                           //  WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":1201,"handleType":1,"type":1,"token":respond.data.token} )) //钱包信息
                           // // WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":7,"type":2,"param":{"resolution":"60","klineId":1,"type":2,"limit":150,"endTime":time1}}))



                    })


                }else{
                    Toast.show({
                        text:respond.message,
                        position: 'center',
                    })

                }

            })



        }

    }

    sendMsg(){
        if(!this.state.phone.trim()){
            Toast.show({
                text:appState.lan.login.tip1,
                position: 'center',
            })

            return false
        }

        sendMsg({
            area:86,
            mobile: this.state.phone,
            type: 7
        }).then((respond)=>{
            if (respond.code==200){
                console.log('aaa')
            }else {

                Toast.show({
                    text:respond.message,
                    position: 'center',
                })
            }

        })
        return true

    }


    render (){

        return <View style={{backgroundColor:'#111214',flex:1,alignItems:'center',justifyContent:'center'}}>


                <ImageBackground style={{width:screenW,height:screenH}} imageStyle={{resizeMode: 'cover'}}  source={require("../../assert/login/login_bg.jpg")}>

                    <InputScrollView >
                    <View style={{marginTop:160,alignItems:'center'}}>
                        <Image style={{width:146,height:103}} source={require('../../assert/login/login_logo.png')}/>
                    </View>
                    <View style={{paddingTop:34,alignItems:'center'}}>
                        <View style={{height:46,paddingLeft:15,paddingRight:15,alignItems:'center',flexDirection:'row',backgroundColor:'#F4F4F426',width:screenW-123,borderWidth:1,borderColor:'#E4E2E2',borderRadius:23,justifyContent:'center'}} >
                            <Input style={{flex:1,borderColor:'#ffffff00',backgroundColor:'#f2f2f200',fontSize:13,fontFamily:FONT_M,color:"#fff"}}
                                   placeholder={appState.lan.login.tip1}
                                   placeholderTextColor={'#fff'}
                                   keyboardType = 'number-pad'
                                   onChangeText={text => this.setState({phone: text})}
                            />

                        </View>

                        {
                            this.state.isCodeLogin?<View style={{height:46,marginTop:20,paddingLeft:15,alignItems:'center',flexDirection:'row',backgroundColor:'#F4F4F426',width:screenW-123,borderWidth:1,borderColor:'#E4E2E2',borderRadius:23,justifyContent:'center'}} >

                                <Input style={{flex:1,color:"#fff",borderColor:'#ffffff00',backgroundColor:'#f2f2f200'}}
                                       placeholder={appState.lan.login.tip2}
                                       placeholderTextColor={'#fff'}
                                       onChangeText={text => this.setState({code: text})}
                                />
                                <View style={{width:1,backgroundColor:"#fff",height:17}}/>
                                <VerifyCode bgColor={'#ffffff00'} countingBgColor={'#ffffff00'} textColor={'#fff'} onPress={this.sendMsg.bind(this)}/>

                            </View>:<View style={{height:46,marginTop:20,paddingLeft:15,paddingRight:15,alignItems:'center',flexDirection:'row',backgroundColor:'#F4F4F426',borderWidth:1,width:screenW-123,borderColor:'#E4E2E2',borderRadius:23,justifyContent:'center'}} >
                                <Input style={{flex:1,borderColor:'#ffffff00',backgroundColor:'#f2f2f200',fontSize:13,fontFamily:FONT_M,color:"#fff"}}
                                       placeholder={appState.lan.login.tip3}
                                       placeholderTextColor={'#fff'}
                                       secureTextEntry={true}
                                    //keyboardType = 'email-address'
                                       onChangeText={text => this.setState({password: text})}
                                />
                            </View>
                        }


                        <TouchableOpacity style={{marginTop:20}} onPress={this.login.bind(this)}>
                            <LinearGradient start={{x: 1, y: 1}} end={{x: 0, y: 1}} colors={["#E680FF", "#A9F2FF", ]} style={{width:screenW-123,height:50,borderRadius:25,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{color:'#fff',fontSize:15,fontFamily:FONT_M}}>
                                    {appState.lan.login.tip4}
                                </Text>
                            </LinearGradient>

                        </TouchableOpacity>
                        {/*<Button style={{marginTop:20,fontSize:15,width:screenW-40,height:50,backgroundColor:'#d10023'}}*/}
                        {/*        title='登陆' type='danger'*/}
                        {/*        disabled={false} onPress={this.login.bind(this)}/>*/}
                        <View style={{width:screenW-123,marginTop:20,paddingLeft:20,paddingRight:20,alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>

                            <TouchableOpacity style={{height:40,justifyContent:'center',alignItems:'flex-start',width:(screenW-163)/2.0}}
                                              onPress={()=>{
                                                  this.navigator.push({view:<RegisterPage/>})
                                                  //this.navigator.push({view:<MnemonicCopy/>})
                                              }}
                            >
                                <Text style={{fontSize:14,color:'#fff',fontFamily:FONT_M}}>{appState.lan.login.tip5}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{height:40,justifyContent:'center',alignItems:'flex-end',width:(screenW-163)/2.0}}
                                              onPress={()=>{
                                                  //this.setState({isCodeLogin:!this.state.isCodeLogin})
                                                   this.navigator.push({view:<MnemonicLogin />})
                                              }}
                            >
                                <Text style={{fontSize:14,color:'#fff',fontFamily:FONT_M}}>{this.state.isCodeLogin?appState.lan.login.tip6:appState.lan.login.tip7}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    </InputScrollView>
                </ImageBackground>



        </View>
    }
}


