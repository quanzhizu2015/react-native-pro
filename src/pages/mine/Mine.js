import React, {Component} from 'react';
import {NavigationPage,Overlay,Button,Label} from 'teaset';
import {Image, ScrollView, StatusBar, View,ImageBackground,RefreshControl,DeviceEventEmitter} from 'react-native';
import {safeAreaViewHeight, screenW, statusBarHeight} from '../../comm/Unitl';
import ProjectItem from '../project/ProjectItem';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import ProjectDetail from '../project/ProjectDetail';
import LinearGradient from "react-native-linear-gradient";
//import FastImage from 'react-native-fast-image'
import {FONT_M} from '../../comm/Fonts';
import {DashSecondLine} from '../../comm/views/DashSecondLine';
import MenuItem from './MenuItem';
import RegisterPage from '../Login/RegisterPage';
import LoginPage from '../Login/LoginPage';
import MyPoolPage from './MyPoolPage';
import InComePage from './InComePage';
import CalculationPage from './CalculationPage';
import FundPage from './FundPage';
import CustomerServicePage from './CustomerServicePage';
import AboutUs from './AboutUs';
import AccountSafe from './AccountSafe';
import MyWalletPage from './MyWalletPage';
import InvitePage from './InvitePage';
import {
    appState,
    miningPoolIndex,
    miningPoolIntroduction,
    nodeUserNotice,
    setToken,
    tradePairAll,
    userInfo,
} from '../../comm/sdk';
import Toast from 'teaset/components/Toast/Toast';
import CollideTradePage from './CollideTradePage';
import MnemonicCopy from '../../Mnemonic/MnemonicCopy';
import MineTeam from './MineTeam';
import Project from '../project/Project';
import {apiSecurity} from '../../comm/webSocket/UnitTool';
import SuoCangePage1 from './SuoCangePage1';
export default class Mine extends NavigationPage {


    loadMenuData(){
        this.menuData = [
            {
                image:require('../../assert/mine/menu1.png'),
                title:appState.lan.mine.title6
            },

            {
                image:require('../../assert/mine/menu2.png'),
                title:appState.lan.mine.title7
            },

            {
                image:require('../../assert/mine/menu3.png'),
                title:appState.lan.mine.title8
            },
            {
                image:require('../../assert/mine/menu4.png'),
                title:appState.lan.mine.title9
            },

            {
                image:require('../../assert/mine/menu5.png'),
                title:appState.lan.mine.title10
            },
            {
                image:require('../../assert/mine/menu6.png'),
                title:appState.lan.mine.title40
            },
            {
                image:require('../../assert/mine/menu7.png'),
                title:appState.lan.mine.title41
            },
            {
                image:require('../../assert/mine/menu8.png'),
                title:appState.lan.mine.title42
            },
            {
                image:require('../../assert/mine/menu9.png'),
                title:appState.lan.mine.title43
            }

        ]
        if (appState.is_node_user==1){
            this.menuData.push(
                {
                    image:require('../../assert/mine/menu10.png'),
                    title:appState.lan.mine.title44
                }
            )}
    }
    constructor(props) {
        super(props);

        this.state={
            isRefreshing:false,
            poolData:{
                today_earning:0,
                currency_holding_power: 0,
                promote_computing_power:0,

                personal_computing_power: "",
                percentage_of_personal_computing_power: "",
                mining_coefficient: "",
                mining_rewards_today: 0,
                mining_rewards_today_currency: "",
                bimodal_computing_power: 0,
                time_bonus_computing_power: 0,
                invite_computing_power: 0,
            },
            node_notice:{
                content:''

            },
            userInfoData:{
                username:''
            },
            data : [
                {
                    title: appState.lan.mine.title3,
                    count: 0
                },
                {
                    title: appState.lan.mine.title4,
                    count: 0
                },
                {
                    title: appState.lan.mine.title5,
                    count: 0
                }
            ]
        }

       // this.loadMenuData()

    }

