import React, {Component} from 'react';
import {NavigationPage} from 'teaset';
import {Image, StatusBar, View,ScrollView,ImageBackground} from 'react-native';
import {safeAreaViewHeight, screenH, screenW, statusBarHeight} from '../../comm/Unitl';
import Label from 'teaset/components/Label/Label';
import {appState} from '../../comm/sdk';
import {screenHeight} from 'react-native-calendars/src/expandableCalendar/commons';
import {FONT_S} from '../../comm/Fonts';


export default class TradePage extends NavigationPage {

    constructor(props){
        super(props);

    }

    render(){
        return <View style={{flex:1,backgroundColor:'#111214'}}>
            <StatusBar barStyle={'light-content'} />

            <ImageBackground style={{width:screenW,height:screenH}} resizeMode={'contain'} source={require('../../assert/mnemonic/trade.png')}>

                {/*<Image style={{width:screenW,height:495,position:'absolute',left:0,top:0}} source={require('../../assert/home/bg_header.png')}/>*/}
                {/*<View style={{height:statusBarHeight+safeAreaViewHeight}}/>*/}
                {/*/!*<View style={{height:44,alignItems:'center',justifyContent:'center'}}>*!/*/}
                {/*/!*    <Label style={{fontSize:18,color:'#fff'}}>{appState.lan.trade.title}</Label>*!/*/}
                {/*/!*</View>*!/*/}
                {/*<View style={{alignItems:'center',justifyContent:'center',flex:1}}>*/}
                {/*    <Image style={{width:110,height:109}} source={require('../../assert/trade/pic_record_defaultp.png')}></Image>*/}
                {/*    <Label style={{fontSize:18,color:'#666666',marginTop:15}}>{appState.lan.trade.tip}</Label>*/}


                {/*</View>*/}

                <View style={{backgroundColor:'#000000b0',alignItems:'center',justifyContent:'center',width:screenW,height:screenH}}>
                    <Label style={{color:'#DDDDDD',fontSize:18,textAlign:'center',lineHeight:25}} numberOfLines={5}>{appState.lan.trade.title1}</Label>
                    <Label style={{color:'#FFFFFF',fontSize:36,textAlign:'center',lineHeight:50,fontFamily:FONT_S}}>{appState.lan.trade.title2}</Label>

                </View>
            </ImageBackground>



        </View>
    }

}
