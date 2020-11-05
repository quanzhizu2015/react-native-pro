import React, {Component} from 'react';
import {NavigationPage,NavigationBar,Label,Overlay,Theme,Button} from 'teaset';
import {View,ScrollView,Dimensions,StyleSheet,Image,Text,RefreshControl} from 'react-native';
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
import {
    appState,
    miningPoolIndex,
    miningPoolTransferIntoView,
    miningPoolTransferOutView,
    transferInto, transferOut,
} from '../../comm/sdk';
import Toast from 'teaset/components/Toast/Toast';
import CalculationDisPage from './CalculationDisPage';
//import CustomScrollView from 'custom-scroll-view'

//const AnimatedCustomScrollView = Animated.createAnimatedComponent(CustomScrollView)
export default class MyPoolPage extends NavigationPage {

    constructor(props){
        super(props);
        this.state={
            isRefreshing:false,
            in_count:'',
            in_password:'',

            out_count:'',
            out_password:'',

            in_balance:0.0,
            out_balance:0.0,
            poolData:{
                today_earning:0,
                currency_holding_power:'',
                promote_computing_power:'',
                best_holding_currency:0,
                minimum_holding_currency:'',
                pool_balance:0,
                recent_currency_holding_income:0
                // personal_computing_power: "",
                // percentage_of_personal_computing_power: "",
                // mining_coefficient: "",
                // mining_rewards_today: 0,
                // mining_rewards_today_currency: "",
                // currency_holding_power: 0,
                // bimodal_computing_power: 0,
                // time_bonus_computing_power: 0,
                // invite_computing_power: 0
            },
        }
    }


