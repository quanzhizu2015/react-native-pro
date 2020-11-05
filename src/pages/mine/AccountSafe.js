import React,{Component} from 'react'
import {View, ScrollView, Alert} from 'react-native';
import {NavigationBar, NavigationPage, ListRow, Overlay,Input} from 'teaset';
import Label from 'teaset/components/Label/Label';
import NavigationIconButton from '../../comm/views/NavigationIconButton';
import ChangePhoneNum from './ChangePhoneNum';
import ChangePwd from './ChangePwd';
import {FONT_M, FONT_R} from '../../comm/Fonts';
import {appState, checkPayPassword, logout, setToken} from '../../comm/sdk';
import Toast from 'teaset/components/Toast/Toast';
import ChangeTradePwd from './ChangeTradePwd';
import ChangeUserName from './ChangeUserName';
import MnemonicCopyD from '../../Mnemonic/MnemonicCopyD';
import {screenW} from '../../comm/Unitl';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import LinearGradient from "react-native-linear-gradient";
import PropTypes from 'prop-types';

import {WebSocketClient} from '../../comm/webSocket/WebSocketClient';



export  default  class AccountSafe extends NavigationPage{


    static propTypes ={
        callbackAction:PropTypes.func,
    }

    static defaultProps={
        ...NavigationPage.defaultProps,
        callbackAction:()=>{}

    }

    constructor(props){
        super(props)
        this.state={
            pay_password:''
        }
    }

    renderNavigationBar(): * {
        return  <NavigationBar
            title={<View><Label style={{fontSize:18,color:'#fff',fontFamily:FONT_R}}>{appState.lan.mine.title18}</Label></View>}
            statusBarStyle={'light-content'}
            background={<View style={{flex:1,backgroundColor:'#141517'}}/>}
            style={{paddingLeft:25,paddingRight:25}}
            leftView={<NavigationIconButton
                icon={require('../../assert/home/index_ico_arrow_left.png')}
                imageStyle={{width:20,height:20}}
                onPress={()=>{this.navigator.pop()}}
            />}
        >

        </NavigationBar>
    }

    renderTitle(title,color){
        return <Label style={{fontSize: 15, color: color,fontFamily:FONT_R}} text={title} />
    }

    loginOUt(){
        logout().then((respond)=>{
            if (respond.code==200){

                // Toast.show({
                //     text:'退出成功',
                //     position: 'center',
                // })
                this.navigator.pop()
                setToken(null)
                //WebSocketClient.getInstance().destroy()


            }else{
                Toast.show({
                    text:respond.message,
                    position: 'center',
                })

            }
        })
    }

    checkPwd(){

        if(!this.state.pay_password.trim()){
            Toast.show({
                text:appState.lan.myPool.tip13,
                position: 'center',
            })

            return
        }

        checkPayPassword({pay_password:this.state.pay_password}).then((respond)=>{
            if (respond.code==200){

                if (respond.data.check==1){

                    this.overlayPopView && this.overlayPopView.close()
                    this.navigator.push({view:<MnemonicCopyD/>})

                }else {

                    Toast.show({
                        text:appState.lan.myPool.tip23,
                        position: 'center',
                    })

                }

            }else {
                Toast.show({
                    text:respond.message,
                    position: 'center',
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

                                this.checkPwd()
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


    renderPage (){  //onPress={() => this.navigator.replace({view:<LoginPage/>})} />
        return <View style={{flex:1,backgroundColor:'#111214'}}>
            <ScrollView style={{flex:1,backgroundColor:'#111214'}}>
                <View style={{height:10}}/>

                <ListRow title={this.renderTitle(appState.lan.mnemonic.title13,'#fff')}
                         style={{backgroundColor:'#1E1D1E',height:50,borderBottomWidth:1,borderBottomColor:'#24262F',paddingLeft:25,paddingRight:25}}
                         bottomSeparator={'none'}
                         topSeparator={'none'}
                         onPress={() => this.showInPop('zoomOut', true, 'Pop modal')} />

                <ListRow title={this.renderTitle(appState.lan.setting.title12,'#fff')}
                         style={{backgroundColor:'#1E1D1E',height:50,borderBottomWidth:1,borderBottomColor:'#24262F',paddingLeft:25,paddingRight:25}}
                         bottomSeparator={'none'}
                         topSeparator={'none'}
                         onPress={() => this.navigator.push({view:<ChangePwd/>})} />

                <ListRow title={this.renderTitle(appState.lan.setting.title13,'#fff')}
                         style={{backgroundColor:'#1E1D1E',height:50,borderBottomWidth:1,borderBottomColor:'#24262F',paddingLeft:25,paddingRight:25}}
                         bottomSeparator={'none'}
                         topSeparator={'none'}
                         onPress={() =>  this.navigator.push({view:<ChangeTradePwd/>})} />

                {/*<ListRow title={this.renderTitle('更换绑定手机号','#fff')}*/}
                {/*         style={{backgroundColor:'#1E1D1E',height:50,borderBottomWidth:1,borderBottomColor:'#24262F',paddingLeft:25,paddingRight:25}}*/}
                {/*         bottomSeparator={'none'}*/}
                {/*         topSeparator={'none'}*/}
                {/*         onPress={() =>  this.navigator.push({view:<ChangePhoneNum callBackAction={()=>{this.navigator.pop()}}/>})} />*/}


                <ListRow title={this.renderTitle(appState.lan.setting.title14,'#fff')}
                         style={{backgroundColor:'#1E1D1E',height:50,borderBottomWidth:1,borderBottomColor:'#24262F',paddingLeft:25,paddingRight:25}}
                         bottomSeparator={'none'}
                         topSeparator={'none'}
                         onPress={() =>  this.navigator.push({view:<ChangeUserName callbackAction={()=>{this.props.callbackAction()}}/>})} />

                <ListRow title={this.renderTitle(appState.lan.setting.title15,'#fff')}
                         style={{backgroundColor:'#1E1D1E',height:50,borderBottomWidth:1,borderBottomColor:'#24262F',paddingLeft:25,paddingRight:25}}
                         bottomSeparator={'none'}
                         topSeparator={'none'}
                         onPress={() =>  {

                             Alert.alert('',appState.lan.setting.title18,
                                 [
                                     {text:appState.lan.myPool.title2, onPress:()=>{}},
                                     {text:appState.lan.myPool.title1, onPress:this.loginOUt.bind(this)},
                                 ]
                             );

                         }} />

            </ScrollView>


        </View>
    }

}
