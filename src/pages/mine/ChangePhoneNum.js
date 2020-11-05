import React,{Component} from 'react'
import {View,Image,TouchableOpacity,ScrollView} from 'react-native'
import {NavigationPage, ListRow, NavigationBar,Input,Button} from 'teaset';
import Label from 'teaset/components/Label/Label';
import NavigationIconButton from '../../comm/views/NavigationIconButton';
import GradientCode from '../../comm/views/GradientCode';
import {screenH, screenW, unitHeight, unitWidth} from '../../comm/Unitl';
import LinearGradient from 'react-native-linear-gradient';
import {appState, changeMobile, sendMsg, setToken} from '../../comm/sdk';
import Toast from 'teaset/components/Toast/Toast';
import {isEmail} from '../../comm/Tool';
import {FONT_R} from '../../comm/Fonts';
import PropTypes from 'prop-types';
export default  class ChangePhoneNum extends NavigationPage{

    static propTypes={

        callBackAction:PropTypes.func

    }

    static defaultProps={
        ...NavigationPage.defaultProps,
        callBackAction:()=>{},
    }

    constructor(props){
        super(props)
        this.state={
            old_mobile_code:'',
            new_area:'86',
            new_mobile:'',
            new_mobile_code:'',
            enable:false
        }
    }

    changePhone=async ()=>{

        if (this.state.enable == false){

            return;
        }

        if(!this.state.old_mobile_code.trim()){
            Toast.show({
                text:appState.lan.setting.tip5,
                position: 'center',
            })
            return
        }

        if(!this.state.new_area.trim()){
            Toast.show({
                text:appState.lan.setting.tip7,
                position: 'center',
            })
            return
        }

        if(!this.state.new_mobile.trim()){
            Toast.show({
                text:appState.lan.setting.tip6,
                position: 'center',
            })
            return
        }
        if(!this.state.new_mobile_code.trim()){
            Toast.show({
                text:appState.lan.setting.tip8,
                position: 'center',
            })
            return
        }

        changeMobile({
            old_mobile_code:this.state.old_mobile_code,
            new_area:this.state.new_area,
            new_mobile:this.state.new_mobile,
            new_mobile_code:this.state.new_mobile_code,

        }).then((respond)=>{
            if (respond.code==200){
                Toast.show({
                    text:appState.lan.setting.tip9,
                    position: 'center',
                })
                this.navigator.pop();
                this.props.callBackAction()

                setToken(null,null,null)

            }else {
                Toast.show({
                    text:respond.message,
                    position: 'center',
                })

            }

        })


    }
// | area   | string | 区号                                                         |
// | mobile | string | 手机号码或者邮箱                                             |
// | type   | int    | 1-注册 2-更改绑定手机旧手机验证码 3-更改绑定手机新手机验证码 4-忘记密码 5-修改交易密码 6-转账 |

    sendMsg(phone,type){

        if(!phone.trim()){
            Toast.show({
                text:appState.lan.register.tip1,
                position: 'center',
            })
            return
        }
        sendMsg({
            area: appState.area,
            mobile:phone,
            type: type
        }).then((respond)=>{
            if (respond.code==200){
                if(phone == this.state.new_mobile){
                    this.setState({
                        enable:true
                    })
                }
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
            title={<View><Label style={{fontSize:18,color:'#fff',fontFamily:FONT_R}}>{appState.lan.setting.title3}</Label></View>}
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
                <ListRow title={this.renderTitle(appState.lan.setting.title7+'  '+appState.phone, '#999999')}
                         style={{backgroundColor:'#ffffff00',height:50,borderBottomWidth:1,borderBottomColor:'#24262F',paddingLeft:25,paddingRight:25}}
                         bottomSeparator={'none'}
                         topSeparator={'none'}
                         bottomSeparator={'none'}/>

                <View style={{backgroundColor:'#141517',height:80,paddingTop:10,borderBottomWidth:1,borderBottomColor:'#24262F',paddingLeft:25,paddingRight:25}}>

                    {this.renderTitle(appState.lan.setting.title8,'#fff')}
                    <ListRow title={
                        <Input style={{borderColor:'#ffffff00',backgroundColor:'#ffffff00',color:'#fff',paddingLeft:0}}
                               placeholder={appState.lan.setting.tip5+'        '}
                               onChangeText={text => this.setState({old_mobile_code: text})}></Input>
                    }
                             style={{backgroundColor:'#ffffff00',paddingRight:0,paddingLeft:0}}
                             bottomSeparator={'none'}
                             topSeparator={'none'}
                             detail={
                                 <GradientCode bgColor={'#C9ACF9'} bgColor1={'#C9ACF9'} onPress={()=>{this.sendMsg(appState.phone,2)}}/>
                             }/>
                </View>

                <View style={{backgroundColor:'#141517',height:80,paddingTop:10,borderBottomWidth:1,borderBottomColor:'#24262F',paddingLeft:25,paddingRight:25}}>

                    {this.renderTitle(appState.lan.setting.title9, '#fff')}
                    <ListRow title={this.renderAearTitle('+86','#fff')}
                             style={{backgroundColor:'#ffffff00',paddingRight:0,paddingLeft:0}}
                             bottomSeparator={'none'}
                             topSeparator={'none'}
                             detail={
                                 <View style={{flexDirection:'row',width:screenW-110,justifyContent:'space-between',alignItems:'center'}}>
                                     <Input style={{borderColor:'#ffffff00',backgroundColor:'#ffffff00',color:'#fff'}}
                                            placeholder={appState.lan.setting.tip6}
                                            onChangeText={text => this.setState({new_mobile: text})}></Input>
                                 </View>
                             }/>
                </View>
                <View style={{backgroundColor:'#141517',height:80,paddingTop:10,borderBottomWidth:1,borderBottomColor:'#24262F',paddingLeft:25,paddingRight:25}}>

                    {this.renderTitle(appState.lan.setting.title10,'#fff')}
                    <ListRow title={
                        <Input  style={{borderColor:'#ffffff00',backgroundColor:'#ffffff00',color:'#fff',paddingLeft:0}}
                                placeholder={appState.lan.setting.tip5}

                                onChangeText={text => this.setState({new_mobile_code: text})}></Input>

                    }
                             style={{backgroundColor:'#ffffff00',paddingRight:0,paddingLeft:0}}
                             bottomSeparator={'none'}
                             topSeparator={'none'}
                             detail={
                                 <GradientCode bgColor={'#C9ACF9'} bgColor1={'#C9ACF9'} onPress={()=>{this.sendMsg(this.state.new_mobile,3)}}/>
                             }/>
                </View>
                <View style={{paddingLeft:15,paddingRight:15,height:50,marginTop:unitWidth*200}}>
                    <TouchableOpacity  onPress={this.changePhone.bind(this)}>
                        <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={[this.state.enable?'#B9EEFD':'#393A43',this.state.enable?'#D885F8':'#393A43']} style={{width:screenW-30,height:50,borderRadius:25,justifyContent:'center',alignItems:'center'}}>
                            <Label style={{color:'#ffffff'}}>{appState.lan.setting.title11}</Label>


                        </LinearGradient>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    }

}
