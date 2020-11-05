import React,{Component} from 'react'
import {View, ScrollView, Alert, Text,Clipboard, TouchableOpacity,Image,ImageBackground} from 'react-native';
import {NavigationBar, NavigationPage,ListRow,Toast} from 'teaset';
import Label from 'teaset/components/Label/Label';
import NavigationIconButton from '../../comm/views/NavigationIconButton';
import LinearGradient from "react-native-linear-gradient";
import {screenH, screenW, statusBarHeight, unitWidth} from '../../comm/Unitl';
import InputScrollView from 'react-native-input-scroll-view';
import QRCode from 'react-native-qrcode-svg';
import {appState, miningPoolIndex, userInvitationLink} from '../../comm/sdk';
import {FONT_M, FONT_R} from '../../comm/Fonts';
import PropTypes from 'prop-types';
export  default  class InvitePage extends NavigationPage{

    static propTypes={
       type:PropTypes.number
    }

    static defaultProps={
        ...NavigationPage.defaultProps,
        type:1  //1 热力邀请 2人气邀请

    }

    constructor(props){
        super(props)
        //this.inviteUrl = 'wwww.baidu.com/'+appState.inviteCode
        this.state={
            invitationLinkData:{
                invitation_code: "",
                reg_url: " "
            },
            content: 'Content will appear here'
        }
    }


    // state = {
    //     content: 'Content will appear here'
    // };
    //异步函数 箭头函数不需要绑定this了
    _setClipboardContent = async (string) => {

        // 将文字复制到系统的粘贴板上，在系统其他的地方可以粘贴
        Clipboard.setString(string);

        // 取出所存的值， Clipboard.getString()  返回的是以一个promise对象，所以可以在then里面存到state，或者使用同步存到state中
        try {
            let content = await Clipboard.getString();
            this.setState({content});
            Toast.message(appState.lan.apps.tip,'short','bottom')
        } catch (e) {
            this.setState({content:e.message});
        }
    };

    loadData(){
        userInvitationLink({}).then((respond)=>{
            if (respond.code==200){

                this.setState({
                    invitationLinkData:respond.data,
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
        super.componentDidMount();
        this.loadData()
    }


    render (){
        return <View style={{flex:1,backgroundColor:'#111214'}}>

            <Image style={{width:screenW,height:495,position:'absolute',left:0,top:0}} source={require('../../assert/home/bg_header.png')}/>
            <View style={{height:statusBarHeight+44,paddingLeft:25,paddingRight:50,paddingTop:statusBarHeight}}>
                <View style={{flexDirection:'row',alignItems:'center',height:44}}>
                    <NavigationIconButton icon={require('../../assert/home/index_ico_arrow_left.png')} onPress={()=>{this.navigator.pop()}}/>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Label  style={{fontSize:18,color:'#fff',fontFamily:FONT_R}} >{
                            //this.props.type==1?'热力邀请码':'人气邀请码'
                            appState.lan.invite.title
                        }</Label>
                    </View>
                </View>
            </View>

            <ScrollView>
                <View style={{flex:1,alignItems:'center'}}>
                    <ImageBackground style={{width:screenW-50,height:400,marginTop:32+50}} source={this.props.type==1?require('../../assert/mine/renlicode.png'):require('../../assert/mine/renqicode.png')}>
                        <View style={{height:300,width:screenW-50,justifyContent:'center',alignItems:'center'}}>
                            <View style={{marginTop:80,flexDirection:'row',alignItems:'center'}}>
                                <Image style={{width:50,height:12}} source={require('../../assert/mine/wallet_pic_collect_title_left.png')}/>
                                <Label style={{fontSize:13,color:'#fff',marginLeft:25,fontFamily:FONT_M}}>{appState.lan.invite.title}</Label>
                                <Image style={{width:50,height:12,marginLeft:25}} source={require('../../assert/mine/wallet_pic_collect_title_right.png')}/>
                            </View>
                            <View style={{height:20}}/>
                            <View style={{flexDirection:'row',width:screenW-50,justifyContent:'space-between'}}>
                                <View style={{width:75*unitWidth,height:50}}/>
                                <View style={{height:150*unitWidth,width:150*unitWidth,backgroundColor:'#F96FBF',alignItems:'center',justifyContent:'center',borderRadius:10}}>
                                    <QRCode
                                        value={this.state.invitationLinkData.reg_url}
                                        size={135}
                                    />
                                </View>

                                <View style={{alignItems:'flex-end',justifyContent:'flex-end'}}>

                                    <TouchableOpacity onPress={this._setClipboardContent.bind(this,this.state.invitationLinkData.invitation_code)}>
                                        <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#A9F2FF', '#E680FF']} style={{width:75*unitWidth,height:22,justifyContent:'center',alignItems:'center',borderBottomLeftRadius:11,borderTopLeftRadius:11}}>
                                            <Label style={{color:'#fff',fontSize:10}}>{appState.lan.invite.title1}</Label>
                                        </LinearGradient>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={this._setClipboardContent.bind(this,this.state.invitationLinkData.reg_url)}>
                                        <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#FB6FA3', '#FF5495']} style={{width:75*unitWidth,height:22,marginTop:13,justifyContent:'center',alignItems:'center',borderBottomLeftRadius:11,borderTopLeftRadius:11}}>
                                            <Label style={{color:'#fff',fontSize:10,fontFamily:FONT_M}}>{appState.lan.invite.title2}</Label>
                                        </LinearGradient>
                                    </TouchableOpacity>


                                </View>
                            </View>
                            <Label style={{marginTop:20,color:'#333333',fontSize:20,fontFamily:FONT_M}}>{this.state.invitationLinkData.invitation_code}</Label>
                            <Label style={{marginTop:10,color:'#fff',fontSize:10,fontFamily:FONT_M,maxWidth:screenW-60,alignItems:'center'}} numberOfLines={10} >{this.state.invitationLinkData.reg_url}</Label>
                        </View>

                    </ImageBackground>

                    <LinearGradient start={{x: 1, y: 0}} end={{x: 1, y: 1}} colors={['#FF20C9', '#9F04EF']}
                                    style={{width:64,height:64,justifyContent:'center',position:'absolute',borderRadius:32,padding:2,top:50}}>
                        <Image style={{width:60,height:60,borderRadius:30}}  source={require('../../assert/project/default_header.png')}/>
                    </LinearGradient>

                    {/*<Image style={{width:165,height:165,position:'absolute'}} source={require('../../assert/mine/wallet_pic_collect_logo.png')}/>*/}

                </View>

            </ScrollView>



        </View>
    }

}
