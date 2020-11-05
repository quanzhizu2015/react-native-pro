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
    StatusBar, RefreshControl, DeviceEventEmitter,
} from 'react-native';

import {NavigationPage,NavigationBar,Overlay,Theme,Button} from 'teaset'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {screenW, statusBarHeight, unitWidth} from '../../comm/Unitl';
import Label from 'teaset/components/Label/Label';
import NavigationIconButton from '../../comm/views/NavigationIconButton';
import LinearGradient from 'react-native-linear-gradient';
import InComeItem from './InComeItem';
import moment from 'moment';
import CalendarView from '../../comm/views/CalendarView';
import {appState, assetGet, walletTotalAssetValuation} from '../../comm/sdk';
import Toast from 'teaset/components/Toast/Toast';
import {FONT_M, FONT_R, FONT_S} from '../../comm/Fonts';
import MyWalletItem from './MyWalletItem';
import TransferPage from './Transfer/TransferPage';
import SuoCangePage1 from './SuoCangePage1';

export default class MyWalletPage extends NavigationPage {
    constructor(props) {
        super(props);

        this.state =  {
            walletData:{
                name: '$',
                total_valuation: 0.00,
                wallets: []

            },

        };
    }

    loadData(){

        this.setState({isRefreshing:true})
        walletTotalAssetValuation({

        }).then((respond)=>{
            if (respond.code==200){



               this.setState({
                   walletData:respond.data,
                   isRefreshing:false
               })

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
        this.loadData()
    }


    showPull(side, modal, text, rootTransform) {
        let overlayView = (
            <Overlay.PullView side={side} modal={modal} rootTransform={rootTransform} ref={v => this.overlayPullView = v}>
                <View style={{backgroundColor: Theme.defaultColor,width:screenW, minHeight: 260}}>
                    <View style={{padding:10,flexDirection: 'row',justifyContent: 'space-between'}}>
                        <Button style={{width:100,height:30}} title='取消' onPress={() => this.overlayPullView && this.overlayPullView.close()} />
                        <Button style={{width:100,height:30}} title='确定' onPress={() => this.overlayPullView && this.overlayPullView.close()} />
                    </View>
                    <CalendarView onPressAction={(startDateString,endDateString)=>{
                        this.setState({startDateString:startDateString,endDateString:endDateString})
                        this.loadData()
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
                    data={ this.state.walletData.wallets}
                    // onRefresh={()=>{this.loadData()}}
                    // onEndReached={()=>{
                    //     let pages= Math.ceil(this.state.total/10.0)
                    //     if(pages>this.state.pageNow){
                    //         this.loadData(this.state.pageNow+1,this.state.total)
                    //     }
                    // }}
                    onEndReachedThreshold={0.2}
                    refreshing={this.state.refreshing}
                    ListHeaderComponent={()=>{
                        return  <View style={{backgroundColor:'#ffffff00'
                            ,justifyContent:'space-between',
                            alignItems:'center'
                            ,paddingLeft:20,paddingRight:20,height:44,width:screenW,flexDirection:'row'}}>

                            <Label style={{fontSize:16,fontFamily:FONT_S,color:'#fff'}}>{appState.lan.myWallet.title2}</Label>

                        </View>
                    }}
                    keyExtractor={(item,index)=>{return item+index.toString()}}
                    renderItem={(item,index) => (
                        <MyWalletItem navigator={this.navigator} item={item.item}/>
                    )}
                    renderScrollComponent={props => (
                        <ParallaxScrollView

                            headerBackgroundColor={'#111214'}
                            contentBackgroundColor = {'#111214'}
                            backgroundColor = {'#111214'}
                            stickyHeaderHeight={ 44+statusBarHeight }
                            parallaxHeaderHeight={ 209+statusBarHeight-20}
                            backgroundSpeed={10}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this.loadData.bind(this)}
                                />
                            }

                            renderBackground={() => (
                                <View key="background">
                                    <Image style={{width:screenW}} source={require('../../assert/mine/pic_bg.png')}/>
                                </View>
                            )}

                            renderForeground={() => (
                                <View style={{height:209+statusBarHeight,flexDirection:'column',alignItems:'center',paddingTop:44+statusBarHeight+30}}>

                                    <Label style={{fontSize:14,color:'#fff',fontFamily:FONT_R}}>{appState.lan.myWallet.title1}</Label>
                                    {/*<View style={{flexDirection:'row',alignItems:'center'}}>*/}

                                    {/*    <Label style={{fontFamily:FONT_S,fontSize:14,color:'#fff',marginLeft:5}}>{this.state.walletData.name}</Label>*/}
                                    {/*    <Label style={{fontFamily:FONT_S,fontSize:36,color:'#fff',marginLeft:6}}>{parseFloat(this.state.walletData.total_valuation).toFixed(2)}</Label>*/}

                                    {/*</View>*/}

                                </View>
                            )}

                        />
                    )}

                />

                <View style={{height:79,paddingLeft:16,paddingRight:16,width:screenW,flexDirection:'row',justifyContent:'space-between'}}>

                    <TouchableOpacity
                        onPress={()=>{this.navigator.push({view:<SuoCangePage1/>})}}
                        style={{width:(screenW-51)/2,height:49,alignItems:'center',borderRadius:5,flexDirection:'row',justifyContent:'center',backgroundColor:'#6E60FF'}}>
                        <Label style={{fontSize:14,fontFamily:FONT_S,color:'#fff',marginLeft:6}}>{appState.lan.myWallet.title35}</Label>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=>{
                            DeviceEventEmitter.emit('pushEmitterTrade', 1);
                            this.navigator.popToTop()
                        }}
                        style={{width:(screenW-51)/2,borderRadius:5,height:49,alignItems:'center',flexDirection:'row',justifyContent:'center',backgroundColor:'#D885F8'}}>
                        <Label style={{fontSize:14,fontFamily:FONT_S,color:'#fff',marginLeft:6}}>{appState.lan.myWallet.title36}</Label>
                    </TouchableOpacity>

                </View>

                <View style={{position:'absolute',left:0,top:0}}>
                    <View  style={{width:screenW,height:44+statusBarHeight,paddingLeft:25,paddingRight:25}}>
                        <View style={{height:statusBarHeight}}/>
                        <NavigationBar
                            title={<View><Label style={{color:'#ffffff',fontFamily:FONT_R,fontSize:18}}>{appState.lan.myWallet.title}</Label></View>}
                            style={{backgroundColor:'#ffffff00',paddingLeft:20}}
                            background={<View style={{flex:1,backgroundColor:'#ffffff00'}}/>}
                            leftView={<NavigationIconButton
                                icon={require('../../assert/home/index_ico_arrow_left.png')}
                                imageStyle={{width:19,height:17}}
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