    loadData(){
        miningPoolIndex().then((respond)=>{
            if (respond.code==200){
                this.setState({
                    poolData:respond.data,
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
        this.transferInView()
        this.transferOutView()
    }

    onRefreshDataHandler(){
        this.loadData()
    }

    transferIn(){

        if(!this.state.in_count.trim()){
            Toast.show({
                text:appState.lan.myPool.tip12,
                position: 'center',
            })

            return
        }
        if(!this.state.in_password.trim()){
            Toast.show({
                text:appState.lan.myPool.tip13,
                position: 'center',
            })

            return
        }
        transferInto(
            {
                amount:this.state.in_count,
                pay_password:this.state.in_password
            }
        ).then((respond)=>{
            if (respond.code==200){

                this.transferInView()
                this.loadData()
                this.overlayPopView && this.overlayPopView.close()


            }else{
                Toast.show({
                    text:respond.message,
                    position: 'center',
                })

            }
        })

    }


    transferOut(){

        if(!this.state.out_count.trim()){
            Toast.show({
                text:appState.lan.myPool.tip12,
                position: 'center',
            })

            return
        }
        if(!this.state.out_password.trim()){
            Toast.show({
                text:appState.lan.myPool.tip13,
                position: 'center',
            })

            return
        }
        transferOut(
            {
                amount:this.state.out_count,
                pay_password:this.state.out_password
            }
        ).then((respond)=>{
            if (respond.code==200){

                this.transferOutView()
                this.loadData()
                this.overlayPopView && this.overlayPopView.close()


            }else{
                Toast.show({
                    text:respond.message,
                    position: 'center',
                })

            }
        })

    }


    transferInView(){
        miningPoolTransferIntoView(

        ).then((respond)=>{
            if (respond.code==200){

                this.setState({
                    in_balance:respond.data.balance
                })

            }else{
                Toast.show({
                    text:respond.message,
                    position: 'center',
                })

            }
        })

    }

    transferOutView(){
        miningPoolTransferOutView(

        ).then((respond)=>{
            if (respond.code==200){

                this.setState({
                    out_balance:respond.data.balance
                })

            }else{
                Toast.show({
                    text:respond.message,
                    position: 'center',
                })

            }
        })

    }

    //转入
    showInPop(type, modal, text) {

       this.setState({
           in_count:'',
           in_password:'',
       })
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
                        minHeight: 275, borderRadius: 15,}}>
                        <View>
                            <Label style={{color:'#333333',fontSize:15,fontFamily:FONT_R}} type='title' size='xl' text={appState.lan.myPool.title19} />
                            <Input
                                style={{marginTop: 4,borderColor:'#ffffff00',
                                    height:44,fontSize:15,backgroundColor:'#F0F0F0',color:'#000',width:screenW-100}}
                                placeholder={appState.lan.myPool.tip15+this.state.in_balance}
                                placeholderTextColor={'#9E9E9E'}
                                keyboardType = 'number-pad'
                                onChangeText={text => this.setState({in_count: text})}
                            />
                        </View>

                        <View style={{marginTop: 20}}>
                            <Label style={{color:'#333333',fontSize:15,fontFamily:FONT_R}} type='title' size='xl' text={appState.lan.myPool.title20} />
                            <Input
                                style={{marginTop: 4,borderColor:'#ffffff00',
                                    height:44,fontSize:15,backgroundColor:'#F0F0F0',color:'#000',width:screenW-100}}
                                placeholder={appState.lan.myPool.tip16}
                                placeholderTextColor={'#9E9E9E'}
                                keyboardType = 'email-address'
                                secureTextEntry={true}
                                onChangeText={text => this.setState({in_password: text})}
                            />
                        </View>

                        <View style={{flexDirection: 'row',justifyContent: 'space-between',marginTop: 20}}>
                            <TouchableOpacity onPress={() => this.overlayPopView && this.overlayPopView.close()}>
                                <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#383838','#383838']}
                                                style={{paddingLeft:10,paddingRight:10,width:(screenW-115)/2,height:44,borderRadius:22,flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                                    <Label
                                        style={{color:'#FFFFFF',fontSize:13,fontFamily:FONT_M}}>
                                        {appState.lan.myPool.title2}
                                    </Label>


                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.transferIn()
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




    //转出
    showOutPop(type, modal, text) {
        this.transferOutView()
        this.setState({
            out_count:'',
            out_password:'',
        })
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
                        minHeight: 275, borderRadius: 15,}}>
                        <View>
                            <Label style={{color:'#333333',fontSize:15,fontFamily:FONT_R}} type='title' size='xl' text={appState.lan.myPool.title27}/>
                            <Input
                                style={{marginTop: 4,borderColor:'#ffffff00',
                                    height:44,fontSize:15,backgroundColor:'#F0F0F0',color:'#000',width:screenW-100}}
                                placeholder={appState.lan.myPool.tip15+this.state.out_balance}
                                placeholderTextColor={'#9E9E9E'}
                                keyboardType = 'number-pad'
                                onChangeText={text => this.setState({out_count: text})}
                            />
                        </View>

                        <View style={{marginTop: 20}}>
                            <Label style={{color:'#333333',fontSize:15,fontFamily:FONT_R}} type='title' size='xl' text={appState.lan.myPool.title20}/>
                            <Input
                                style={{marginTop: 4,borderColor:'#ffffff00',
                                    height:44,fontSize:15,backgroundColor:'#F0F0F0',color:'#000',width:screenW-100}}
                                placeholder={appState.lan.myPool.tip16}
                                placeholderTextColor={'#9E9E9E'}
                                keyboardType = 'email-address'
                                secureTextEntry={true}
                                onChangeText={text => this.setState({out_password: text})}
                            />
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

                                this.transferOut()
                               // this.overlayPopView && this.overlayPopView.close()
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
        const { onScroll = () => {} } = this.props;
        return (
            <View style={{flex:1,backgroundColor:'#111214'}}>
                <ParallaxScrollView
                    refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefreshDataHandler.bind(this)} />}
                    onScroll={onScroll}
                    backgroundColor="#FFffff00"
                    contentBackgroundColor="#FFffff00"
                    stickyHeaderHeight={ 50+statusBarHeight }
                    parallaxHeaderHeight={ 350-109 }
                    backgroundSpeed={10}
                    renderBackground={() => (
                        <View key="background">
                            <Image style={{width:screenW}} source={require('../../assert/mine/pic_bg.png')}/>
                            <View style={{position: 'absolute',
                                top: 0,
                                width: window.width,
                                backgroundColor: 'rgba(0,0,0,0)',
                                height: 209}}/>
                        </View>
                    )}

                    renderForeground={() => (
                        <View key="parallax-header" style={{ alignItems:'center'}}>
                            <View style={{height:statusBarHeight}}/>
                            <View style={{paddingLeft:25,paddingRight:25,height:44,width:screenW,flexDirection: 'row',alignItems: 'center',justifyContent:'space-between'}}>

                            </View>
                            <View style={{marginTop:20,alignItems: 'center',width:screenW,paddingLeft:25,paddingRight:25}}>
                                <Label style={{fontFamily:FONT_M,fontSize:14,color:'#fff'}}>{appState.lan.myPool.tip17}</Label>
                                {/*<Label style={{marginTop:0,fontFamily:FONT_S,fontSize:36,color:'#fff'}}>{this.state.poolData.personal_computing_power}</Label>*/}
                                <Label style={{fontFamily:FONT_S,fontSize:36,color:'#fff',marginTop: 10}}>{this.state.poolData.today_earning==null?0.00:this.state.poolData.today_earning}</Label>

                                <TouchableOpacity style={{marginTop: 5}} onPress={()=>{this.navigator.push({view:<InComeDetailPage/>})}}>

                                    <View style={{flexDirection:'row',alignItems: 'center'}}>
                                        <Label style={{color:'#FFFFFF',fontSize:13}}>
                                            {appState.lan.myPool.tip4}

                                        </Label>
                                        <Image style={{width:16,height:16,marginLeft:5}} source={require('../../assert/mine/ico_arrow_right_white.png')}/>
                                    </View>

                                </TouchableOpacity>
                                {/*<View style={{width:screenW-50,height:159,paddingLeft:20,paddingRight:20,backgroundColor:'#fff',borderRadius:10,marginTop:15}}>*/}
                                {/*    <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems: 'center'}}>*/}
                                {/*        <View style={{width:(screenW-90)/2,height:100,alignItems: 'center',justifyContent:'center'}}>*/}
                                {/*            <Label style={styles.title}>{appState.lan.myPool.tip2}</Label>*/}
                                {/*            <Label style={styles.content}>{this.state.poolData.percentage_of_personal_computing_power}</Label>*/}
                                {/*        </View>*/}
                                {/*        <View style={{backgroundColor:'#999999',width:1,height:20}}/>*/}
                                {/*        <View style={{width:(screenW-90)/2,height:100,alignItems: 'center',justifyContent:'center'}}>*/}
                                {/*            <Label style={styles.title}>{appState.lan.myPool.tip3}</Label>*/}
                                {/*            <Label style={styles.content}>{this.state.poolData.mining_coefficient}</Label>*/}
                                {/*        </View>*/}
                                {/*    </View>*/}
                                {/*    <TouchableOpacity onPress={()=>{this.navigator.push({view:<InComeDetailPage/>})}}>*/}
                                {/*        <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#FF8FB9','#FF4179']}*/}
                                {/*                        style={{paddingLeft:10,paddingRight:10,width:screenW-90,height:44,borderRadius:5,flexDirection: 'row',justifyContent:'space-between',alignItems:'center'}}>*/}
                                {/*            <Label*/}
                                {/*                style={{color:'#FFFFFF',fontSize:13}}>*/}
                                {/*                {appState.lan.myPool.tip4}*/}

                                {/*            </Label>*/}
                                {/*            <View style={{flexDirection:'row',alignItems: 'center'}}>*/}
                                {/*                <Label style={{fontFamily:FONT_M,fontSize:16,color:'#fff'}}>{this.state.poolData.mining_rewards_today+this.state.poolData.mining_rewards_today_currency}</Label>*/}
                                {/*                <Image style={{width:16,height:16,marginLeft:5}} source={require('../../assert/mine/ico_arrow_right_white.png')}/>*/}
                                {/*            </View>*/}

                                {/*        </LinearGradient>*/}

                                {/*    </TouchableOpacity>*/}


                                {/*</View>*/}

                            </View>

                        </View>
                    )}

                    // renderStickyHeader={() => (
                    //     <View key="sticky-header" style={{backgroundColor:'#11121400'}}>
                    //         <View style={{height:statusBarHeight}}/>
                    //         <View style={{paddingLeft:25,paddingRight:25,height:44,width:screenW,flexDirection: 'row',alignItems: 'center',justifyContent:'space-between'}}>
                    //             <NavigationIconButton
                    //                 icon={require('../../assert/home/index_ico_arrow_left.png')}
                    //                 imageStyle={{width:9,height:17}}
                    //                 onPress={()=>{this.navigator.pop()}}
                    //             />
                    //             <Label style={{color:'#fff',fontSize:18,fontFamily:FONT_R}}>我的矿池</Label>
                    //             <NavigationIconButton
                    //                 icon={require('../../assert/mine/ico_fund_record.png')}
                    //                 imageStyle={{width:26,height:26}}
                    //                 onPress={()=>{this.navigator.pop()}}
                    //             />
                    //         </View>
                    //     </View>
                    // )}

                    // renderFixedHeader={() => (
                    //     <View key="fixed-header" style={styles.fixedSection}>
                    //         <Text style={styles.fixedSectionText}
                    //               onPress={() => this.refs.ListView.scrollTo({ x: 0, y: 0 })}>
                    //             Scroll to top
                    //         </Text>
                    //     </View>
                    // )}
                >
                    <View style={{ height: 400-50,paddingLeft:25,paddingRight:25,width:screenW}}>
                        <View style={{width:screenW-50,height:224-50,backgroundColor:'#1E1D1E',borderRadius:5}}>
                            <ListRow
                                style={{paddingLeft:20,paddingRight:20,backgroundColor:'#ffffff00'}}
                                bottomSeparator={'none'}
                                title={<Label style={styles.itemText}>{appState.lan.myPool.tip5}</Label>}
                                detail={<Label style={styles.itemText}>{this.state.poolData.currency_holding_power}</Label>} />
                            <ListRow
                                style={{paddingLeft:20,paddingRight:20,backgroundColor:'#ffffff00'}}
                                bottomSeparator={'none'}
                                //accessory = {'indicator'}
                                // onPress={()=>{
                                //     this.navigator.push({view:<CalculationDisPage type={1}/>})
                                // }}
                                title={<Label style={styles.itemText}>{appState.lan.myPool.tip6}</Label>}
                                detail={<Label style={styles.itemText}>{this.state.poolData.promote_computing_power}</Label>}
                            />
                            <ListRow
                                style={{paddingLeft:20,paddingRight:20,backgroundColor:'#ffffff00'}}
                                bottomSeparator={'none'}
                                title={<Label style={styles.itemText}>{appState.lan.myPool.tip18}</Label>}
                                detail={<Label style={styles.itemText}>{this.state.poolData.best_holding_currency+' ('+appState.lan.myPool.tip9+':'+this.state.poolData.recent_currency_holding_income+'T)'}</Label>} />
                            <ListRow
                                style={{paddingLeft:20,paddingRight:20,backgroundColor:'#ffffff00'}}
                                bottomSeparator={'none'}
                                title={<Label style={styles.itemText}>{appState.lan.myPool.tip7}</Label>}
                                detail={<Label style={styles.itemText}>{this.state.poolData.minimum_holding_currency}</Label>} />
                            {/*<ListRow*/}
                            {/*    style={{paddingLeft:20,paddingRight:20,backgroundColor:'#ffffff00'}}*/}
                            {/*    bottomSeparator={'none'}*/}
                            {/*    title={<Label style={styles.itemText}>{appState.lan.myPool.tip8}</Label>}*/}
                            {/*    detail={<Label style={styles.itemText}>{this.state.poolData.pool_balance}</Label>} />*/}

                            {/*<TouchableOpacity onPress={()=>{this.navigator.push({view:<CalculationPage/>})}}>*/}
                            {/*    <View style={{height:44,width:screenW-50,flexDirection: 'row',alignItems: 'center',justifyContent: 'center'}}>*/}
                            {/*        <Label style={{color:'#EF50AB',fontFamily:FONT_M,fontSize:14}}>{appState.lan.myPool.tip9}</Label>*/}
                            {/*        <Image style={{width:16,height:16,marginLeft:5}} source={require('../../assert/mine/ico_arrow_right_purple.png')}/>*/}
                            {/*    </View>*/}
                            {/*</TouchableOpacity>*/}
                        </View>
                        {/*<View style={{flexDirection: 'row',justifyContent: 'space-between',marginTop: 50}}>*/}
                        {/*    <TouchableOpacity onPress={()=>{ this.showInPop('zoomOut', true, 'Pop modal')}}>*/}
                        {/*        <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#B9EEFD','#D885F8']} style={{paddingLeft:10,paddingRight:10,width:(screenW-75)/2,height:44,borderRadius:22,flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>*/}
                        {/*            <Label*/}
                        {/*                style={{color:'#FFFFFF',fontSize:13,fontFamily:FONT_M}}>*/}
                        {/*                {appState.lan.myPool.tip10}*/}

                        {/*            </Label>*/}


                        {/*        </LinearGradient>*/}
                        {/*    </TouchableOpacity>*/}
                        {/*    <TouchableOpacity onPress={()=>{ this.showOutPop('zoomOut', true, 'Pop modal')}}>*/}
                        {/*        <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#B9EEFD','#D885F8']} style={{paddingLeft:10,paddingRight:10,width:(screenW-75)/2,height:44,borderRadius:22,flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>*/}
                        {/*            <Label*/}
                        {/*                style={{color:'#FFFFFF',fontSize:13,fontFamily:FONT_M}}>*/}
                        {/*                {appState.lan.myPool.tip11}*/}
                        {/*            </Label>*/}


                        {/*        </LinearGradient>*/}
                        {/*    </TouchableOpacity>*/}

                        {/*</View>*/}

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
                        <Label style={{color:'#fff',fontSize:18,fontFamily:FONT_R}}>{appState.lan.myPool.title}</Label>
                        {/*<NavigationIconButton*/}
                        {/*    icon={require('../../assert/mine/ico_fund_record.png')}*/}
                        {/*    imageStyle={{width:26,height:26}}*/}
                        {/*    onPress={()=>{this.navigator.push({view:<TransferRecordPage/>})}}*/}
                        {/*/>*/}
                        <View style={{width:19,height:17}}/>

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
