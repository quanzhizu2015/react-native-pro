import React,{Component} from 'react'
import {ScrollView, View} from 'react-native';
import Label from 'teaset/components/Label/Label';
import {FONT_M, FONT_R, FONT_S} from '../../../comm/Fonts';
import Input from 'teaset/components/Input/Input';
import {screenW} from '../../../comm/Unitl';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import LinearGradient from "react-native-linear-gradient";
import {Overlay} from 'teaset';
import UnderlineInput from './UnderlineInput';
import {appState, netRedFundRenewal, netRedFundTransferOutToWallet, netRedFundTransferOutView} from '../../../comm/sdk';
import Toast from 'teaset/components/Toast/Toast';


export default class TradeOutFund extends Component{

    constructor(props) {
        super(props);
        this.state={
            pay_password:'',
            netRedFundData:{
                amount: "0.000000",
                effective_amount: "0.00000000",
                address: "",
                poundage: "0.0000000",
                currency: "BTC"
            }
        }

    }

    loadData(){

        netRedFundTransferOutView({

        }).then((respond)=>{
            if (respond.code==200){

               this.setState({
                   netRedFundData:respond.data
               })

            }else{
                Toast.show({
                    text:respond.message,
                    position: 'bottom',
                })

            }
        })

    }


    transOut(){

        if(!this.state.pay_password.trim()){
            Toast.show({
                text:appState.lan.fundPage.tip3,
                position: 'center',
            })

            return
        }

        netRedFundTransferOutToWallet({
            pay_password:this.state.pay_password
        }).then((respond)=>{

            if (respond.code==200){
                this.overlayPopView && this.overlayPopView.close()

                Toast.show({
                    text:appState.lan.fundPage.tip5,
                    position: 'bottom',
                })

            }else{
                Toast.show({
                    text:respond.message,
                    position: 'bottom',
                })

            }

        })

    }


    netRedFundRenewal(){

        netRedFundRenewal({

        }).then((respond)=>{

            if (respond.code==200){
                Toast.show({
                    text:appState.lan.fundPage.tip6,
                    position: 'center',
                })


            }else{
                Toast.show({
                    text:respond.message,
                    position: 'bottom',
                })

            }

        })

    }

    componentDidMount() {
        this.loadData()
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
                            <Label style={{color:'#333333',fontSize:20,fontFamily:FONT_M}} type='title' size='xl' text={appState.lan.fundPage.title17} />
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
                            <TouchableOpacity onPress={() => {

                                this.transOut()
                            }}>
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


    render(){
        return <View style={{flex:1,marginTop:15}}>
            <ScrollView>
                <View style={{height:352-100,backgroundColor:'#1E1D1E',borderRadius:10,paddingTop:20,paddingLeft:15,paddingRight:15}}>
                    <View>
                        <Label style={{color:'#fff',fontSize:16,fontFamily:FONT_S}} type='title' size='xl' text= {appState.lan.fundPage.title9} />
                        <Input
                            style={{marginTop: 10,borderColor:'#ffffff00',
                                height:44,fontSize:20,backgroundColor:'#393A43',color:'#fff',width:screenW-80}}
                            placeholder={''+this.state.netRedFundData.amount}
                            placeholderTextColor={'#69696E'}
                            keyboardType = 'number-pad'
                            editable = {false}
                            onChangeText={text => this.setState({password: text})}
                        />

                    </View>
                    <View style={{marginTop:20}}>
                        <Label style={{color:'#fff',fontSize:16,fontFamily:FONT_S}} type='title' size='xl' text= {appState.lan.fundPage.title10} />
                        <Input
                            style={{marginTop: 10,borderColor:'#ffffff00',
                                height:44,fontSize:20,backgroundColor:'#393A43',color:'#fff',width:screenW-80}}
                            placeholder={''+this.state.netRedFundData.effective_amount}
                            placeholderTextColor={'#69696E'}
                            keyboardType = 'number-pad'
                            editable = {false}
                            onChangeText={text => this.setState({password: text})}
                        />

                    </View>
                    {/*<View style={{marginTop:20}}>*/}
                    {/*    <Label style={{color:'#fff',fontSize:16,fontFamily:FONT_S}} type='title' size='xl' text={appState.lan.fundPage.title11} />*/}
                    {/*    <Input*/}
                    {/*        style={{marginTop: 10,borderColor:'#ffffff00',*/}
                    {/*            height:44,fontSize:14,fontFamily:FONT_R,backgroundColor:'#393A43',color:'#fff',width:screenW-80}}*/}
                    {/*        placeholder={this.state.netRedFundData.address}*/}
                    {/*        placeholderTextColor={'#69696E'}*/}
                    {/*        keyboardType = 'email-address'*/}
                    {/*        editable = {false}*/}
                    {/*        onChangeText={text => this.setState({password: text})}*/}
                    {/*    />*/}
                    {/*</View>*/}

                    {/*<Label style={{fontFamily:FONT_R,color:'#999999',fontSize:13,marginTop:10}} numberOfLines={100}>*/}
                    {/*    {appState.lan.fundPage.title12}</Label>*/}

                </View>
                <TouchableOpacity onPress={()=>{ this.showInPop('zoomOut', true, 'Pop modal')}}>
                    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#B9EEFD','#D885F8']}
                                    style={{width:screenW-50,height:48,
                                        marginTop:20,
                                        borderRadius:24,
                                        flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                        <Label
                            style={{color:'#FFFFFF',fontSize:16,fontFamily:FONT_M}}>
                            {appState.lan.fundPage.title13}
                        </Label>


                    </LinearGradient>
                </TouchableOpacity>
                {/*<View style={{width:screenW-50,alignItems:'center'}}>*/}
                {/*    <Label style={{fontFamily:FONT_R,color:'#999999',fontSize:13,marginTop:6}}*/}
                {/*           numberOfLines={100}>*/}
                {/*        {appState.lan.fundPage.title14 +'='+this.state.netRedFundData.poundage}</Label>*/}
                {/*</View>*/}

                <TouchableOpacity style={{marginTop:15}} onPress={()=>{
                    //this.showInPop('zoomOut', true, 'Pop modal')
                    this.netRedFundRenewal()
                }}>
                    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#B9EEFD','#D885F8']}
                                    style={{width:screenW-50,height:48,
                                        marginTop:10,
                                        borderRadius:24,
                                        flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                        <Label
                            style={{color:'#FFFFFF',fontSize:16,fontFamily:FONT_M}}>
                            {appState.lan.fundPage.title15}
                        </Label>
                    </LinearGradient>
                </TouchableOpacity>
                <View style={{width:screenW-50,alignItems:'center'}}>
                    <Label style={{fontFamily:FONT_R,color:'#999999',fontSize:13,marginTop:6}}
                           numberOfLines={100}>
                        {appState.lan.fundPage.title16 +'='+this.state.netRedFundData.poundage}</Label>
                </View>
            </ScrollView>

        </View>
    }


}
