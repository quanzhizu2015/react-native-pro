import React, {Component} from 'react';
import {NavigationPage, NavigationBar, Label, SegmentedBar, Carousel} from 'teaset';
import {Image, View} from 'react-native';
import NavigationIconButton from '../../../comm/views/NavigationIconButton';
import {FONT_R} from '../../../comm/Fonts';
import {screenW} from '../../../comm/Unitl';

import LinkRecivePage from './LinkRecivePage';
import FirendRecivePage from './FirendRecivePage';
import {appState} from '../../../comm/sdk';
import PropTypes from 'prop-types';

export default class TransferPage extends NavigationPage {

    static propTypes={

        currency:PropTypes.string

    }

    static defaultProps={
        ...NavigationPage.defaultProps,
        currency:'',
    }

    constructor(props){
        super(props);
        this.state={
            activeIndex: 0,
        }
        this.barCustomItems = [
            appState.lan.myWallet.title16,
            appState.lan.myWallet.title17,
        ];
    }

    registerAction(){

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
                <View key={index} style={{paddingBottom:8,width:(screenW-50-46)/2, alignItems:'center'}}>

                    <Label style={{color: tintColor, paddingTop: 4}} text={item} />
                </View>
            );
        });
    }


    renderNavigationBar(): * {
        return  <NavigationBar
            title={<View><Label style={{fontSize:18,color:'#fff',fontFamily:FONT_R}}>{appState.lan.myWallet.title15}</Label></View>}
            statusBarStyle={'light-content'}
            navigationBarInsets={true}
            background={<View style={{flex:1,backgroundColor:'#1E1D1E'}}/>}
            style={{paddingLeft:25}}
            leftView={<NavigationIconButton
                icon={require('../../../assert/home/index_ico_arrow_left.png')}
                imageStyle={{width:9,height:17}}
                onPress={()=>{this.navigator.pop()}}
            />}
        >

        </NavigationBar>
    }

    renderPage(){
        return <View style={{flex:1,backgroundColor:'#111214'}}>

            <LinkRecivePage currency={this.props.currency} navigator={this.navigator}/>
            {/*<SegmentedBar*/}
            {/*    justifyItem={'fixed'}*/}
            {/*    indicatorType={'customWidth'}*/}
            {/*    indicatorPosition={'bottom'}*/}
            {/*    style={{backgroundColor:'#1E1D1E',height:44,justifyContent:'space-between'}}*/}
            {/*    indicatorLineColor={'#EC6388'}*/}
            {/*    indicatorLineWidth={4}*/}
            {/*    indicatorWidth={20}*/}
            {/*    indicatorPositionPadding={0}*/}
            {/*    animated={true}*/}
            {/*    autoScroll={true}*/}
            {/*    activeIndex={this.state.activeIndex}*/}
            {/*    onChange={index => this.onSegmentedBarChange(index)}*/}
            {/*>*/}
            {/*    {this.renderCustomItems()}*/}
            {/*</SegmentedBar>*/}
            {/*<Carousel*/}
            {/*    style={{ height: 486-44-25+60}}*/}
            {/*    carousel={false}*/}
            {/*    startIndex={this.state.activeIndex}*/}
            {/*    cycle={false}*/}
            {/*    ref='carousel'*/}
            {/*    onChange={index => this.onCarouselChange(index)}*/}
            {/*>*/}
            {/*    <LinkRecivePage currency={this.props.currency}/>*/}
            {/*    <FirendRecivePage currency={this.props.currency}/>*/}
            {/*</Carousel>*/}
        </View>
    }

}
