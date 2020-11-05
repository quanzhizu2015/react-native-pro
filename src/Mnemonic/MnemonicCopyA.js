import React, {Component} from 'react';
import {NavigationPage, NavigationBar, Label, SegmentedBar, Carousel, Input} from 'teaset';
import {Image, StatusBar, View} from 'react-native';

import {safeAreaViewHeight, screenW, statusBarHeight} from '../comm/Unitl';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import InputScrollView from 'react-native-input-scroll-view';

import LinearGradient from "react-native-linear-gradient";
import {appState, mnemonicCheck} from '../comm/sdk';
import {MItem1, MItem2} from './MnemonicItem';
import MnemonicCopyC from './MnemonicCopyC';
import PropTypes from 'prop-types';
import MnemonicCopyB from './MnemonicCopyB';
import Toast from 'teaset/components/Toast/Toast';


export default class MnemonicCopyA extends NavigationPage {


    static propTypes ={
        dataString:PropTypes.array,
    }

    static defaultProps={
        ...NavigationPage.defaultProps,
        dataString:[]

    }


    constructor(props){
        super(props);
        this.state={
            activeIndex: 0,
            selectedData:[]
        }
        this.barCustomItems = [
            appState.lan.mnemonic.title1,
            appState.lan.mnemonic.title2,
        ];

    }


    loadData(){
        if(this.state.selectedData.length<12){
            Toast.show({
                text:appState.lan.mnemonic.tip9,
                position: 'center',
            })

            return
        }
        mnemonicCheck({mnemonic:this.state.selectedData.join(' ')}).then((respond)=>{
            if (respond.code==200){

                if (respond.data.check==1){
                    this.navigator.push({view:<MnemonicCopyC />})

                }else {
                    this.navigator.push({view:<MnemonicCopyB dataString={this.state.selectedData}/>})
                }

            }else {
                Toast.show({
                    text:respond.message,
                    position: 'center',
                })

            }

        })
    }






    renderItems() {

        let itemWidth = (screenW-50)/3
        return   this.props.dataString.map((item,index)=>{
            return <View style={{height:50,width:itemWidth,alignItems:'center',justifyContent:'center'}}>
                <MItem1 style={{color:'#ffffff',fontSize:15}} item={item} onPress={(data)=>{

                    if (this.state.selectedData.length<12){
                        let array = new Array(...this.state.selectedData)
                        array.push(data)

                        this.setState({selectedData:array})
                    }

                }}/>
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
                    <Label style={{fontSize:13,color:'#FFFFFF',lineHeight:20}} >{appState.lan.mnemonic.tip2}</Label>

                    <View style={{width:screenW-50,height:210,
                        flexDirection:'row',flexWrap:'wrap',
                        marginTop:22,backgroundColor:'#19191E',borderColor:'#ffffff00'}}
                    >

                        {
                            this.state.selectedData.map((item,index)=>{
                                return <MItem2 item={item} onPress={(c)=>{

                                    let array  = new Array()
                                   this.state.selectedData.map((item1,index)=>{
                                        if (item != item1){
                                            array.push(item1)
                                        }
                                    })
                                    this.setState({selectedData:array})

                                }}/>
                            })
                        }


                    </View>
                    <View style={{width:screenW-50,height:210,
                        flexDirection:'row',flexWrap:'wrap',
                        marginTop:22}}
                    >

                        {this.renderItems()}

                    </View>


                    <TouchableOpacity style={{width:screenW-50,height:50,backgroundColor:'#383838'
                        ,borderRadius:25,alignItems:'center',justifyContent:'center',marginTop:35}}
                                      onPress={()=>{

                                          this.loadData()
                                      }}
                    >
                        <Label style={{color:'#FFFFFF',fontSize:15}}>{appState.lan.mnemonic.title5}</Label>
                    </TouchableOpacity>
                </View>


                <View style={{height:100}}/>

            </InputScrollView>


        </View>
    }

}
