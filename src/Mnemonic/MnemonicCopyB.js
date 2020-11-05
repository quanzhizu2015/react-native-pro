import React, {Component} from 'react';
import {NavigationPage, NavigationBar, Label, SegmentedBar, Carousel, Input} from 'teaset';
import {Image, StatusBar, View} from 'react-native';

import {safeAreaViewHeight, screenW, statusBarHeight} from '../comm/Unitl';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import InputScrollView from 'react-native-input-scroll-view';

import LinearGradient from "react-native-linear-gradient";
import {appState} from '../comm/sdk';
import PropTypes from 'prop-types';



export default class MnemonicCopyB extends NavigationPage {


    static propTypes ={
        dataString:PropTypes.string,
    }

    static defaultProps={
        ...NavigationPage.defaultProps,
        dataString:''

    }

    constructor(props){
        super(props);
        this.state={
            activeIndex: 0,
        }
        this.barCustomItems = [
            appState.lan.mnemonic.title1,
            appState.lan.mnemonic.title2,
        ];

    }








    renderItems() {

        let itemWidth = (screenW-50)/3
        return   this.props.dataString.map((item,index)=>{
            return <View style={{height:50,width:itemWidth,alignItems:'center',justifyContent:'center'}}>
                <Label style={{color:'#ffffff',fontSize:15}}>{item}</Label>
            </View>

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
                    width:screenW-50,marginLeft:25,height:486+60+30+50}}>
                    <Label style={{fontSize:13,color:'#FFFFFF',lineHeight:20}} numberOfLines={10}>{appState.lan.mnemonic.tip2}</Label>

                    <View style={{width:screenW-50,height:210,
                        flexDirection:'row',flexWrap:'wrap',
                        marginTop:22,backgroundColor:'#19191E',borderColor:'#ffffff00'}}
                    >
                        {this.renderItems()}
                    </View>
                    <Label style={{marginTop:10,color:'#E74C5F',fontSize:12}}>{appState.lan.mnemonic.title7}</Label>


                    <TouchableOpacity style={{width:screenW-50,height:50,backgroundColor:'#383838'
                        ,borderRadius:25,alignItems:'center',justifyContent:'center',marginTop:130}}
                                      onPress={()=>{this.navigator.pop()}}
                    >
                        <Label style={{color:'#FFFFFF',fontSize:15}}>{appState.lan.mnemonic.title6}</Label>
                    </TouchableOpacity>
                </View>


                <View style={{height:50}}/>

            </InputScrollView>


        </View>
    }

}
