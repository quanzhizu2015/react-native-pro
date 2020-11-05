import React, {Component} from 'react';
import {NavigationPage, NavigationBar, Label, Overlay} from 'teaset';
import {ScrollView, View} from 'react-native';
import NavigationIconButton from '../../comm/views/NavigationIconButton';
import {FONT_M, FONT_R, FONT_S} from '../../comm/Fonts';
import {screenW} from '../../comm/Unitl';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import LinearGradient from "react-native-linear-gradient";
import UnderlineInput from './Fund/UnderlineInput';
import Input from 'teaset/components/Input/Input';
import {appState, collisionCollide, collisionTransaction, netRedFundTransferOutView} from '../../comm/sdk';
import Toast from 'teaset/components/Toast/Toast';
import CollideTradeRecorde from './CollideTradeRecorde';

export default class CollideTrade extends NavigationPage {

    constructor(props){
        super(props);
        this.state={
            pay_password:'',
            consume_btc:'',
            collideData:{
                collision_num_accumulative:0.00,
                coin_num_balance:0.00,
                coin_type: ""
            }
        }
    }




    loadData(){

        collisionTransaction({

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
                Toast.show({
                    text:appState.lan.collideTrade.tip3,
                    position: 'center',
                })

            }else{
                Toast.show({
                    text:respond.message,
                    position: 'center',
                })

            }

        })
    }

    onBlurAction(){
        Toast.show({
            text:'aaaaaaa',
            position: 'center',
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
        return <View style={{flex:1,backgroundColor:'#111214',paddingLeft:25,paddingRight:25}}>
            <ScrollView>
                <View style={{height:60,alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
                    <Label style={{fontFamily:FONT_M,fontSize:16,color:'#fff'}}>{appState.lan.collideTrade.title2}</Label>
                    <Label style={{fontFamily:FONT_R,fontSize:20,color:'#fff'}}>{Math.round(this.state.collideData.collision_num_accumulative * 100) / 100}</Label>
                </View>

                <View style={{height:356,justifyContent:'space-between',backgroundColor:'#1E1D1E',borderRadius:10,paddingTop:20,paddingBottom:20,paddingLeft:15,paddingRight:15}}>
                    <View>
                        <Label style={{color:'#fff',fontSize:16,fontFamily:FONT_S}} type='title' size='xl' text={appState.lan.collideTrade.title3} />
                        <Input
                            style={{marginTop: 10,borderColor:'#ffffff00',
                                height:44,fontSize:20,backgroundColor:'#393A43',color:'#fff',width:screenW-80}}
                            placeholder='0'
                            placeholderTextColor={'#69696E'}
                            keyboardType = 'number-pad'
                            editable={false}
                            //onChangeText={text => this.setState({consume_btc: text})}
                        />
                    </View>
                    <View>
                        <Label style={{color:'#fff',fontSize:16,fontFamily:FONT_S}} type='title' size='xl' text={appState.lan.collideTrade.title4} />
                        <Input
                            style={{marginTop: 10,borderColor:'#ffffff00',
                                height:44,fontSize:16,backgroundColor:'#393A43',color:'#fff',width:screenW-80}}
                            placeholder={appState.lan.collideTrade.tip1}
                            placeholderTextColor={'#69696E'}
                            keyboardType = 'number-pad'
                            onChangeText={text => this.setState({consume_btc: text})}
                            onBlur={this.onBlurAction.bind(this)}
                        />
                    </View>
                    <View>
                        <Label style={{color:'#fff',fontSize:16,fontFamily:FONT_S}} type='title' size='xl' text={appState.lan.collideTrade.title5} />
                        <Input
                            style={{marginTop: 10,borderColor:'#ffffff00',
                                height:44,fontSize:16,backgroundColor:'#393A43',color:'#fff',width:screenW-80}}
                            placeholder={appState.lan.collideTrade.tip2}
                            placeholderTextColor={'#69696E'}
                            keyboardType = 'number-pad'
                            onChangeText={text => this.setState({pay_password: text})}
                        />
                    </View>

                    <Label style={{fontSize:14,fontFamily:FONT_R,color:'#fff'}}>{appState.lan.collideTrade.title8 +' ='+Math.round(this.state.collideData.coin_num_balance * 100) / 100}</Label>

                </View>

                <View style={{flexDirection:'row',justifyContent:'center'}}>
                    {/*<TouchableOpacity onPress={()=>{ this.showInPop('zoomOut', true, 'Pop modal')}}>*/}
                    {/*    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#383838','#383838']}*/}
                    {/*                    style={{width:(screenW-60)/2,height:48,*/}
                    {/*                        marginTop:25,*/}
                    {/*                        borderRadius:24,*/}
                    {/*                        flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>*/}
                    {/*        <Label*/}
                    {/*            style={{color:'#FFFFFF',fontSize:16,fontFamily:FONT_M}}>*/}
                    {/*            {appState.lan.myPool.title2}*/}
                    {/*        </Label>*/}


                    {/*    </LinearGradient>*/}
                    {/*</TouchableOpacity>*/}

                    <TouchableOpacity onPress={()=>{
                        //this.showInPop('zoomOut', true, 'Pop modal')
                        this.collideAction()
                    }}>
                        <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#B9EEFD','#D885F8']}
                                        style={{width:(screenW-60),height:48,
                                            marginTop:25,
                                            borderRadius:24,
                                            flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                            <Label
                                style={{color:'#FFFFFF',fontSize:16,fontFamily:FONT_M}}>
                                {appState.lan.myPool.title1}
                            </Label>

                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <Label style={{marginTop:20,fontSize:13,color:'#999999'}} numberOfLines={10}>{appState.lan.collideTrade.title7}</Label>



            </ScrollView>

        </View>
    }

}

