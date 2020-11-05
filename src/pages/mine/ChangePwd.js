import React,{Component} from 'react'
import {View, Image, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {NavigationPage, ListRow, NavigationBar,Input,Button} from 'teaset';
import Label from 'teaset/components/Label/Label';
import NavigationIconButton from '../../comm/views/NavigationIconButton';
import GradientCode from '../../comm/views/GradientCode';
import {screenH, screenW, unitHeight, unitWidth} from '../../comm/Unitl';
import LinearGradient from 'react-native-linear-gradient';
import {appState, changePassword, sendMsg} from '../../comm/sdk';
import Toast from 'teaset/components/Toast/Toast';
import {isEmail} from '../../comm/Tool';
import {FONT_R} from '../../comm/Fonts';

export default  class ChangePwd extends NavigationPage{


    constructor(props){
        super(props)
        this.state={
            oldPwd:'',
            newPassword:'',
            repPwd:''

        }
    }

    renderNavigationBar(): * {
        return  <NavigationBar
            title={<View><Label  style={{fontSize:18,color:'#fff',fontFamily:FONT_R}}>{appState.lan.setting.title1}</Label></View>}
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
    renderDetail(title,color){
        return <Label style={{fontSize: 15, color: color,fontFamily:FONT_R}} text={title} ellipsizeMode={'middle'}/>
    }

    renderAearTitle(title,color){
        return <TouchableOpacity onPress={()=>{}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Label style={{fontSize: 12, color: color}} text={title} />
                <Image style={{width:8,height:8,marginLeft:10}} source={require('../../assert/mine/wallet_ico_arrow_down.png')}/>
            </View>
        </TouchableOpacity>
    }

    changePwd() {

        if(!this.state.oldPwd.trim()){
            Toast.show({
                text:appState.lan.setting.tip1,
                position: 'center',
            })
            return
        }

        if(!this.state.newPassword.trim()){
            Toast.show({
                text:appState.lan.setting.tip2,
                position: 'center',
            })

            return
        }
        if(!this.state.repPwd.trim()){
            Toast.show({
                text:appState.lan.setting.tip3,
                position: 'center',
            })

            return
        }
        changePassword({
            old_password:this.state.oldPwd,
            new_password:this.state.newPassword,
            new_password_confirmation:this.state.repPwd,

        }).then((respond)=>{
            if (respond.code==200){

                this.navigator.pop();

            }else {
                Toast.show({
                    text:respond.message,
                    position: 'center',
                })

            }
        })

    }





    renderPage(): null {
        return <View style={{flex:1,backgroundColor:'#111214'}}>
            <ScrollView style={{flex:1,backgroundColor:'#111214'}}>
                <View style={{height:10}}/>
             <ListRow title={this.renderTitle(appState.lan.setting.title4,'#fff')}
                         style={{backgroundColor:'#141517',height:50,borderBottomWidth:1,borderBottomColor:'#24262F',paddingLeft:25,paddingRight:25}}
                         bottomSeparator={'none'}
                         topSeparator={'none'}
                         detail={
                             <View style={{flexDirection:'row',width:screenW-120,justifyContent:'space-between',alignItems:'center'}}>
                                 <Input style={{borderColor:'#ffffff00',backgroundColor:'#ffffff00',color:'#fff',width:screenW-120}}
                                        placeholder={appState.lan.setting.tip1}
                                        secureTextEntry={true}
                                     //keyboardType = 'email-address'
                                        onChangeText={text => this.setState({oldPwd: text})}></Input>

                             </View>
                         }/>
                <ListRow title={this.renderTitle(appState.lan.setting.title5,'#fff')}
                         style={{backgroundColor:'#141517',height:50,borderBottomWidth:1,borderBottomColor:'#24262F',paddingLeft:25,paddingRight:25}}
                         bottomSeparator={'none'}
                         topSeparator={'none'}
                         detail={
                             <View style={{flexDirection:'row',width:screenW-120,justifyContent:'space-between',alignItems:'center'}}>
                                 <Input style={{borderColor:'#ffffff00',backgroundColor:'#ffffff00',color:'#fff',width:screenW-120}}
                                        placeholder= {appState.lan.setting.tip2}
                                        secureTextEntry={true}
                                     //keyboardType = 'email-address'
                                        onChangeText={text => this.setState({newPassword: text})}></Input>

                             </View>
                         }/>

                <ListRow title={this.renderTitle(appState.lan.setting.title6,'#fff')}
                         style={{backgroundColor:'#141517',height:50,borderBottomWidth:1,borderBottomColor:'#24262F',paddingLeft:25,paddingRight:25}}
                         bottomSeparator={'none'}
                         topSeparator={'none'}
                         detail={
                             <View style={{flexDirection:'row',width:screenW-120,justifyContent:'space-between',alignItems:'center'}}>
                                 <Input style={{borderColor:'#ffffff00',backgroundColor:'#ffffff00',color:'#fff',width:screenW-120}}
                                        placeholder={appState.lan.setting.tip3}
                                        secureTextEntry={true}
                                     //keyboardType = 'email-address'
                                        onChangeText={text => this.setState({repPwd: text})}></Input>

                             </View>
                         }/>

                <View style={{paddingLeft:15,paddingRight:15,height:50,marginTop:unitWidth*200}}>
                    <TouchableOpacity onPress={()=>{this.changePwd()}}>
                        <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={[ '#B9EEFD','#D885F8' ]} style={{width:screenW-30,height:50,borderRadius:25,justifyContent:'center',alignItems:'center'}}>
                            <Label style={{color:'#ffffff'}}>{appState.lan.setting.title11}</Label>

                        </LinearGradient>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    }

}
