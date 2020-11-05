import React, {Component} from 'react';
import {NavigationPage, NavigationBar, Label, SegmentedBar, Carousel, Input, Overlay, Theme, Button} from 'teaset';
import {Image, StatusBar, View} from 'react-native';

import {safeAreaViewHeight, screenW, statusBarHeight} from '../comm/Unitl';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import InputScrollView from 'react-native-input-scroll-view';

import LinearGradient from "react-native-linear-gradient";
import {appState, mnemonicIndex, updateName} from '../comm/sdk';
import {FONT_M, FONT_R} from '../comm/Fonts';
import MnemonicCopyA from './MnemonicCopyA';
import PropTypes from 'prop-types';
import Toast from 'teaset/components/Toast/Toast';


export default class MnemonicCopy extends NavigationPage {


    static propTypes ={
        token:PropTypes.string,
    }

    static defaultProps={
        ...NavigationPage.defaultProps,
        token:''

    }


    constructor(props){
        super(props);
        this.state={
            activeIndex: 0,
            mnemonic:{
                mnemonic: "",
                private_key: "",
                address: ""
            },
            dataString : []
        }
        this.barCustomItems = [
            appState.lan.mnemonic.title1,
            appState.lan.mnemonic.title2,
        ];

    }

    mapRandom(arr) {
        arr.sort(function() {
            return Math.random() - 0.5 // 随机返回正或负值 达到排序的目的
        })
        return arr
    }

    loadData(){
        mnemonicIndex(this.props.token).then((respond)=>{
            if (respond.code==200){

                let array = respond.data.mnemonic.mnemonic.split(' ')
                this.setState({
                    mnemonic:respond.data.mnemonic,
                    dataString:array
                })
            }else {
                Toast.show({
                    text:respond.message,
                    position: 'center',
                })

            }
        })

    }







    showPop(type, modal, text,title) {
        let overlayView = (
            <Overlay.PopView
                style={{alignItems: 'center', justifyContent: 'center'}}
                type={type}
                modal={modal}
                ref={v => this.overlayPopView = v}
            >
                <View style={{backgroundColor: Theme.defaultColor,paddingLeft:20,paddingRight:20,paddingTop:20, width: screenW-100, height: 140, borderRadius: 15, justifyContent: 'space-between', alignItems: 'center'}}>
                    <View>
                        <Label style={{fontSize:12,color:'#333333',fontFamily:FONT_M}}  text={appState.lan.mnemonic.tip3} />
                        <Label style={{fontSize:12,marginTop:10,color:'#666666'}} numberOfLines={5} text={appState.lan.mnemonic.tip4} />
                    </View>
                    <TouchableOpacity onPress={() => this.overlayPopView && this.overlayPopView.close()} >
                        <View style={{height:44,borderTopColor:'#DDDEE2',borderTopWidth:1, width: screenW-100,alignItems:'center',justifyContent:'center'}}>
                            <Label style={{color:'#E74C5F',fontSize:15}}>
                                {appState.lan.mnemonic.title14}
                            </Label>

                        </View>

                    </TouchableOpacity>

                </View>
            </Overlay.PopView>
        );
        Overlay.show(overlayView);
    }



    renderItems() {

        let itemWidth = (screenW-50)/3
        return  this.state.dataString.map((item,index)=>{
            return <View style={{height:50,width:itemWidth,alignItems:'center',justifyContent:'center'}}>
                <Label style={{color:'#ffffff',fontSize:15}}>{item}</Label>
            </View>

        })
    }

    componentDidMount() {
        super.componentDidMount();
        this.loadData()
        this.showPop('zoomOut', true, 'Pop modal',appState.lan.apps.tip1)

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
                    <Label style={{fontSize:13,color:'#FFFFFF',lineHeight:20}} numberOfLines={10}>{appState.lan.mnemonic.tip1}</Label>

                    <View style={{width:screenW-50,height:210,
                        flexDirection:'row',flexWrap:'wrap',
                        marginTop:22,backgroundColor:'#19191E',borderColor:'#ffffff00'}}
                    >
                        {this.renderItems()}
                    </View>


                    <TouchableOpacity style={{width:screenW-50,height:50,backgroundColor:'#383838'
                        ,borderRadius:25,alignItems:'center',justifyContent:'center',marginTop:130}}
                                      onPress={()=>{this.navigator.push({view:<MnemonicCopyA dataString={this.mapRandom(this.state.dataString)}/>})}}
                    >
                        <Label style={{color:'#FFFFFF',fontSize:15}}>{appState.lan.mnemonic.title5}</Label>
                    </TouchableOpacity>
                </View>


                <View style={{height:50}}/>

            </InputScrollView>


        </View>
    }

}
