//ChangeTradePwd

import React,{Component} from 'react'
import {View,Image,TouchableOpacity,ScrollView} from 'react-native'
import {NavigationPage, ListRow, NavigationBar,Input,Button} from 'teaset';
import Label from 'teaset/components/Label/Label';
import NavigationIconButton from '../../comm/views/NavigationIconButton';
import GradientCode from '../../comm/views/GradientCode';
import {screenH, screenW, unitHeight, unitWidth} from '../../comm/Unitl';
import LinearGradient from 'react-native-linear-gradient';
import {appState, changeTraPassword, chphone, sendMsg, setToken, userCheck} from '../../comm/sdk';
import Toast from 'teaset/components/Toast/Toast';
import {isEmail} from '../../comm/Tool';
import {FONT_R} from '../../comm/Fonts';

export default  class ChangeTradePwd extends NavigationPage{

    constructor(props){
        super(props)
        this.state={
            code:'',
            pwd:'',
            rePwd:'',
            enable:false
        }
    }

    changePwd=async ()=>{

        if (this.state.enable == false){

            return;
        }

        if(!this.state.code.trim()){
            Toast.show({
                text:appState.lan.register.tip10,
                position: 'center',
            })
            return
        }

        if(!this.state.pwd.trim()){
            Toast.show({
                text:appState.lan.register.tip1,
                position: 'center',
            })
            return
        }

        if(!this.state.rePwd.trim()){
            Toast.show({
                text:appState.lan.register.tip10,
                position: 'center',
            })
            return
        }

        changeTraPassword({
            code:this.state.code,
            pay_password:this.state.pwd,
            pay_password_confirmation:this.state.rePwd,

        }).then((respond)=>{
            if (respond.code==200){

                Toast.show({
                    text:'修改成功',
                    position: 'center',
                })
                this.navigator.pop();


            }else {
                Toast.show({
                    text:respond.message,
                    position: 'center',
                })

            }

        })


    }

    sendMsg(){

        sendMsg({
            area:'86',
            mobile: appState.phone,
            type: 5
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

    renderNavigationBar(): * {
        return  <NavigationBar
            title={<View><Label style={{fontSize:18,color:'#fff',fontFamily:FONT_R}}>{appState.lan.setting.title2}</Label></View>}
            statusBarStyle={'light-content'}
            background={<View style={{flex:1,backgroundColor:'#1E1D1E'}}/>}
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

    renderAearTitle(title,color){
        return <TouchableOpacity onPress={()=>{}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Label style={{fontSize: 15, color: color,fontFamily:FONT_R}} text={title} />
                <Image style={{width:16,height:16,marginLeft:5}} source={require('../../assert/mine/wallet_ico_arrow_down.png')}/>
            </View>
        </TouchableOpacity>
    }

    renderPage(): null {
        return <View style={{flex:1,backgroundColor:'#111214'}}>
            <ScrollView style={{flex:1,backgroundColor:'#111214'}}>
                <ListRow title={this.renderTitle(appState.lan.setting.title7 +appState.phone, '#999999')}
                         style={{backgroundColor:'#ffffff00',height:50,borderBottomWidth:1,borderBottomColor:'#24262F',paddingLeft:25,paddingRight:25}}
                         bottomSeparator={'none'}
                         topSeparator={'none'}
                         bottomSeparator={'none'}/>

                <View style={{backgroundColor:'#141517',height:80,paddingTop:10,borderBottomWidth:1,borderBottomColor:'#24262F',paddingLeft:25,paddingRight:25}}>

                    {this.renderTitle(appState.lan.setting.title8,'#fff')}
                    <ListRow title={
                        <Input style={{borderColor:'#ffffff00',backgroundColor:'#ffffff00',color:'#fff',paddingLeft:0}}
                               placeholder={appState.lan.setting.tip5+'        '}
                               onChangeText={text => this.setState({code: text})}></Input>
                    }
                             style={{backgroundColor:'#ffffff00',paddingRight:0,paddingLeft:0,width:screenW-50}}
                             bottomSeparator={'none'}
                             topSeparator={'none'}
                             detail={
                                 <GradientCode bgColor1={'#C9ACF9'} bgColor={'#C9ACF9'} onPress={()=>{this.sendMsg()}} codeBtnText={appState.lan.apps.title}/>
                             }/>
                </View>

                <View style={{backgroundColor:'#141517',height:80,paddingTop:10,borderBottomWidth:1,borderBottomColor:'#24262F',paddingLeft:25,paddingRight:25}}>

                    {this.renderTitle(appState.lan.setting.title5, '#fff')}
                    <ListRow title={
                        <View style={{flexDirection:'row',width:screenW-110,justifyContent:'space-between',alignItems:'center'}}>
                            <Input style={{borderColor:'#ffffff00',width:screenW-100,paddingLeft:0,backgroundColor:'#ffffff00',color:'#fff'}}
                                   placeholder={appState.lan.setting.tip2}
                                   onChangeText={text => this.setState({pwd: text})}></Input>
                        </View>
                    }
                             style={{backgroundColor:'#ffffff00',paddingRight:0,paddingLeft:0}}
                             bottomSeparator={'none'}
                             topSeparator={'none'}
                             />
                </View>
                <View style={{backgroundColor:'#141517',height:80,paddingTop:10,borderBottomWidth:1,borderBottomColor:'#24262F',paddingLeft:25,paddingRight:25}}>

                    {this.renderTitle(appState.lan.setting.title6,'#fff')}
                    <ListRow title={
                        <Input  style={{borderColor:'#ffffff00',width:screenW-100,backgroundColor:'#ffffff00',color:'#fff',paddingLeft:0}}
                                placeholder={appState.lan.setting.tip3}
                                onChangeText={text => this.setState({rePwd: text})}></Input>
                          }
                             style={{backgroundColor:'#ffffff00',paddingRight:0,paddingLeft:0}}
                             bottomSeparator={'none'}
                             topSeparator={'none'}
                             />
                </View>
                <View style={{paddingLeft:15,paddingRight:15,height:50,marginTop:unitWidth*200}}>
                    <TouchableOpacity  onPress={this.changePwd.bind(this)}>
                        <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={[this.state.enable?'#B9EEFD':'#393A43',this.state.enable?'#D885F8':'#393A43']} style={{width:screenW-30,height:50,borderRadius:25,justifyContent:'center',alignItems:'center'}}>
                            <Label style={{color:'#ffffff'}}>{appState.lan.setting.title11}</Label>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    }

}
