
import React, {Component} from 'react';
import {NavigationPage,NavigationBar,Label,Overlay,Theme,Button} from 'teaset';
import {View, ScrollView, Dimensions, StyleSheet, Image, Text, RefreshControl, Clipboard} from 'react-native';
import NavigationIconButton from '../../comm/views/NavigationIconButton';
import {FONT_M, FONT_R, FONT_S} from '../../comm/Fonts';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {safeAreaViewHeight, screenW, statusBarHeight} from '../../comm/Unitl';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import LinearGradient from "react-native-linear-gradient";
import ListRow from 'teaset/components/ListRow/ListRow';
import Input from 'teaset/components/Input/Input';
import TransferRecordPage from './TransferRecordPage';
import CalculationPage from './CalculationPage';
import InComeDetailPage from './InComeDetailPage';
import PropTypes from 'prop-types';
import {DouLabel} from '../../comm/views/InputItem';
import moment from 'moment';
import {appState, walletTransferDetail} from '../../comm/sdk';
import QRCode from 'react-native-qrcode-svg';
import Toast from 'teaset/components/Toast/Toast';
//import CustomScrollView from 'custom-scroll-view'

//const AnimatedCustomScrollView = Animated.createAnimatedComponent(CustomScrollView)
export default class TransferDetailPage extends NavigationPage {

    static propTypes ={
        item:PropTypes.object,
        currency:PropTypes.string,
    }

    static defaultProps={
        currency:'',
        item:{
            id: 1,
            coin_num: 1000,
            created_at: "2020-07-20 10:39:53",
            state: 1,  //交易状态 0-待确认 1-确认成功 2-确认失败
            state_explain: "转出成功",
            traget_address: "testb5fa3ef21f6d1112da0d58af3a5cf145aaed2c",
            transfer_in:0  //判断转入还是转出 0-转出 1-转入
        },
    }

    constructor(props){
        super(props);
        this.state={
            isRefreshing:false,
            walletDetailData:{
                log: {
                    id: 1,
                    coin_num: "",
                    txid: "",
                    block_number: 0,
                    created_at: "2020-07-20 10:39:53",
                    traget_address: "testb5fa3ef21f6d1112da0d58af3a5cf145aaed2c",
                    user_address: "04c6fed0051e9dbff5b33c616a6230af"
                },
                reg_url: "http://192.168.101.32:8004?inviter=pk8Sf1"

            }
        }
    }


