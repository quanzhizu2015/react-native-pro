import React,{Component} from 'react'
import {View, ScrollView, Alert, Text,Clipboard, TouchableOpacity,Image,ImageBackground} from 'react-native';
import {NavigationBar, NavigationPage,ListRow,Toast} from 'teaset';
import Label from 'teaset/components/Label/Label';
import NavigationIconButton from '../../comm/views/NavigationIconButton';
import LinearGradient from "react-native-linear-gradient";
import {screenH, screenW, statusBarHeight} from '../../comm/Unitl';
import QRCode from 'react-native-qrcode-svg';
import {appState, appUrl, coinBtcAddress, walletAddress} from '../../comm/sdk';
import {FONT_M, FONT_R} from '../../comm/Fonts';
import PropTypes from 'prop-types';


export  default  class ReceivePage extends NavigationPage{

    static propTypes={
        currency:PropTypes.string
    }

    static defaultProps={
        ...NavigationPage.defaultProps,
        currency:'',
    }

    constructor(props){
        super(props)
        this.state={
            btc_address:' ',
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
            Toast.message(appState.lan.mine.title23,'short','bottom')
        } catch (e) {
            this.setState({content:e.message});
        }
    };

    loadData(){
        walletAddress(
            {
                currency:this.props.currency
            }
        ).then((respond)=>{
            if (respond.code==200){
                this.setState({
                    btc_address:respond.data.address
                })
            }else {

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
                    <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
                        <Label  style={{fontSize:18,color:'#fff',fontFamily:FONT_R}} >{appState.lan.mine.title20}</Label>

                    </View>
                </View>

            </View>

            <ScrollView>

                <View style={{flex:1,alignItems:'center'}}>

                    <ImageBackground style={{width:screenW-50,height:450,marginTop:80}} source={require('../../assert/mine/wallet_pic_collect_card.png')}>
                        <View style={{height:300,width:screenW-40,justifyContent:'center',alignItems:'center'}}>
                            <View style={{marginTop:80,flexDirection:'row'}}>
                                <Image style={{width:50,height:12}} source={require('../../assert/mine/wallet_pic_collect_title_left.png')}/>
                                <Label style={{fontSize:16,color:'#333333',marginLeft:25}}>{appState.lan.mine.title21}</Label>
                                <Image style={{width:50,height:12,marginLeft:25}} source={require('../../assert/mine/wallet_pic_collect_title_right.png')}/>
                            </View>
                            <View style={{height:20}}/>
                            <QRCode
                                value={this.state.btc_address}
                                size={140}
                            />

                            <Label style={{marginTop:20,color:'#999999',fontSize:12,fontFamily:FONT_R,maxWidth:screenW-60,alignItems:'center'}} numberOfLines={10} >{this.state.btc_address}</Label>
                        </View>
                        <View style={{alignItems:'center',marginTop:40,width:screenW-50,paddingLeft:40,paddingRight:40,flexDirection:'row',justifyContent:'space-between'}}>

                            <TouchableOpacity onPress={this._setClipboardContent.bind(this,this.state.btc_address)}>
                                <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#B9EEFD', '#D885F8', ]} style={{width:screenW-50-90,height:44,justifyContent:'center',alignItems:'center',borderRadius:22}}>
                                    <Label style={{color:'#fff',fontSize:12,fontFamily:FONT_M}}>{appState.lan.mine.title22}</Label>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                    </ImageBackground>


                    <Image style={{width:100,height:100,position:'absolute',top:20}} source={require('../../assert/mine/wallet_pic_collect_logo.png')}/>

                </View>
            </ScrollView>

        </View>
    }

}
