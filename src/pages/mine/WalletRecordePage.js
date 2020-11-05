
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
import moment from 'moment';
import CalendarView from '../../comm/views/CalendarView';
import {appState, assetGet, collisionLog, walletTransactionRecord} from '../../comm/sdk';
import Toast from 'teaset/components/Toast/Toast';
import {FONT_M, FONT_R, FONT_S} from '../../comm/Fonts';
import WalletRecordeItem from './WalletRecordeItem';
import TransferPage from './Transfer/TransferPage';
import ReceivePage from './ReceivePage';
import PropTypes from 'prop-types';

export default class WalletRecordePage extends NavigationPage {


    static propTypes={

        currency:PropTypes.string

    }

    static defaultProps={
        ...NavigationPage.defaultProps,
        currency:'',
    }
    constructor(props) {
        super(props);

        this.state={
            refreshing: false,
            current_page:1,
            last_page:1,
            list:[],
            walletData: {
                assets:0.00,
                logs:{
                    current_page:1,
                    data:[]
                }
            }

        }

    }

    loadData(current_page){

        if(this.isLoadMore){
            return
        }

        this.setState({isRefreshing:true})
        this.isLoadMore = true
        walletTransactionRecord({
            currency:this.props.currency,
            page:current_page
        }).then((respond)=>{
            this.isLoadMore = false
            if (respond.code==200){
                if (respond.data.logs.current_page ==1){

                    this.setState({
                        walletData:respond.data,
                        list:respond.data.logs.data,
                        current_page:respond.data.logs.current_page,
                        last_page:respond.data.logs.last_page,
                        isRefreshing:false
                    })
                }else {
                    let array = new Array(...this.state.list)
                    array.push(...respond.data.logs.data)
                    this.setState({
                        list:array,
                        current_page:respond.data.logs.current_page,
                        last_page:respond.data.logs.last_page,
                        isRefreshing:false
                    })
                }

            }else {
                Toast.show({
                    text:respond.message,
                    position: 'center',
                })
                this.setState({isRefreshing:false})

            }

        })
    }


