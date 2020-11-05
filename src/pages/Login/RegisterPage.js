import React, {Component} from 'react';
import {NavigationPage,NavigationBar,Label,SegmentedBar,Carousel} from 'teaset';
import {Image, StatusBar, View} from 'react-native';
import NavigationIconButton from '../../comm/views/NavigationIconButton';
import {FONT_R} from '../../comm/Fonts';
import {safeAreaViewHeight, screenW, statusBarHeight} from '../../comm/Unitl';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import InputScrollView from 'react-native-input-scroll-view';
import PhoneRegister from './PhoneRegister';
import EmailRegister from './EmailRegister';
import LinearGradient from "react-native-linear-gradient";
import {appState} from '../../comm/sdk';
import MnemonicCopy from '../../Mnemonic/MnemonicCopy';


export default class RegisterPage extends NavigationPage {

    constructor(props){
        super(props);
        this.state={
            activeIndex: 0,
        }
        this.barCustomItems = [
            appState.lan.register.title1,
            appState.lan.register.title2,
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
            let tintColor = isActive ? '#fff' : '#9E9E9E';
            return (
                <View key={index} style={{paddingBottom:8,width:(screenW-50-46)/2, alignItems:index==0? 'flex-start':'flex-end'}}>

                    <Label style={{color: tintColor, paddingTop: 4}} text={item} />
                </View>
            );
        });
    }


    render(){
        return <View style={{flex:1,backgroundColor:'#111214'}}>
            <StatusBar barStyle={'light-content'} />

            <Image style={{width:screenW,height:495,position:'absolute',left:0,top:0}} source={require('../../assert/home/bg_header.png')}/>
            <View style={{height:statusBarHeight+safeAreaViewHeight}}/>
            <View style={{height:44,width:screenW,flexDirection:'row',paddingLeft:25,paddingRight:25,alignItems:'center',justifyContent:'space-between'}}>


                <TouchableOpacity onPress={()=>{
                    this.navigator.pop()
                }}>
                    <Image style={{width:20,height:20}} source={require('../../assert/home/index_ico_arrow_left.png')}/>
                </TouchableOpacity>
                <View style={{width:1,height:1}}/>

            </View>
            <InputScrollView>
                <View style={{marginTop:15,
                    borderRadius:10,
                    width:screenW-50,marginLeft:25,height:486+60+30+50}}>
                    <View style={{borderRadius:10,
                        width:screenW-50,left:0,top:0,height:486+60-64-70,backgroundColor:'#1E1D1E',position:'absolute'}}/>
                    <Image style={{height:41,width:58,marginTop:23,marginLeft:23}} source={require('../../assert/home/home_logo.png')}/>
                    <PhoneRegister callBackAction={(token)=>{
                        this.navigator.push({view:<MnemonicCopy token={token}/>})
                    }}/>
                    {/*<SegmentedBar*/}
                    {/*    justifyItem={'fixed'}*/}
                    {/*    indicatorType={'boxWidth'}*/}
                    {/*    indicatorPosition={'bottom'}*/}
                    {/*    style={{backgroundColor:'#11121400',paddingLeft:23,paddingRight:23,height:44,marginTop:10,justifyContent:'space-between'}}*/}
                    {/*    indicatorLineColor={'#FF2C7A'}*/}
                    {/*    indicatorLineWidth={4}*/}
                    {/*    indicatorPositionPadding={0}*/}
                    {/*    animated={true}*/}
                    {/*    autoScroll={true}*/}
                    {/*    activeIndex={this.state.activeIndex}*/}
                    {/*    onChange={index => this.onSegmentedBarChange(index)}*/}
                    {/*>*/}
                    {/*    {this.renderCustomItems()}*/}
                    {/*</SegmentedBar>*/}
                    {/*<Carousel*/}
                    {/*    style={{ height: 486-44-25+60+100+100}}*/}
                    {/*    scrollEnabled={false}*/}
                    {/*    carousel={false}*/}
                    {/*    startIndex={this.state.activeIndex}*/}
                    {/*    cycle={false}*/}
                    {/*    ref='carousel'*/}
                    {/*    onChange={index => this.onCarouselChange(index)}*/}
                    {/*>*/}
                    {/*    <PhoneRegister callBackAction={()=>{this.navigator.pop()}}/>*/}
                    {/*    <EmailRegister callBackAction={()=>{this.navigator.pop()}}/>*/}
                    {/*</Carousel>*/}
                </View>


                <View style={{height:50}}/>

            </InputScrollView>


        </View>
    }

}
