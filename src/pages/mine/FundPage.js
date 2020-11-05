
import React, {Component} from 'react';
import {NavigationPage,NavigationBar,Label} from 'teaset';
import {View} from 'react-native';
import NavigationIconButton from '../../comm/views/NavigationIconButton';
import {FONT_M, FONT_R} from '../../comm/Fonts';
import TradeFundRecorde from './Fund/TradeFundRecorde';
import {screenW} from '../../comm/Unitl';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import LinearGradient from "react-native-linear-gradient";
import TradeInFund from './Fund/TradeInFund';
import TradeOutFund from './Fund/TradeOutFund';
import {appState} from '../../comm/sdk';

export default class FundPage extends NavigationPage {

    constructor(props){
        super(props);
        this.state={
            isInTrade:true
        }
    }

    renderNavigationBar(): * {
        return  <NavigationBar
            title={<View><Label style={{fontSize:18,color:'#fff',fontFamily:FONT_R}}>{appState.lan.fundPage.title}</Label></View>}
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
                    onPress={()=>{this.navigator.push({view:<TradeFundRecorde/>})}}
                />
            }
        >
        </NavigationBar>
    }

    renderPage(){
        return <View style={{flex:1,backgroundColor:'#111214',paddingLeft:25,paddingRight:25}}>
            <View style={{height:30,width:screenW-50,borderRadius:15,borderColor:'#979797',borderWidth:1,marginTop:10,flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>{
                    this.setState({isInTrade:true})
                }}>
                    <LinearGradient start={{x: 1, y: 1}} end={{x: 0, y: 1}} colors={[this.state.isInTrade?'#B9EEFD':'#B9EEFD00',this.state.isInTrade?'#D885F8':'#D885F800']}
                                    style={{width:(screenW-50)/2,height:28,
                                        borderTopLeftRadius:14,
                                        borderBottomLeftRadius:14,
                                        flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                        <Label
                            style={{color:'#FFFFFF',fontSize:13,fontFamily:FONT_M}}>
                            {appState.lan.fundPage.title1}
                        </Label>
                    </LinearGradient>

                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    this.setState({isInTrade:false})
                }}>
                    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={[this.state.isInTrade?'#B9EEFD00':'#B9EEFD',this.state.isInTrade?'#D885F800':'#D885F8']}
                                    style={{width:(screenW-50)/2,height:28,
                                        borderTopRightRadius:14,
                                        borderBottomRightRadius:14,
                                        flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                        <Label
                            style={{color:'#FFFFFF',fontSize:13,fontFamily:FONT_M}}>
                            {appState.lan.fundPage.title2}
                        </Label>

                    </LinearGradient>

                </TouchableOpacity>

            </View>

            {this.state.isInTrade?<TradeInFund/>:<TradeOutFund/>}
        </View>
    }

}
