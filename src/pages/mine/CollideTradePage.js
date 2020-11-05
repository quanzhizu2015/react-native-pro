import React, {Component} from 'react';
import {NavigationPage, NavigationBar, Label, Overlay} from 'teaset';
import {ScrollView, View,Image} from 'react-native';
import NavigationIconButton from '../../comm/views/NavigationIconButton';
import {FONT_M, FONT_R, FONT_S} from '../../comm/Fonts';
import {screenW} from '../../comm/Unitl';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import LinearGradient from "react-native-linear-gradient";
import UnderlineInput from './Fund/UnderlineInput';
import Input from 'teaset/components/Input/Input';
import {
    appState,
    collisionBtcPage,
    collisionCollide,
} from '../../comm/sdk';
import Toast from 'teaset/components/Toast/Toast';
import CollideTrade from './CollideTrade';
import CollideTradeRecorde from './CollideTradeRecorde';


export default class CollideTradePage extends NavigationPage {

    constructor(props){
        super(props);
        this.state={
            pay_password:'',
            consume_btc:'',
            collideData:{
                collision_btc_accumulative: 0.00,
                collision_ratio: "",
                collision_num_surplus:0.00,
                coin_num: 0.00
            }
        }
    }




    loadData(){

        collisionBtcPage({

        }).then((respond)=>{
            if (respond.code==200){
                this.setState({
                    collideData:respond.data
                })
            }else{
                Toast.show({
                    text:respond.message,
                    position: 'bottom',
                })

            }
        })

    }

