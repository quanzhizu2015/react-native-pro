
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
import {
    appState,
    assetGet,
    collisionLog,
    promoteComputingPowerDistribution,
} from '../../comm/sdk';
import Toast from 'teaset/components/Toast/Toast';
import {FONT_M, FONT_R, FONT_S} from '../../comm/Fonts';
import WalletRecordeItem from './WalletRecordeItem';

import PropTypes from 'prop-types';
import MineTeamItem from './MineTeamItem';

export default class MineTeam extends NavigationPage {


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
            effective_quantity:0,
            total:0
        }

    }

    loadData(current_page){

        if(this.isLoadMore){
            return
        }

        this.setState({isRefreshing:true})
        this.isLoadMore = true
        promoteComputingPowerDistribution({
            page:current_page
        }).then((respond)=>{
            this.isLoadMore = false
            if (respond.code==200){
                if (respond.data.users.current_page ==1){

                    this.setState({
                        list:respond.data.users.data,
                        current_page:respond.data.users.current_page,
                        last_page:respond.data.users.last_page,
                        isRefreshing:false,
                        effective_quantity:respond.data.effective_quantity,
                        total:respond.data.users.total
                    })
                }else {
                    let array = new Array(...this.state.list)
                    array.push(...respond.data.users.data)
                    this.setState({
                        list:array,
                        current_page:respond.data.users.current_page,
                        last_page:respond.data.users.last_page,
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

                <FlatList
                    ref="ListView"
                    style={{flex:1,}}
                    data={ this.state.list}
                    onRefresh={()=>{this.loadData(1)}}
                    onEndReached={()=>{
                        if(this.state.last_page>this.state.current_page){
                            this.loadData(this.state.current_page+1)
                        }
                    }}
                    onEndReachedThreshold={0.2}
                    refreshing={this.state.refreshing}
                    ListHeaderComponent={()=>{
                        return <View style={{height:259+statusBarHeight+35+18}}>
                            <ImageBackground
                                source={require('../../assert/mine/pic_bg.png')}
                                style={{justifyContent:'space-between',height:209+statusBarHeight+18,width:screenW,
                                    flexDirection:'column',alignItems:'center',paddingTop:44+statusBarHeight+10,
                                    paddingLeft:15,paddingRight:15
                                }}
                            >

                                <View style={{width:screenW-30,flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                                    <View style={{width:1,height:1}}/>
                                    <Image style={{width:58,height:41,marginTop:-10}} source={require('../../assert/home/home_logo.png')}/>
                                </View>
                                <ImageBackground style={{width:screenW-30,height:150,marginTop:5}} source={require('../../assert/mine/team_bg.png')}>
                                    <Image style={{width:71,height:71,position:'absolute',left:-2,top:-25}} source={require('../../assert/project/default_header.png')}/>

                                    <View style={{marginLeft:71,height:50,paddingLeft:10,paddingRight:10,alignItems:'center',flexDirection:'row',justifyContent:'space-between',width:screenW-30-71}}>
                                        <Label style={{color:'#fff',fontSize:18,fontFamily:FONT_M}}>{appState.userName}</Label>

                                        <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#B9EEFD','#D885F8' ]} style={{width:54,height:18,justifyContent:'center',alignItems:'center'}}>
                                            <Label
                                                style={{color:'#FFFFFF',fontSize:9}}>
                                                {appState.lan.myPool.title33}

                                            </Label>
                                        </LinearGradient>

                                    </View>


                                   <View style={{width:screenW-30,alignItems:'center'}}>
                                       <Label style={{fontFamily:FONT_R,fontSize:14,color:'#fff'}}>{appState.lan.myPool.title34}</Label>
                                       <View style={{flexDirection:'row',alignItems:'center'}}>
                                           <Label style={{fontFamily:FONT_S,fontSize:24,color:'#fff'}}>{this.state.total}</Label>
                                           <Label style={{fontFamily:FONT_R,fontSize:14,color:'#fff'}}>{appState.lan.myPool.title30}</Label>

                                       </View>
                                   </View>

                                    <View style={{width:screenW-30,alignItems:'center',flexDirection:'row',justifyContent:'space-between',paddingLeft:10,paddingRight:10,marginTop:10}}>
                                        <Label style={{fontFamily:FONT_M,fontSize:14,color:'#fff'}}>{appState.lan.myPool.title35+this.state.total}</Label>
                                        <Label style={{fontFamily:FONT_M,fontSize:14,color:'#fff'}}>{appState.lan.myPool.title29+this.state.total}</Label>

                                    </View>


                                </ImageBackground>
                               {/*<Label style={{fontFamily:FONT_S,fontSize:14,color:'#fff',marginLeft:5}}>{this.props.currency}</Label>*/}
                                {/*<View style={{height:50}}/>*/}

                            </ImageBackground>

                            <View style={{height:45,marginTop:40,paddingLeft:15,paddingRight:15}}>
                                <View style={{height:45,backgroundColor:'#2A2A2A',borderBottomColor:'#ffffff50',
                                    borderBottomWidth:1,paddingLeft:20,paddingRight:20,justifyContent:'space-between',
                                    flexDirection:'row',alignItems:'center'
                                }}>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <Label style={{color:'#fff',fontSize:16,fontFamily:FONT_R}}>{appState.lan.myPool.title31}</Label>
                                        <Image style={{width:15,height:13}} source={require('../../assert/mine/title_arrow.png')}/>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <Label style={{color:'#fff',fontSize:16,fontFamily:FONT_R}}>{appState.lan.myPool.title32}</Label>
                                        <Image style={{width:15,height:13}} source={require('../../assert/mine/title_arrow.png')}/>
                                    </View>

                                </View>
                            </View>
                        </View>

                    }}
                    keyExtractor={(item,index)=>{return item+index.toString()}}
                    renderItem={(item,index) => (
                        <MineTeamItem item={item.item} />
                    )}


                />
                <View style={{position:'absolute',left:0,top:0}}>
                    <View  style={{width:screenW,height:44+statusBarHeight,paddingLeft:25,paddingRight:25}}>
                        <View style={{height:statusBarHeight}}/>
                        <NavigationBar
                            title={<View><Label style={{color:'#ffffff',fontFamily:FONT_R,fontSize:18}}>{appState.lan.mine.title17}</Label></View>}
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



