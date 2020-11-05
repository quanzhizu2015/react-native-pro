import React, {Component} from 'react';
import {NavigationPage, NavigationBar, Label, SegmentedBar, Carousel, Input} from 'teaset';
import {Image, StatusBar, View} from 'react-native';

import {safeAreaViewHeight, screenW, statusBarHeight} from '../comm/Unitl';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import InputScrollView from 'react-native-input-scroll-view';

import LinearGradient from "react-native-linear-gradient";
import {appState, mnemonicIndex, setToken} from '../comm/sdk';

import PropTypes from 'prop-types';
import {MItem3} from './MnemonicItem';
import Toast from 'teaset/components/Toast/Toast';


export default class MnemonicCopyD extends NavigationPage {



    constructor(props){
        super(props);
        this.state={

            mnemonic:{
                mnemonic: "",
                private_key: "",
                address: ""
            },
            data:[
                {
                    title:appState.lan.mnemonic.title9,
                    content:''
                },
                {
                    title:appState.lan.mnemonic.title10,
                    content:''
                },
                {
                    title:appState.lan.mnemonic.title11,
                    content:''
                }


            ]

        }


    }


    loadData(){
        mnemonicIndex(this.props.token).then((respond)=>{
            if (respond.code==200){

                let array = [
                    {
                        title:appState.lan.mnemonic.title9,
                        content:respond.data.mnemonic.mnemonic
                    },
                    {
                        title:appState.lan.mnemonic.title10,
                        content:respond.data.mnemonic.address
                    },
                    {
                        title:appState.lan.mnemonic.title11,
                        content:respond.data.mnemonic.private_key
                    }


                ]
                this.setState({
                    mnemonic:respond.data.mnemonic,
                    data:array
                })
            }else {
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
                    <Image style={{width:32,height:32,marginTop:38}} source={require('../assert/mnemonic/warning.png')}/>
                    <Label style={{marginTop:36,color:'#E74E61',fontSize:13}}  numberOfLines={5}>{appState.lan.mnemonic.tip5}</Label>
                    <View>
                        {this.state.data.map((item,index)=>{

                            return <MItem3 style={{marginTop:20}} item={item} key={'item'+index}/>

                        })}
                    </View>
                </View>


                <View style={{height:50}}/>

            </InputScrollView>


        </View>
    }

}