    loadData(){

        this.setState({isRefreshing:true})
        miningPoolIntroduction().then((respond)=>{
            if (respond.code==200){
                let data =  [
                    {
                        title: appState.lan.mine.title3,
                        count: respond.data.today_earning
                    },
                    {
                        title: appState.lan.mine.title4,
                        count: respond.data.currency_holding_power
                    },
                    {
                        title: appState.lan.mine.title5,
                        count: respond.data.promote_computing_power
                    }
                ]
                this.setState({
                    poolData:respond.data,
                    data:data,
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
        this.userInfomation()
    }


    userInfomation(){

        userInfo().then((respond)=>{
            if (respond.code==200){

                this.setState({
                    userInfoData:respond.data,
                })

            }else{

                Toast.show({
                    text:respond.message,
                    position: 'center',
                })

            }
        })
    }

    nodeUsernotice(){

        nodeUserNotice().then((respond)=>{
            if (respond.code==200){

                this.setState({
                    node_notice:respond.data.node_notice,
                })

            }else{
                Toast.show({
                    text:respond.message,
                    position: 'center',
                })

            }
        })

    }

    // tradePair(){
    //     tradePairAll().then((respond)=>{
    //         if (respond.code==0){
    //
    //             if (respond.data!= null && respond.data.length>0){
    //
    //             }
    //
    //         }else{
    //             Toast.show({
    //                 text:respond.msg,
    //                 position: 'center',
    //             })
    //
    //         }
    //     })
    // }

    showPop(type, modal, text) {
        let overlayView = (
            <Overlay.PopView
                style={{alignItems: 'center', justifyContent: 'center'}}
                type={type}
                modal={modal}
                ref={v => this.overlayPopView = v}
            >
                <View style={{minHeight:200+180+35,width: screenW-50}}>
                    <View style={{backgroundColor: '#ffffff', width: screenW-50, minHeight: 180+35,
                        borderRadius: 15, justifyContent: 'center', alignItems: 'center'
                        ,marginTop:100,paddingLeft:20,paddingRight:20,paddingBottom:30,paddingTop:60}}>

                        <ImageBackground style={{width:160,height:35,alignItems:'center',justifyContent:'center'}} source={require('../../assert/mine/title_bg.png')}>
                            <Label style={{fontSize:16,color:'#ffffff'}}>
                                {appState.lan.mine.title19}
                            </Label>

                        </ImageBackground>
                        <Label style={{fontSize:15,color:'#999999',marginTop:20}} numberOfLines={10}>
                            {this.state.node_notice.content}
                        </Label>

                    </View>
                    <View style={{position:'absolute',width: screenW-50,left:0,top:0,flexDirection:'row',justifyContent:'center',alignItems:'flex-end'}}>

                        <Image style={{width:203,height:200}} source={require('../../assert/mine/globle.png')}/>
                        <TouchableOpacity style={{position:'absolute',left:screenW-90,top:60}} onPress={() => this.overlayPopView && this.overlayPopView.close()}>
                            <Image style={{width:25,height:39}} source={require('../../assert/mine/close.png')}/>
                        </TouchableOpacity>

                    </View>

                </View>

            </Overlay.PopView>
        );
        Overlay.show(overlayView);
    }



    componentDidMount() {
        super.componentDidMount();
        this.loadData()
        if (appState.is_node_user==1){
            this.nodeUsernotice()
        }

        this.listener = DeviceEventEmitter.addListener('changeLange',(index)=>{
            this.loadData()
        });

    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.listener.remove();

    }

    renderItem(item,isShow,index){

      let itemWidth = (screenW-50)/3.0
      return  <TouchableOpacity  onPress={()=>{
          switch (index) {
              case 0:
                  this.navigator.push({view:<InComePage/>})
                  break
              case 1:
                  //this.navigator.push({view:<RegisterPage/>})
                  break
              case 2:
                  //this.navigator.push({view:<CalculationPage/>})
                  break
              default:
                  break

          }
      }}>
          <View style={{width:itemWidth,height:110,paddingTop:15,paddingBottom:15,flexDirection:'row'}}>
              <View style={{width:itemWidth-1,alignItems:'center',justifyContent:'space-between'}}>
                  <Label style={{color:'#fff',fontFamily:FONT_M,fontSize:13}}>{item.title}</Label>
                  <Label style={{fontFamily:'BebasNeue',color:'#fff',fontSize:18}} numberOfLines={2}>{item.count}</Label>
                  <Label style={{color:'#fff',fontFamily:FONT_M,fontSize:10}}>{item.name}</Label>

              </View>
              {
                  isShow?<DashSecondLine len={20} backgroundColor={'#fff'}/>:<View/>
              }

          </View>
        </TouchableOpacity>

    }


    renderMenu(){
        return <View style={{paddingLeft:25,paddingRight:25,height:285+95,marginTop:20}}>
            <View style={{borderRadius:10,flexWrap:'wrap',flexDirection:'row',backgroundColor:'#1E1B1F00',height:285+95}}>
                {this.menuData.map((item,index)=>{
                    return <MenuItem key={'menu'+index} item={item}
                                     onPress={()=>{
                                         if(index==0){
                                             this.navigator.push({view:<SuoCangePage1/>})
                                         }
                                         if(index==1){
                                             this.navigator.push({view:<MyWalletPage/>})

                                         }
                                         if(index==2){ // 我的团队

                                             this.navigator.push({view:<MineTeam/>})

                                         }
                                         if(index==3){ //活动

                                            //let sign = apiSecurity()
                                            // this.tradePair()

                                             Toast.show({
                                                 text:appState.lan.mine.tip12,
                                                 position: 'center',
                                             })
                                         }

                                         if(index==4){  // 网红排行

                                             Toast.show({
                                                 text:appState.lan.mine.tip12,
                                                 position: 'center',
                                             })
                                         }
                                         if(index==5){
                                             this.navigator.push({view:<Project/>})

                                         }
                                         if(index==6){

                                             this.navigator.push({view:<AccountSafe callbackAction={()=>{this.userInfomation()}}/>})

                                            // this.navigator.push({view:<FundPage/>})
                                         }


                                         if(index==7){
                                             this.navigator.push({view:<AboutUs/>})

                                         }
                                         if(index==8){
                                             this.navigator.push({view:<CustomerServicePage/>})

                                         }
                                         if(index==9){
                                              this.nodeUsernotice()
                                              this.showPop('zoomOut', true, 'Pop modal')

                                         }
                                     }}
                                     navigator={this.navigator}
                                     isShowLine={true}/>
                })}
            </View>

        </View>
    }

    render(){

        this.loadMenuData()
        return <View style={{flex:1,backgroundColor:'#111214'}}>
            <StatusBar barStyle={'light-content'} />
            <Image style={{width:screenW,height:495,position:'absolute',left:0,top:0}} source={require('../../assert/home/bg_header.png')}/>
            <View style={{height:statusBarHeight+safeAreaViewHeight}}/>
            <View style={{height:44,width:screenW,flexDirection:'row',paddingLeft:25,paddingRight:25,alignItems:'center',justifyContent:'space-between'}}>
                <View style={{width:1,height:1}}/>

                <TouchableOpacity onPress={()=>{
                    this.navigator.push({view:<InvitePage type={1}/>})
                }}>
                    <Image style={{width:20,height:20}} source={require('../../assert/mine/scaleCode.png')}/>
                </TouchableOpacity>

            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.loadData.bind(this)}
                        // colors={['red', 'blue', 'green']}
                        // progressBackgroundColor='#ffff00'
                        // enabled={true}
                    />
                }

            >
                <View style={{paddingLeft:25,paddingRight:60,height:64+50,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <LinearGradient start={{x: 1, y: 0}} end={{x: 1, y: 1}} colors={['#FF20C9', '#9F04EF']}
                                        style={{width:64,height:64,justifyContent:'center',borderRadius:32,padding:2}}>
                            <Image style={{width:60,height:60,borderRadius:30}}  source={(appState.userUrl==null||appState.userUrl.length<=0)?require('../../assert/project/default_header.png'):{uri:appState.userUrl}}/>
                        </LinearGradient>
                       <View style={{marginLeft:18,marginTop:0}}>
                           <Label style={{fontFamily:FONT_M,fontSize:16,color:'#fff'}}>{this.state.userInfoData.username}</Label>
                           {/*<View style={{marginTop:5,flexDirection:'row',alignItems:'center'}}>*/}
                           {/*    <TouchableOpacity onPress={()=>{this.navigator.push({view:<InvitePage type={1}/>})}}>*/}
                           {/*        <View style={{flexDirection:'row',justifyContent:'center',borderRadius:9,alignItems:'center',width:75,height:18,backgroundColor:'#D79DFF'}}>*/}
                           {/*            <Image style={{width:8,height:8}} source={require('../../assert/mine/mine_code.png')}/>*/}
                           {/*            <Label style={{marginLeft:5,color:'#fff',fontFamily:FONT_M,fontSize:9}}>热力邀请码</Label>*/}
                           {/*        </View>*/}
                           {/*    </TouchableOpacity>*/}
                           {/*    <TouchableOpacity style={{marginLeft:10}} onPress={()=>{this.navigator.push({view:<InvitePage type={2}/>})}}>*/}
                           {/*        <View style={{flexDirection:'row',justifyContent:'center',borderRadius:9,alignItems:'center',width:75,height:18,backgroundColor:'#56D3F4'}}>*/}
                           {/*            <Image style={{width:8,height:8}} source={require('../../assert/mine/mine_code.png')}/>*/}
                           {/*            <Label style={{marginLeft:5,color:'#fff',fontFamily:FONT_M,fontSize:9}}>人气邀请码</Label>*/}
                           {/*        </View>*/}
                           {/*    </TouchableOpacity>*/}
                           {/*</View>*/}
                       </View>
                    </View>
                    <Image style={{width:58,height:41,marginTop:-10}} source={require('../../assert/home/home_logo.png')}/>
                </View>
               <View style={{paddingLeft:25,paddingRight:25}}>
                   <ImageBackground style={{width:screenW-50,height:110,flexDirection:'row'}} source={require('../../assert/mine/bg-mine.png')}>
                       {
                           this.state.data.map((item,index)=>{
                               return this.renderItem(item,index==2?false:true,index)
                           })
                       }

                   </ImageBackground>
               </View>
                {this.renderMenu()}

            </ScrollView>

        </View>
    }

}