    collideAction(){

        if(!this.state.consume_btc.trim()){
            Toast.show({
                text:appState.lan.collideTrade.tip1,
                position: 'center',
            })

            return
        }

        if(!this.state.pay_password.trim()){
            Toast.show({
                text:appState.lan.collideTrade.tip2,
                position: 'center',
            })

            return
        }
        collisionCollide({
            consume_btc:this.state.consume_btc,
            pay_password:this.state.pay_password

        }).then((respond)=>{
            if (respond.code==200){

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

    renderNavigationBar(): * {
        return  <NavigationBar
            title={<View><Label style={{fontSize:18,color:'#fff',fontFamily:FONT_R}}>{appState.lan.collideTrade.title}</Label></View>}
            statusBarStyle={'light-content'}
            navigationBarInsets={true}
            background={<View style={{flex:1,backgroundColor:'#1E1D1E'}}/>}
            style={{paddingLeft:25,paddingRight:25}}
            leftView={<NavigationIconButton
                icon={require('../../assert/home/index_ico_arrow_left.png')}
                imageStyle={{width:9,height:17}}
                onPress={()=>{this.navigator.pop()}}
            />}
            rightView={
                <NavigationIconButton
                    icon={require('../../assert/mine/ico_fund_record.png')}
                    imageStyle={{width:26,height:26}}
                    onPress={()=>{this.navigator.push({view:<CollideTradeRecorde/>})}}
                />
            }
        >

        </NavigationBar>
    }


    showInPop(type, modal, text) {

        let overlayView = (
            <Overlay.PopView
                style={{alignItems: 'center', justifyContent: 'center'}}
                type={type}
                modal={modal}
                ref={v => this.overlayPopView = v}
            >
                <ScrollView>
                    <View style={{backgroundColor: '#fff', width: screenW-70,
                        marginTop:100,
                        paddingLeft:15,
                        paddingRight:15,
                        paddingTop:30,
                        paddingBottom:30,
                        height: 225, borderRadius: 15,}}>
                        <View style={{marginTop: 20,alignItems:'center'}}>
                            <Label style={{color:'#333333',fontSize:20,fontFamily:FONT_M}} type='title' size='xl' text={appState.lan.collideTrade.title1} />
                            <UnderlineInput changeValue={(value)=>{
                                this.setState({pay_password:value})
                            }}/>
                        </View>

                        <View style={{flexDirection: 'row',justifyContent: 'space-between',marginTop: 20}}>
                            <TouchableOpacity onPress={() => this.overlayPopView && this.overlayPopView.close()}>
                                <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#383838','#383838']} style={{paddingLeft:10,paddingRight:10,width:(screenW-115)/2,height:44,borderRadius:22,flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                                    <Label
                                        style={{color:'#FFFFFF',fontSize:13,fontFamily:FONT_M}}>
                                        {appState.lan.myPool.title2}
                                    </Label>

                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.overlayPopView && this.overlayPopView.close()}>
                                <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#B9EEFD','#D885F8']} style={{paddingLeft:10,paddingRight:10,width:(screenW-115)/2,height:44,borderRadius:22,flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                                    <Label
                                        style={{color:'#FFFFFF',fontSize:13,fontFamily:FONT_M}}>
                                        {appState.lan.myPool.title1}
                                    </Label>
                                </LinearGradient>
                            </TouchableOpacity>

                        </View>
                        {/*{modal ? <Button title='Close' onPress={() => this.overlayPopView && this.overlayPopView.close()} /> : null}*/}
                    </View>
                </ScrollView>
            </Overlay.PopView>
        );
        Overlay.show(overlayView);
    }

    renderPage(){

        let array =this.state.collideData.collision_ratio.split(':')
        let count = ''
        if (array && array.length>1){
            count = array[1]
        }

        return <View style={{flex:1,backgroundColor:'#111214',paddingLeft:25,paddingRight:25}}>
            <ScrollView>

                <View style={{backgroundColor:'#1E1D1E',height:162,marginTop:10}}>
                    <View style={{borderBottomColor:'#4A4A4A',paddingLeft:10,paddingRight:10,
                        borderBottomWidth:1,flexDirection:'row',alignItems:'center',
                        justifyContent:'space-between',
                        height:50,width:screenW-50}}>
                        <Label style={{fontFamily:FONT_M,fontSize:16,color:'#fff'}}>{appState.lan.collideTrade.title2}</Label>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Label style={{fontFamily:FONT_M,fontSize:16,color:'#fff'}}>{Math.round(this.state.collideData.collision_btc_accumulative * 100) / 100}</Label>
                            <Image style={{width:7,height:7,marginLeft:6}} source={require('../../assert/collide/ico_bitcoin.png')}/>
                        </View>
                    </View>
                    <View style={{height:110,justifyContent:'center'}}>
                        <View style={{paddingLeft:10,paddingRight:10,marginTop:9}}>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Label style={{fontFamily:FONT_M,fontSize:14,color:'#fff'}}>{this.state.collideData.collision_ratio+'Talenter'}</Label>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Label style={{fontFamily:FONT_M,fontSize:14,color:'#fff'}}>{'='+ count}</Label>
                                    <Image style={{width:7,height:7,marginLeft:6}} source={require('../../assert/collide/ico_talenter.png')}/>
                                </View>
                            </View>

                        </View>
                        <View style={{paddingLeft:10,paddingRight:10,marginTop:9}}>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Label style={{fontFamily:FONT_M,fontSize:14,color:'#fff'}}>{appState.lan.collideTrade.title10}</Label>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Label style={{fontFamily:FONT_M,fontSize:14,color:'#fff'}}>{'=' +Math.round(this.state.collideData.collision_num_surplus * 100) / 100}</Label>
                                    <Image style={{width:7,height:7,marginLeft:6}} source={require('../../assert/collide/ico_talenter.png')}/>
                                </View>
                            </View>

                        </View>

                        <View style={{paddingLeft:10,paddingRight:10,marginTop:9}}>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Label style={{fontFamily:FONT_M,fontSize:14,color:'#fff'}}>{appState.lan.collideTrade.title11}</Label>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Label style={{fontFamily:FONT_M,fontSize:14,color:'#fff'}}>{'=' +this.state.collideData.coin_num}</Label>
                                    <Image style={{width:7,height:7,marginLeft:6}} source={require('../../assert/collide/ico_bitcoin.png')}/>
                                </View>
                            </View>

                        </View>
                    </View>

                </View>

                <View style={{marginTop:20}}>
                    <View style={{width:screenW-50,height:40,backgroundColor:'#3A3A3A',alignItems:'center',borderRadius:5,flexDirection:'row'}}>
                        <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#B9EEFD','#D885F8']}
                                        style={{width:screenW-200,height:40,borderRadius:5,
                                            flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                            <Label style={{color:'#FFFFFF',fontSize:14,fontFamily:FONT_M}}>
                                1:1500 T
                            </Label>
                        </LinearGradient>
                        <Label style={{color:'#FFFFFF',fontSize:14,marginLeft:10,fontFamily:FONT_M}}>
                            {appState.lan.collideTrade.title12+' 56.02%'}
                        </Label>
                    </View>
                </View>

                <View style={{marginTop:20}}>
                    <View style={{width:screenW-50,height:40,backgroundColor:'#3A3A3A',alignItems:'center',borderRadius:5,flexDirection:'row'}}>
                        <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#B9EEFD','#D885F8']}
                                        style={{width:screenW-200,height:40,borderRadius:5,
                                            flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                            <Label style={{color:'#FFFFFF',fontSize:14,fontFamily:FONT_M}}>
                                1:1500 T
                            </Label>

                        </LinearGradient>
                        <Label style={{color:'#FFFFFF',fontSize:14,marginLeft:10,fontFamily:FONT_M}}>
                            {appState.lan.collideTrade.title12+' 56.02%'}
                        </Label>
                    </View>
                </View>

                <View style={{marginTop:20}}>
                    <View style={{width:screenW-50,height:40,backgroundColor:'#3A3A3A',alignItems:'center',borderRadius:5,flexDirection:'row'}}>
                        <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#B9EEFD','#D885F8']}
                                        style={{width:screenW-200,height:40,borderRadius:5,
                                            flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                            <Label style={{color:'#FFFFFF',fontSize:14,fontFamily:FONT_M}}>
                                1:1500 T
                            </Label>

                        </LinearGradient>
                        <Label style={{color:'#FFFFFF',fontSize:14,marginLeft:10,fontFamily:FONT_M}}>
                            {appState.lan.collideTrade.title12+' 56.02%'}
                        </Label>
                    </View>
                </View>

                <View style={{marginTop:20}}>
                    <View style={{width:screenW-50,height:40,backgroundColor:'#3A3A3A',alignItems:'center',borderRadius:5,flexDirection:'row'}}>
                        <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#B9EEFD','#D885F8']}
                                        style={{width:screenW-200,height:40,borderRadius:5,
                                            flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                            <Label style={{color:'#FFFFFF',fontSize:14,fontFamily:FONT_M}}>
                                1:1500 T
                            </Label>

                        </LinearGradient>
                        <Label
                            style={{color:'#FFFFFF',fontSize:14,marginLeft:10,fontFamily:FONT_M}}>
                            {appState.lan.collideTrade.title12+' 56.02%'}
                        </Label>

                    </View>

                </View>

                <View style={{marginTop:20}}>
                <View style={{width:screenW-50,height:40,backgroundColor:'#3A3A3A',alignItems:'center',borderRadius:5,flexDirection:'row'}}>
                    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#B9EEFD','#D885F8']}
                                    style={{width:screenW-200,height:40,borderRadius:5,
                                        flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                        <Label style={{color:'#FFFFFF',fontSize:14,fontFamily:FONT_M}}>
                            1:1500 T
                        </Label>
                    </LinearGradient>
                    <Label style={{color:'#FFFFFF',fontSize:14,marginLeft:10,fontFamily:FONT_M}}>
                        {appState.lan.collideTrade.title12+' 56.02%'}
                    </Label>
                </View>
            </View>

                <Label style={{marginTop:20,fontSize:13,color:'#999999'}} numberOfLines={10}>{appState.lan.collideTrade.title13+'（BTC/T'}）</Label>



                <TouchableOpacity onPress={()=>{
                    this.navigator.push({view:<CollideTrade/>})
                }}>
                    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#B9EEFD','#D885F8']}
                                    style={{width:(screenW-60),height:48,
                                        marginTop:25,
                                        borderRadius:24,
                                        flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                        <Label
                            style={{color:'#FFFFFF',fontSize:16,fontFamily:FONT_M}}>
                            {appState.lan.collideTrade.title14}
                        </Label>


                    </LinearGradient>
                </TouchableOpacity>




            </ScrollView>

        </View>
    }

}
