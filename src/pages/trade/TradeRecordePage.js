import React, {Component} from 'react';
import {NavigationPage,NavigationBar,Label} from 'teaset';
import {FlatList, View} from 'react-native';
import NavigationIconButton from '../../comm/views/NavigationIconButton';
import {FONT_R} from '../../comm/Fonts';
import {screenH, screenW, statusBarHeight} from '../../comm/Unitl';
import {appState, collisionLog, tradePairAll} from '../../comm/sdk';

import TradeRecordeItem from './TradeRecordeItem';
import Carousel from 'teaset/components/Carousel/Carousel';
import SegmentedBar from 'teaset/components/SegmentedBar/SegmentedBar';
import TradeRecorde from './TradeRecorde';
import {isIos} from 'react-native-calendars/src/expandableCalendar/commons';


export default class TradeRecordePage extends NavigationPage {

    constructor(props){
        super(props);

        this.state={
            activeIndex: 0,

        }
        this.barCustomItems = [
            appState.lan.trade.title14,
            appState.lan.trade.title15,
            //appState.lan.trade.title16,
        ];
    }

    renderNavigationBar(): * {
        return  <NavigationBar
            title={<View><Label style={{fontSize:18,color:'#fff',fontFamily:FONT_R}}></Label></View>}
            statusBarStyle={'light-content'}
            navigationBarInsets={true}
            background={<View style={{flex:1,backgroundColor:'#2A2A2A'}}/>}
            style={{paddingLeft:25}}
            leftView={<NavigationIconButton
                icon={require('../../assert/home/index_ico_arrow_left.png')}
                imageStyle={{width:20,height:20}}
                onPress={()=>{this.navigator.pop()}}
            />}
        >

        </NavigationBar>
    }



    componentDidMount() {
        super.componentDidMount();

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
                <View key={index} style={{paddingBottom:8,width:isActive?112:90, alignItems:'center'}}>

                    <Label style={{color: tintColor, paddingTop: 4,fontSize:isActive?27:18}} text={item} />
                </View>
            );
        });
    }


    renderPage(){
        return <View style={{width:screenW,height:isIos?screenH-statusBarHeight-44:screenH-statusBarHeight-20,backgroundColor:'#111214'}}>
            <SegmentedBar
                justifyItem={'fixed'}
                indicatorType={'customWidth'}
                indicatorPosition={'bottom'}
                style={{backgroundColor:'#2A2A2A',width:screenW,height:55,justifyContent:'space-between'}}
                indicatorLineColor={'#fff'}
                indicatorLineWidth={4}
                indicatorWidth={40}
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
                <TradeRecorde callBackAction={()=>{this.navigator.pop()}} type={1}/>
                <TradeRecorde callBackAction={()=>{this.navigator.pop()}} type={2}/>
               {/*<TradeRecorde callBackAction={()=>{this.navigator.pop()}} type={3}/>*/}

            </Carousel>
        </View>
    }


}
