import React, {Component} from 'react';
import {NavigationPage,NavigationBar,Label,SegmentedBar,Carousel} from 'teaset';
import {Image, StatusBar, View} from 'react-native';

import {safeAreaViewHeight, screenW, statusBarHeight} from '../comm/Unitl';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import InputScrollView from 'react-native-input-scroll-view';

import LinearGradient from "react-native-linear-gradient";
import {appState} from '../comm/sdk';
import MLogin from './MLogin';
import PLogin from './PLogin';


export default class MnemonicLogin extends NavigationPage {

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



    onSegmentedBarChange(index) {
        if (index != this.state.activeIndex) {
            this.setState({activeIndex: index});
            if (this.refs.carousel) {
                this.refs.carousel.scrollToPage(index, false);
            }
        }
    }

    onCarouselChange(index) {
        index != this.state.activeIndex && this.setState({activeIndex: index});
    }


    renderCustomItems() {

        let {activeIndex} = this.state;
        return this.barCustomItems.map((item, index) => {
            let isActive = index == activeIndex;
            let tintColor = isActive ? '#fff' : '#999999';
            return (
                <View key={index} style={{paddingBottom:8,width:(screenW-50-46)/2,alignItems:'center'}}>

                    <Label style={{color: tintColor, paddingTop: 4,fontSize:16}} text={item} />
                </View>
            );
        });
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

                <Label style={{color:'#ffffff',fontSize:16}}>{appState.lan.mnemonic.title}</Label>
                <View style={{width:20,height:20}}></View>

            </View>
            <InputScrollView>
                <View style={{marginTop:15,
                    borderRadius:10,
                    width:screenW-50,marginLeft:25,height:486+60+30+50}}>
                    {/*<View style={{borderRadius:10,*/}
                    {/*    width:screenW-50,left:0,top:0,height:486+60-64-70,backgroundColor:'#1E1D1E',position:'absolute'}}/>*/}
                    {/*<Image style={{height:41,width:58,marginTop:23,marginLeft:23}} source={require('../../assert/home/home_logo.png')}/>*/}
                    {/*<PhoneRegister callBackAction={()=>{this.navigator.pop()}}/>*/}
                    <SegmentedBar
                        justifyItem={'fixed'}
                        indicatorType={'customWidth'}
                        indicatorPosition={'bottom'}
                        style={{backgroundColor:'#11121400',paddingLeft:23,paddingRight:23,height:44,marginTop:10,justifyContent:'space-between'}}
                        indicatorLineColor={'#FFFFFF'}
                        indicatorLineWidth={4}
                        indicatorWidth={25}
                        indicatorPositionPadding={0}
                        animated={true}
                        autoScroll={true}
                        activeIndex={this.state.activeIndex}
                        onChange={index => this.onSegmentedBarChange(index)}
                    >
                        {this.renderCustomItems()}
                    </SegmentedBar>
                    <Carousel
                        style={{ height: 486-44-25+60+100+100}}
                        scrollEnabled={false}
                        carousel={false}
                        startIndex={this.state.activeIndex}
                        cycle={false}
                        ref='carousel'
                        onChange={index => this.onCarouselChange(index)}
                    >
                        <MLogin callBackAction={()=>{this.navigator.pop()}}/>
                        <PLogin callBackAction={()=>{this.navigator.pop()}}/>
                    </Carousel>
                </View>


                <View style={{height:50}}/>

            </InputScrollView>


        </View>
    }

}
