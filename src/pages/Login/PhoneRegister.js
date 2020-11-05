import React,{Component} from 'react'
import {View} from 'react-native'
import {InputItem, TitleInputItem} from '../../comm/views/InputItem';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import Label from 'teaset/components/Label/Label';
import {FONT_M} from '../../comm/Fonts';
import Input from 'teaset/components/Input/Input';
import {Device_No, screenW} from '../../comm/Unitl';
import VerifyCode from '../../comm/views/VerifyCode';
import SelectButton from '../../comm/views/SelectButton';
import {appState, register, sendMsg} from '../../comm/sdk';
import LinearGradient from "react-native-linear-gradient";
import Toast from 'teaset/components/Toast/Toast';
import {isEmail} from '../../comm/Tool';
import PropTypes from 'prop-types';
import {isIos} from 'react-native-calendars/src/expandableCalendar/commons';


export default class PhoneRegister extends Component{

    static propTypes ={
        callBackAction:PropTypes.func,
    }

    static defaultProps={
        callBackAction:()=>{}
    }

    constructor(props) {
        super(props);
        this.state ={
            codeSecureTextEntry:false,
            tradeSecureTextEntry:false,
            phone:'',
            username:'',
            code:'',
            password:'',
            pay_password:'',
            inviter:''
        }
    }

