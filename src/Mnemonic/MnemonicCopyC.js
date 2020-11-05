import React, {Component} from 'react';
import {NavigationPage, NavigationBar, Label, SegmentedBar, Carousel, Input} from 'teaset';
import {Image, StatusBar, View} from 'react-native';

import {safeAreaViewHeight, screenW, statusBarHeight} from '../comm/Unitl';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import InputScrollView from 'react-native-input-scroll-view';

import LinearGradient from "react-native-linear-gradient";
import {appState, mnemonicBackUp, mnemonicCheck, setToken, updateName} from '../comm/sdk';

import PropTypes from 'prop-types';
import Toast from 'teaset/components/Toast/Toast';
import MnemonicCopyB from './MnemonicCopyB';


export default class MnemonicCopyC extends NavigationPage {



    constructor(props){
        super(props);
        this.state={

        }

    }

    loadData(){

        mnemonicBackUp({}).then((respond)=>{
            if (respond.code==200){

                updateName(null,1).then((respond)=>{

                })
                this.navigator.popToTop()


            }else {
                Toast.show({
                    text:respond.message,
                    position: 'center',
                })

            }

        })
    }



    render(){
        return <View style={{flex:1,backgroundColor:'#111214'}}>
            <StatusBar barStyle={'light-content'} />

            <View style={{width:screenW,height:statusBarHeight,backgroundColor:'#1E1D1E',position:'absolute',left:0,top:0}}/>
            <View style={{height:statusBarHeight+safeAreaViewHeight}}/>
            <View style={{height:44+statusBarHeight,width:screenW,flexDirection:'row',
                backgroundColor:'#1E1D1E',
                paddingLeft:25,paddingRight:25,alignItems:'center',justifyContent:'space-between'}}>


                <TouchableOpacity onPress={()=>{
                    this.navigator.pop()
                }}>
                    <Image style={{width:20,height:20}} source={require('../assert/home/index_ico_arrow_left.png')}/>
                </TouchableOpacity>

                <Label style={{color:'#ffffff',fontSize:16}}>{appState.lan.mnemonic.title4}</Label>
                <View style={{width:20,height:20}}></View>

            </View>
            <InputScrollView>
                <View style={{marginTop:15,
                    borderRadius:10,
                    alignItems:'center',
                    width:screenW-50,marginLeft:25,height:486+60+30+50}}>
                    <Image style={{width:32,height:32,marginTop:38}} source={require('../assert/mnemonic/redCheck.png')}/>
                    <Label style={{marginTop:36,color:'#E74E61',fontSize:18}}>{appState.lan.mnemonic.tip6}</Label>
                    <Label style={{marginTop:24,color:'#999999',fontSize:15,lineHeight:20}} numberOfLines={10}>{appState.lan.mnemonic.tip7}</Label>
                    <TouchableOpacity style={{width:screenW-50,height:50,backgroundColor:'#383838'
                        ,borderRadius:25,alignItems:'center',justifyContent:'center',marginTop:200}}
                                      onPress={()=>{
                                          this.loadData()
                                      }}
                    >
                        <Label style={{color:'#FFFFFF',fontSize:15}}>{appState.lan.mnemonic.title12}</Label>
                    </TouchableOpacity>
                </View>


                <View style={{height:50}}/>

            </InputScrollView>


        </View>
    }

}
