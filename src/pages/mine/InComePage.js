import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    FlatList,
    PixelRatio,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    StatusBar, RefreshControl,
} from 'react-native';

import {NavigationPage,NavigationBar,Overlay,Theme,Button} from 'teaset'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {screenW, statusBarHeight} from '../../comm/Unitl';
import Label from 'teaset/components/Label/Label';
import NavigationIconButton from '../../comm/views/NavigationIconButton';
import LinearGradient from 'react-native-linear-gradient';
import InComeItem from './InComeItem';
import moment from 'moment';
import CalendarView from '../../comm/views/CalendarView';
import {appState, incomeLogs} from '../../comm/sdk';
import Toast from 'teaset/components/Toast/Toast';
import {FONT_M, FONT_R, FONT_S} from '../../comm/Fonts';

export default class InComePage extends NavigationPage {
    constructor(props) {
        super(props);

        this.state =  {
            dataSource: [
                'Simplicity Matters',
                'Hammock Driven Development',
                'Value of Values',
                'Are We There Yet?',
                'The Language of the System',
                'Design, Composition, and Performance',
                'Clojure core.async',
                'The Functional Database',
                'Deconstructing the Database',
                'Hammock Driven Development',
                'Value of Values'
            ],
            startDateString:undefined,
            endDateString:undefined,
            refreshing: false,
            pageNow:1,
            total:null,
            walletData:{
                total_income_disbursed: 0.00,
                currency: '',
                logs:{}
            },
            inComeList:[

            ]


        };
    }

    loadData(pageNow,from,to){

        let fromTime = null;
        let toTime = null;
        let fromTimeStr = null
        let toTimeStr = null
        if (from){
            fromTime = moment(from+' 00:00:00','YYYY-MM-DD HH:mm:ss').valueOf()
            fromTimeStr = moment(fromTime).format('YYYY-MM-DD HH:mm:ss')
        }
        if (to){
            //toTime = moment(to+' 00:00:00','YYYY-MM-DD HH:mm:ss').add(1,'days').valueOf()
            toTime = moment(to+' 00:00:00','YYYY-MM-DD HH:mm:ss').valueOf()
            toTimeStr = moment(toTime).format('YYYY-MM-DD HH:mm:ss')
        }




        this.setState({isRefreshing:true})
        incomeLogs({
            begin_time:fromTimeStr,
            end_time:toTimeStr,
            page:pageNow,
        }).then((respond)=>{
            if (respond.code==200){

                if (respond.data.logs.current_page==1){
                    this.setState({inComeList:respond.data.logs.data,walletData:respond.data})
                }else {
                    let array = new Array(...this.state.inComeList)
                    if(respond.data.logs.data && respond.data.logs.data.length>1){
                        array.push(...respond.data.logs.data)
                        this.setState({inComeList:array})
                    }
                }
                let pages= Math.ceil(respond.data.logs.total/10.0)
                if(pages>respond.data.logs.current_page){

                }
                this.setState({total:respond.data.logs.total,pageNow:respond.data.logs.current_page,isRefreshing:false,walletData:respond.data})



            }else {
                this.setState({isRefreshing:false})
                Toast.show({
                    text:respond.message,
                    position: 'center',
                })

            }
        })

    }



    componentDidMount() {
        super.componentDidMount();
        this.loadData(1,null,null)
    }


    showPull(side, modal, text, rootTransform) {
        let overlayView = (
            <Overlay.PullView side={side} modal={modal} rootTransform={rootTransform} ref={v => this.overlayPullView = v}>
                <View style={{backgroundColor: Theme.defaultColor,width:screenW, minHeight: 260}}>
                    <View style={{padding:10,flexDirection: 'row',justifyContent: 'space-between'}}>
                        <Button style={{width:100,height:30}} title={appState.lan.myPool.title2} onPress={() => this.overlayPullView && this.overlayPullView.close()} />
                        <Button style={{width:100,height:30}} title={appState.lan.myPool.title1} onPress={() => this.overlayPullView && this.overlayPullView.close()} />
                    </View>
                    <CalendarView onPressAction={(startDateString,endDateString)=>{
                        this.setState({startDateString:startDateString,endDateString:endDateString})
                        this.loadData(1,startDateString,endDateString)
                    }}/>

                </View>
            </Overlay.PullView>
        );
        Overlay.show(overlayView);
    }