    sendMsg(){
        if(!this.state.phone.trim()){
            Toast.show({
                text:appState.lan.register.tip1,
                position: 'center',
            })
            return false
        }
        sendMsg({
            area:'86',
            mobile: this.state.phone,
            type: 1
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

    registerAction(){
        if(!this.state.phone.trim()){
            Toast.show({
                text:appState.lan.register.tip1,
                position: 'center',
            })

            return false
        }
        // if(!this.state.username.trim()){
        //     Toast.show({
        //         text:appState.lan.register.tip13,
        //         position: 'center',
        //     })
        //
        //     return false
        // }

        if(!this.state.code.trim()){
            Toast.show({
                text:appState.lan.register.tip5,
                position: 'center',
            })

            return false
        }

        if(!this.state.password.trim()){
            Toast.show({
                text:appState.lan.register.tip7,
                position: 'center',
            })

            return false
        }

        if(!this.state.pay_password.trim()){
            Toast.show({
                text:appState.lan.register.tip9,
                position: 'center',
            })

            return false
        }

        // if(!this.state.inviter.trim()){
        //     Toast.show({
        //         text:appState.lan.register.tip11,
        //         position: 'center',
        //     })
        //
        //     return false
        // }



        register({
            area:'86',
            mobile: this.state.phone,
            //username:this.state.username,
            password: this.state.password,
            pay_password: this.state.pay_password,
            code:this.state.code,
            device_no:Device_No,
            inviter: this.state.inviter,

        }).then((respond)=>{

            if (respond.code==200){
                // this.setState({
                //     enable:true
                // })
                Toast.show({
                    text:respond.message,
                    position: 'center',
                })
                this.props.callBackAction(respond.data.token)
            }else {
                // this.setState({
                //     enable:false
                // })
                Toast.show({
                    text:respond.message,
                    position: 'center',
                })

            }

        })


    }

    render(){
        return <View>
            <View style={{paddingLeft:23,paddingRight:23}}>
                <InputItem
                    leftElement={
                        <TouchableOpacity>
                            <Label style={{fontFamily:FONT_M,fontSize:13,color:'#fff'}}>+86</Label>
                        </TouchableOpacity>
                    }
                    detailElement={
                        <View>
                            <Input
                                style={{borderColor:'#ffffff00',fontSize:10,backgroundColor:'#ffffff00',color:'#fff',width:screenW-50-46}}
                                placeholder={appState.lan.register.tip1}
                                placeholderTextColor={'#9E9E9E'}
                                keyboardType = 'email-address'
                                onChangeText={text => this.setState({phone: text})}
                            />
                        </View>
                    }
                />


                {/*<TitleInputItem*/}
                {/*    title={appState.lan.register.tip2}*/}
                {/*    detailElement={*/}
                {/*        <View>*/}
                {/*            <Input*/}
                {/*                style={{borderColor:'#ffffff00',paddingLeft:0,fontSize:10,backgroundColor:'#ffffff00',color:'#fff',width:screenW-50-46}}*/}
                {/*                placeholder={appState.lan.register.tip3}*/}
                {/*                placeholderTextColor={'#9E9E9E'}*/}
                {/*                keyboardType = 'email-address'*/}
                {/*                onChangeText={text => this.setState({username: text})}*/}
                {/*            />*/}
                {/*        </View>*/}
                {/*    }*/}
                {/*/>*/}

                <TitleInputItem
                    title={appState.lan.register.tip4}
                    detailElement={
                        <View>
                            <Input
                                style={{borderColor:'#ffffff00',paddingLeft:0,fontSize:10,backgroundColor:'#ffffff00',color:'#fff',width:screenW-50-46-90}}
                                placeholder={appState.lan.register.tip5}
                                placeholderTextColor={'#9E9E9E'}
                                keyboardType = 'email-address'
                                onChangeText={text => this.setState({code: text})}
                            />
                        </View>
                    }
                    rightElement={
                        <View style={{height:30,alignItems:'center'}}>
                            <VerifyCode bgColor={'#CFABFF'} onPress={this.sendMsg.bind(this)} codeBtnText={appState.lan.apps.title}/>
                        </View>
                    }
                />

                <TitleInputItem
                    title={appState.lan.register.tip6}
                    detailElement={
                        <View>
                            <Input
                                style={{borderColor:'#ffffff00',paddingLeft:0,fontSize:10,backgroundColor:'#ffffff00',color:'#fff',width:screenW-50-46-20}}
                                placeholder={appState.lan.register.tip7}
                                placeholderTextColor={'#9E9E9E'}
                                keyboardType = {isIos?'email-address':'default'}
                                secureTextEntry={this.state.codeSecureTextEntry}
                                onChangeText={text => this.setState({password: text})}
                            />
                        </View>
                    }
                    rightElement={
                        <View style={{height:30,alignItems:'center'}}>
                            <SelectButton bgColor={'#CFABFF'} onPress={()=>{
                                this.setState({
                                    codeSecureTextEntry:!this.state.codeSecureTextEntry
                                })
                            }}/>
                        </View>
                    }
                />

                <TitleInputItem
                    title={appState.lan.register.tip8}
                    isShowBottomLine={true}
                    detailElement={
                        <View>
                            <Input
                                style={{borderColor:'#ffffff00',paddingLeft:0,fontSize:10,backgroundColor:'#ffffff00',color:'#fff',width:screenW-50-46-20}}
                                placeholder={appState.lan.register.tip9}
                                placeholderTextColor={'#9E9E9E'}
                                keyboardType = {isIos?'email-address':'default'}
                                secureTextEntry={this.state.tradeSecureTextEntry}
                                onChangeText={text => this.setState({pay_password: text})}
                            />
                        </View>
                    }
                    rightElement={
                        <View style={{height:30,alignItems:'center'}}>
                            <SelectButton bgColor={'#CFABFF'} onPress={()=>{
                                this.setState({
                                    tradeSecureTextEntry:!this.state.tradeSecureTextEntry
                                })
                            }}/>
                        </View>
                    }
                />

                <TitleInputItem
                    title={appState.lan.register.tip10}
                    isShowBottomLine={false}
                    detailElement={
                        <View>
                            <Input
                                style={{borderColor:'#ffffff00',paddingLeft:0,fontSize:10,backgroundColor:'#ffffff00',color:'#fff',width:screenW-120}}
                                placeholder={appState.lan.register.tip11}
                                placeholderTextColor={'#9E9E9E'}
                                keyboardType = 'email-address'
                                onChangeText={text => this.setState({inviter: text})}
                            />
                        </View>
                    }
                />


            </View>
            <View style={{alignItems:'center',marginTop:23+30}}>
                <TouchableOpacity onPress={this.registerAction.bind(this)}>
                    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#A9F2FF', '#E680FF']} style={{width:screenW-50,height:50,borderRadius:25,justifyContent:'center',alignItems:'center'}}>
                        <Label
                            style={{color:'#FFFFFF',fontSize:15}}>
                            {appState.lan.register.title}
                        </Label>
                    </LinearGradient>

                </TouchableOpacity>
            </View>
        </View>
    }


}