    componentDidMount() {
        super.componentDidMount();
        this.loadData(1)
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
                        this.loadData(1)
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
                {/*<ImageBackground*/}
                {/*    source={require('../../assert/mine/pic_bg.png')}*/}
                {/*    style={{justifyContent:'space-between',height:209+statusBarHeight,width:screenW,*/}
                {/*        position: 'absolute',*/}
                {/*        left:0,top:0,*/}
                {/*        flexDirection:'column',alignItems:'center',paddingTop:44+statusBarHeight+10*/}
                {/*    }}/>*/}


                <FlatList
                    ref="ListView"
                    style={{flex:1,}}
                    data={ this.state.list }
                    onRefresh={()=>{this.loadData(1)}}
                    onEndReached={()=>{
                        if(this.state.last_page>this.state.current_page){
                            this.loadData(this.state.current_page+1)
                        }
                    }}
                    onEndReachedThreshold={0.2}
                    refreshing={this.state.refreshing}
                    ListHeaderComponent={()=>{
                        return  <ImageBackground
                            source={require('../../assert/mine/pic_bg.png')}
                            style={{justifyContent:'space-between',height:209+statusBarHeight,width:screenW,
                                flexDirection:'column',alignItems:'center',paddingTop:44+statusBarHeight+10
                            }}
                        >
                            <Label style={{fontFamily:FONT_S,fontSize:36,color:'#fff'}}>{parseFloat(this.state.walletData.assets).toFixed(2)}</Label>
                            <Label style={{fontFamily:FONT_S,fontSize:14,color:'#fff',marginLeft:5}}>{this.props.currency}</Label>
                            <View style={{height:50}}/>
                            {/*<View style={{paddingLeft:25,paddingRight:25,marginTop:15,height:50}}>*/}
                            {/*    <View style={{height:1,width:screenW-50,backgroundColor:'#fff'}}/>*/}
                            {/*    <View style={{flexDirection:'row',alignItems:'center'}} >*/}
                            {/*        <TouchableOpacity*/}
                            {/*            onPress={()=>{this.navigator.push({view:<TransferPage currency={this.props.currency}/>})}}*/}
                            {/*            style={{width:(screenW-51)/2,height:49,alignItems:'center',flexDirection:'row',justifyContent:'center'}}>*/}
                            {/*            <Image style={{width:22,height:22}} source={require('../../assert/mine/wallet_ico_record_tr.png')}/>*/}
                            {/*            <Label style={{fontSize:14,fontFamily:FONT_S,color:'#fff',marginLeft:6}}>{appState.lan.myWallet.title7}</Label>*/}
                            {/*        </TouchableOpacity>*/}
                            {/*        <View style={{width:1,height:20,backgroundColor:'#fff'}}/>*/}

                            {/*        <TouchableOpacity*/}
                            {/*            onPress={()=>{this.navigator.push({view:<ReceivePage currency={this.props.currency}/>})}}*/}
                            {/*            style={{height:49,width:(screenW-51)/2,alignItems:'center',flexDirection:'row',justifyContent:'center'}}>*/}
                            {/*            <Image style={{width:22,height:22}} source={require('../../assert/mine/wallet_ico_record_collect.png')}/>*/}
                            {/*            <Label style={{fontSize:14,fontFamily:FONT_S,color:'#fff',marginLeft:6}}>{appState.lan.myWallet.title8}</Label>*/}
                            {/*        </TouchableOpacity>*/}

                            {/*    </View>*/}
                            {/*</View>*/}

                            </ImageBackground>

                    }}
                    keyExtractor={(item,index)=>{return item+index.toString()}}
                    renderItem={(item,index) => (
                        <WalletRecordeItem navigator={this.navigator} item={item.item} currency={this.props.currency}/>
                    )}
                    // renderScrollComponent={props => (
                    //     <ParallaxScrollView
                    //
                    //         headerBackgroundColor={'#111214'}
                    //         contentBackgroundColor = {'#111214'}
                    //         backgroundColor = {'#111214'}
                    //         stickyHeaderHeight={ 44+statusBarHeight }
                    //         parallaxHeaderHeight={  209+statusBarHeight-20}
                    //         backgroundSpeed={10}
                    //         refreshControl={
                    //             <RefreshControl
                    //                 refreshing={this.state.isRefreshing}
                    //                 onRefresh={this.loadData.bind(this,1)}
                    //             />
                    //         }
                    //         onEndReached={()=>{
                    //             let pages= Math.ceil(this.state.total/10.0)
                    //             if(pages>this.state.pageNow){
                    //                 this.loadData(this.state.pageNow+1)
                    //             }
                    //         }}
                    //
                    //
                    //         renderBackground={() => (
                    //             <View key="background">
                    //                 <Image source={require('../../assert/mine/pic_bg.png')}/>
                    //                 <View style={{position: 'absolute',
                    //                     top: 0,
                    //                     width: window.width,
                    //                     backgroundColor: 'rgba(0,0,0,0)',
                    //                     height: 209+statusBarHeight}}/>
                    //
                    //             </View>
                    //         )}
                    //
                    //         renderForeground={() => (
                    //             <View style={{height:209+statusBarHeight,flexDirection:'column',alignItems:'center',paddingTop:44+statusBarHeight+10}}>
                    //
                    //                 <Label style={{fontFamily:FONT_S,fontSize:36,color:'#fff'}}>{parseFloat(this.state.walletData.assets).toFixed(2)}</Label>
                    //                 <Label style={{fontFamily:FONT_S,fontSize:14,color:'#fff',marginLeft:5}}>{this.props.currency}</Label>
                    //                 <View style={{paddingLeft:25,paddingRight:25,marginTop:15,height:50}}>
                    //                     <View style={{height:1,width:screenW-50,backgroundColor:'#fff'}}/>
                    //                     <View style={{flexDirection:'row',alignItems:'center'}} >
                    //                         <TouchableOpacity
                    //                             onPress={()=>{this.navigator.push({view:<TransferPage currency={this.props.currency}/>})}}
                    //                             style={{width:(screenW-51)/2,height:49,alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
                    //                             <Image style={{width:22,height:22}} source={require('../../assert/mine/wallet_ico_record_tr.png')}/>
                    //                             <Label style={{fontSize:14,fontFamily:FONT_S,color:'#fff',marginLeft:6}}>{appState.lan.myWallet.title7}</Label>
                    //                         </TouchableOpacity>
                    //                         <View style={{width:1,height:20,backgroundColor:'#fff'}}/>
                    //
                    //                         <TouchableOpacity
                    //                             onPress={()=>{this.navigator.push({view:<ReceivePage currency={this.props.currency}/>})}}
                    //                             style={{height:49,width:(screenW-51)/2,alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
                    //                             <Image style={{width:22,height:22}} source={require('../../assert/mine/wallet_ico_record_collect.png')}/>
                    //                             <Label style={{fontSize:14,fontFamily:FONT_S,color:'#fff',marginLeft:6}}>{appState.lan.myWallet.title8}</Label>
                    //                         </TouchableOpacity>
                    //
                    //                     </View>
                    //
                    //
                    //                 </View>
                    //
                    //             </View>
                    //         )}
                    //
                    //     />
                    // )}

                />

                <View style={{position:'absolute',left:0,top:0}}>
                    <View  style={{width:screenW,height:44+statusBarHeight}}>
                        <View style={{height:statusBarHeight}}/>
                        <NavigationBar
                            title={<View><Label style={{color:'#ffffff',fontFamily:FONT_R,fontSize:18}}>{appState.lan.myWallet.title6}</Label></View>}
                            style={{backgroundColor:'#ffffff00'}}
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
