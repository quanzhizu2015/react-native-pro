import React, {Component} from 'react';
import {NavigationPage,NavigationBar,Label,Overlay,Theme,Button} from 'teaset';
import {View,ScrollView,Dimensions,StyleSheet,Image,Text,RefreshControl} from 'react-native';
import NavigationIconButton from '../../comm/views/NavigationIconButton';
import {FONT_M, FONT_R, FONT_S} from '../../comm/Fonts';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {safeAreaViewHeight, screenW, statusBarHeight} from '../../comm/Unitl';
import CalculationItem from './CalculationItem';
import CalculationInvitePage from './CalculationInvitePage';
import CalculationDisPage from './CalculationDisPage';
import {appState, miningPoolComputingPower, miningPoolIndex} from '../../comm/sdk';
import Toast from 'teaset/components/Toast/Toast';
//import CustomScrollView from 'custom-scroll-view'

//const AnimatedCustomScrollView = Animated.createAnimatedComponent(CustomScrollView)
export default class CalculationPage extends NavigationPage {

    constructor(props){
        super(props);
        this.state={
            isRefreshing:false,
            poolData:{
                currency_holding_power: 0,
                not_effective_holding_power: 0,
                invite_computing_power: 0,
                iceberg_power: 0,
                qing_feng_power: 0
            },
            data:[
                {
                    name: appState.lan.myPool.title4,
                    value: 0,
                },
                {
                    name: appState.lan.myPool.title5,
                    value: 0,

                },
                {
                    name: appState.lan.myPool.title6,
                    value: 0,

                }
            ]
        }
    }




    loadData(){
        miningPoolComputingPower(null).then((respond)=>{
            if (respond.code==200){

                let data= [
                    {
                        name: appState.lan.myPool.title4,
                        value: respond.data.invite_computing_power,
                    },
                    {
                        name: appState.lan.myPool.title5,
                        value: respond.data.iceberg_power,

                    },
                    {
                        name: appState.lan.myPool.title6,
                        value: respond.data.qing_feng_power,

                    }
                ]
                this.setState({
                    poolData:respond.data,
                    data:data
                })

            }else{
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
        const { onScroll = () => {} } = this.props;
        return (
            <View style={{flex:1,backgroundColor:'#111214'}}>
                <ParallaxScrollView
                    refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.loadData.bind(this)} />}
                    onScroll={onScroll}
                    backgroundColor="#FFffff00"
                    contentBackgroundColor="#FFffff00"
                    stickyHeaderHeight={ 50+statusBarHeight }
                    parallaxHeaderHeight={ 209 +statusBarHeight}
                    backgroundSpeed={10}
                    renderBackground={() => (
                        <View key="background">
                            <Image source={require('../../assert/mine/pic_bg.png')}/>
                            <View style={{position: 'absolute',
                                top: 0,
                                width: window.width,
                                backgroundColor: 'rgba(0,0,0,0)',
                                height: 209+statusBarHeight}}/>
                        </View>
                    )}

                    renderForeground={() => (
                        <View key="parallax-header" style={{ alignItems:'center'}}>
                            <View style={{height:statusBarHeight}}/>
                            <View style={{paddingLeft:25,paddingRight:25,height:44,width:screenW,flexDirection: 'row',alignItems: 'center',justifyContent:'space-between'}}>

                            </View>
                            <View style={{flexDirection: 'row',justifyContent:'space-between',height:209-statusBarHeight-44,alignItems: 'center'}}>
                                <View style={{width:(screenW-50)/2,height:100,alignItems: 'center',justifyContent:'center'}}>
                                    <Label style={styles.title}>{appState.lan.myPool.title7}</Label>
                                    <Label style={styles.content}>{this.state.poolData.currency_holding_power}</Label>

                                </View>
                                <View style={{backgroundColor:'#fff',width:1,height:20}}/>
                                <View style={{width:(screenW-50)/2,height:100,alignItems: 'center',justifyContent:'center'}}>
                                    <Label style={styles.title}>{appState.lan.myPool.title8}</Label>
                                    <Label style={styles.content}>{this.state.poolData.not_effective_holding_power}</Label>

                                </View>
                            </View>

                        </View>
                    )}

                >
                    <View style={{ height: 300,paddingLeft:25,paddingRight:25,width:screenW}}>
                        <View style={{width:screenW-50,height:300,backgroundColor:'#1E1D1E',borderRadius:10}}>
                            {
                                this.state.data.map((item,index)=>{
                                    return <CalculationItem  key={'item'+index} item ={item} isShowLine={index==2?false:true}
                                                            onPress={()=>{
                                                                switch (index) {
                                                                    case 0:
                                                                        this.navigator.push({view:<CalculationInvitePage/>})
                                                                        break
                                                                    case 1:
                                                                        this.navigator.push({view:<CalculationDisPage type={1}/>})
                                                                        break;
                                                                    case 2:
                                                                        this.navigator.push({view:<CalculationDisPage type={2}/>})
                                                                        break;
                                                                    default:
                                                                        break
                                                                }
                                                            }}
                                    />
                                })
                            }

                        </View>


                    </View>
                </ParallaxScrollView>

                <View style={{position: 'absolute',left:0,top:0}}>
                    <View style={{height:statusBarHeight}}/>
                    <View style={{paddingLeft:25,paddingRight:25,height:44,width:screenW,flexDirection: 'row',alignItems: 'center',justifyContent:'space-between'}}>
                        <NavigationIconButton
                            icon={require('../../assert/home/index_ico_arrow_left.png')}
                            imageStyle={{width:19,height:17}}
                            onPress={()=>{this.navigator.pop()}}
                        />
                        <Label style={{color:'#fff',fontSize:18,fontFamily:FONT_R}}>{appState.lan.myPool.title3}</Label>
                        <View/>

                    </View>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red'
    },
    title: {
        color: '#fff',
        fontFamily: FONT_M,
        fontSize: 14,
    },
    content: {
        color: '#fff',
        fontFamily: FONT_S,
        fontSize: 36,
        marginTop:5
    },
    itemText:{
        fontFamily:FONT_R,
        fontSize:14,
        color:'#fff'
    },

});