    walletTransferDetail(){
        this.setState({isRefreshing:true})
        walletTransferDetail({
            id:this.props.item.id,
            currency:this.props.currency
        }).then((respond)=>{
            if (respond.code==200){
                this.setState({
                    walletDetailData:respond.data,
                    isRefreshing:false
                })
            }else{
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
        this.walletTransferDetail();
    }

    getImage(status){
        switch (status) {
            case 1:
                //return '转入成功';
                return require('../../assert/mine/wallet_pic_details_success.png')
                break
            case 2:
                return require('../../assert/mine/wallet_pic_details_failure.png')
                break
            case 0:
                return require('../../assert/mine/wallet_pic_details_waiting.png')
                break
            default:
                return ''
                break
        }
    }

    getStatuString(type,status){

        if (type==1){
            switch (status) {
                case 1:
                    return '转入成功';
                    break
                case 2:
                    return '转入失败';
                    break
                case 3:
                    return '转入处理中';
                    break
                default:
                    return ''
                    break

            }
        }else {
            switch (status) {
                case 1:
                    return '转出成功';
                    break
                case 2:
                    return '转出失败';
                    break
                case 3:
                    return '转出处理中';
                    break
                default:
                    return ''
                    break

            }
        }


    }

    // state = {
    //     content: 'Content will appear here'
    // };
    //异步函数 箭头函数不需要绑定this了
    _setClipboardContent = async (string) => {

        // 将文字复制到系统的粘贴板上，在系统其他的地方可以粘贴
        Clipboard.setString(string);

        // 取出所存的值， Clipboard.getString()  返回的是以一个promise对象，所以可以在then里面存到state，或者使用同步存到state中
        try {
            let content = await Clipboard.getString();
            this.setState({content});
            Toast.message(appState.lan.apps.tip,'short','bottom')
        } catch (e) {
            this.setState({content:e.message});
        }
    };



    render(){
        const { onScroll = () => {} } = this.props;
        let time = moment(this.state.walletDetailData.log.created_at).format('YYYY-MM-DD HH:mm:ss')
        return (
            <View style={{flex:1,backgroundColor:'#111214'}}>
                <ParallaxScrollView
                    refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.walletTransferDetail.bind(this)} />}
                    onScroll={onScroll}
                    backgroundColor="#FFffff00"
                    contentBackgroundColor="#FFffff00"
                    stickyHeaderHeight={ 50+statusBarHeight}
                    parallaxHeaderHeight={ 220+statusBarHeight}
                    backgroundSpeed={10}
                    renderBackground={() => (
                        <View key="background">
                            <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#B9EEFD','#D884F8']} style={{width:screenW,height:165+statusBarHeight ,borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
                            </LinearGradient>
                        </View>
                    )}

                    renderForeground={() => (
                        <View key="parallax-header" style={{ alignItems:'center'}}>
                            <View style={{height:statusBarHeight}}/>
                            <View style={{paddingLeft:25,paddingRight:25,height:44,width:screenW,flexDirection: 'row',alignItems: 'center',justifyContent:'space-between'}}>
                            </View>
                            <View style={{marginTop:20,width:screenW,paddingLeft:25,paddingRight:25,height:220-44,paddingTop:15}}>
                                <Label style={{fontFamily:FONT_S,fontSize:36,color:'#fff'}}>{(this.props.item.transfer_in==0?'-':'+')+parseFloat(this.state.walletDetailData.log.coin_num).toFixed(2)}</Label>
                                <View style={{position:'absolute',left:screenW-85,top:220-44-110,alignItems:'center'}}>
                                    <Image style={{width:60,height:60}} source={this.getImage(this.props.item.state)}/>
                                    <Label style={{fontSize:14,fontFamily:FONT_R,color:'#fff'}}>{this.getStatuString(this.props.item.transfer_in,this.props.item.state)}</Label>
                                </View>

                            </View>
                        </View>
                    )}

                >
                    <View style={{ height: 400,paddingLeft:25,paddingRight:25,width:screenW,backgroundColor:'#111214'}}>
                        <Label style={{fontSize:18,fontFamily:FONT_S,color:'#fff'}}>{appState.lan.myWallet.title26}</Label>
                        <DouLabel
                            style={{marginTop:22}}
                            title={appState.lan.myWallet.title27}
                            content={this.state.walletDetailData.log.traget_address}/>
                        <DouLabel
                            style={{marginTop:15}}
                            title={appState.lan.myWallet.title28}
                            content={this.state.walletDetailData.log.user_address}/>
                        <DouLabel
                            style={{marginTop:15}}
                            title={appState.lan.myWallet.title29}
                            content={this.state.walletDetailData.log.txid}/>
                        <View style={{height:1,width:screenW-50,backgroundColor: '#24262F',marginTop: 30}}/>
                        <View style={{flexDirection: 'row',justifyContent:'space-between',marginTop: 15}}>
                            <View >
                                <DouLabel

                                    title={appState.lan.myWallet.title30}
                                    content={this.state.walletDetailData.log.block_number==null?'':this.state.walletDetailData.log.block_number}/>
                                <DouLabel
                                    style={{marginTop:15}}
                                    title={appState.lan.myWallet.title31}
                                    content={time}/>
                            </View>
                            {/*<View >*/}
                            {/*    <View style={{width:100,height:100,backgroundColor: '#fff',padding:3,borderRadius:2}}>*/}
                            {/*        <QRCode*/}
                            {/*            value={this.state.walletDetailData.reg_url}*/}
                            {/*            size={94}*/}
                            {/*        />*/}
                            {/*    </View>*/}
                            {/*    <TouchableOpacity onPress={this._setClipboardContent.bind(this,this.state.walletDetailData.reg_url)}>*/}
                            {/*        <View style={{width:100,height:34,backgroundColor:'#C9ACF9',alignItems:'center',justifyContent:'center',marginTop: 12,borderRadius:17}}>*/}
                            {/*            <Label style={{fontSize:12,fontFamily:FONT_M,color:'#fff'}}>{appState.lan.myWallet.title32}</Label>*/}
                            {/*        </View>*/}
                            {/*    </TouchableOpacity>*/}

                            {/*</View>*/}


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
                        <Label style={{color:'#fff',fontSize:18,fontFamily:FONT_R}}>{appState.lan.myWallet.title24}</Label>
                        <View style={{width:19,height:17}}/>
                        {/*<NavigationIconButton*/}
                        {/*    icon={require('../../assert/mine/ico_fund_record.png')}*/}
                        {/*    imageStyle={{width:26,height:26}}*/}
                        {/*    onPress={()=>{this.navigator.push({view:<TransferRecordPage/>})}}*/}
                        {/*/>*/}

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
        color: '#999999',
        fontFamily: FONT_R,
        fontSize: 13,
    },
    content: {
        color: '#333333',
        fontFamily: FONT_M,
        fontSize: 22,
        marginTop:5
    },
    itemText:{
        fontFamily:FONT_R,
        fontSize:14,
        color:'#fff'
    },

});