    render() {

        return (
            <View style={{flex:1,backgroundColor:'#111214'}}>
                <StatusBar barStyle={'light-content'}/>
                <FlatList
                    ref="ListView"
                    style={{flex:1,backgroundColor:'#111214'}}
                    data={ this.state.inComeList }
                    onRefresh={()=>{this.loadData(1,null,null)}}
                    onEndReached={()=>{
                        let pages= Math.ceil(this.state.total/10.0)
                        if(pages>this.state.pageNow){
                            this.loadData(this.state.pageNow+1,null,null)
                        }
                    }}
                    onEndReachedThreshold={0.2}
                    refreshing={this.state.refreshing}
                    ListHeaderComponent={()=>{
                        return  <View style={{backgroundColor:'#111214',borderBottomWidth:1,borderColor:'#24262F',justifyContent:'space-between',paddingLeft:20,paddingRight:20,height:50,width:screenW,flexDirection:'row',alignItems:'center'}}>

                            <Label style={{fontSize:16,fontFamily:FONT_S,color:'#fff'}}>{appState.lan.mine.title14}</Label>
                            <TouchableOpacity style={{flexDirection:'row',width:80,height:30,alignItems:'center'}} onPress={()=>{this.showPull('bottom', true, 'Pull modal')}}>
                                <Label style={{fontSize:14,color:'#666666',fontFamily:FONT_M}}>{appState.lan.mine.title14}</Label>
                                <Image style={{width:16,height:16,marginLeft:6}} source={require('../../assert/mine/wallet_ico_arrow_down.png')}/>
                            </TouchableOpacity>


                        </View>
                    }}
                    keyExtractor={(item,index)=>{return item+index.toString()}}
                    renderItem={(item,index) => (
                        <InComeItem navigator={this.navigator} item={item.item}/>
                    )}
                    renderScrollComponent={props => (
                        <ParallaxScrollView

                            headerBackgroundColor={'#111214'}
                            contentBackgroundColor = {'#111214'}
                            backgroundColor = {'#111214'}
                            stickyHeaderHeight={ 44+statusBarHeight }
                            parallaxHeaderHeight={  209+statusBarHeight}
                            backgroundSpeed={10}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this.loadData.bind(this, 1,null,null,null)}
                                />
                            }
                            s
                            renderBackground={() => (
                                <View key="background">
                                    <Image style={{width:screenW}} source={require('../../assert/mine/pic_bg.png')}/>
                                    <View style={{position: 'absolute',
                                        top: 0,
                                        width: screenW,
                                        backgroundColor: 'rgba(0,0,0,0)',
                                        height: 209+statusBarHeight}}/>
                                </View>
                            )}

                            renderForeground={() => (
                                <View style={{height:209+statusBarHeight,flexDirection:'column',alignItems:'center',paddingTop:44+statusBarHeight+30}}>

                                    <Label style={{fontSize:14,color:'#fff',fontFamily:FONT_R}}>{appState.lan.mine.title12}</Label>
                                    <Label style={{fontFamily:FONT_S,fontSize:36,color:'#fff'}}>{this.state.walletData.total_income_disbursed}</Label>
                                    <Label style={{fontFamily:FONT_S,fontSize:14,color:'#fff',marginLeft:5}}>{this.state.walletData.total_income_disbursed}</Label>

                                </View>
                            )}

                        />
                    )}

                />

                <View style={{position:'absolute',left:0,top:0}}>
                   <View  style={{width:screenW,height:44+statusBarHeight}}>
                       <View style={{height:statusBarHeight}}/>
                       <NavigationBar
                           title={<View><Label style={{color:'#ffffff',fontFamily:FONT_R,fontSize:18}}>{appState.lan.mine.title11}</Label></View>}
                           style={{backgroundColor:'#ffffff00'}}
                           background={<View style={{flex:1,backgroundColor:'#ffffff00'}}/>}
                           leftView={<NavigationIconButton
                               icon={require('../../assert/home/index_ico_arrow_left.png')}
                               imageStyle={{width:9,height:17}}
                               onPress={()=>{this.navigator.pop()}}
                           />}
                       >

                       </NavigationBar>
                   </View>
                </View>
            </View>
        );
    }
}
