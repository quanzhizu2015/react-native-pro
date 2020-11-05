import React,{Component} from 'react';
import {View, Image, Text, StatusBar, Alert, Linking, DeviceEventEmitter} from 'react-native';
import {NavigationPage,TabView,Toast,Overlay,Theme,Button,Label} from 'teaset'
import {observer} from 'mobx-react';
import {appState, autoLogin, loadLan, versionIndex} from './comm/sdk';
import LoginPage from './pages/Login/LoginPage';
import Home from './pages/home/Home';
import Project from './pages/project/Project';
import Score from './pages/score/Score';
import Mine from './pages/mine/Mine';
import {screenH, screenW} from './comm/Unitl';
import SplashScreen from 'react-native-splash-screen'
import DeviceInfo from 'react-native-device-info';
import {downLoadHost} from './comm/config';
import Trade from './pages/trade/Trade';
import TradePage from './pages/trade/TradePage';
import {getHeaders} from './comm/DeviceInfo';
import {WebSocketClient} from './comm/webSocket/WebSocketClient';

const TabTitle = ({children, active,color1,color2,isNormal}) => {
    return <Text style={{ fontWeight: "bold", fontSize: 8 ,height:15,color:isNormal?active?color1:'#8C8C8C':color1}}>{children}</Text>
}

@observer
export default  class RootPage extends NavigationPage{




    showPop(type, modal, text,title,content) {
        let overlayView = (
            <Overlay.PopView
                style={{alignItems: 'center', justifyContent: 'center'}}
                type={type}
                modal={modal}
                ref={v => this.overlayPopView = v}
            >
                <View style={{backgroundColor: Theme.defaultColor,paddingLeft:20,paddingRight:20,paddingBottom:20,paddingTop:20, width: screenW-100, minHeight: 180, borderRadius: 15, justifyContent: 'center', alignItems: 'center'}}>
                    <Label style={{fontSize:20}} type='title'  text={title} />
                    <Label style={{fontSize:16,marginTop:20}} numberOfLines={18} type='title'  text={content} />
                    {modal ? <View style={{height: 40}} /> : null}
                    {modal ? <Button title={appState.lan.myPool.title1} onPress={() => this.openUrl()} /> : null}
                </View>
            </Overlay.PopView>
        );
        Overlay.show(overlayView);
    }

    openUrl(){
        let baiduURL = downLoadHost+'download'
        Linking.canOpenURL(baiduURL).then(supported => {
            if (!supported) {
                console.warn('Can\'t handle url: ' + baiduURL);
            } else {
                return Linking.openURL(baiduURL);
            }
        }).catch(err => console.error('An error occurred',baiduURL));

    }

    appVersion(){
        versionIndex().then((respond)=>{
            if (respond.code==200){
                if(respond.data.version !=null && respond.data.version.length>0){
                    let aa = respond.data.version
                    while (aa.indexOf('.') != -1){
                        aa= aa.replace('.','')
                    }
                    let version = parseInt(aa)
                    if(version>this.version){
                        if (respond.data.force==1){

                            this.showPop('zoomOut', true, 'Pop modal',appState.lan.apps.tip1+respond.data.version,respond.data.content)

                            // Alert.alert(appState.lan.apps.tip1+respond.data.version,respond.data.content
                            //     ,[
                            //         {text: appState.lan.myPool.title2, onPress: () => {}},
                            //         {text: appState.lan.myPool.title1, onPress: ()=>{this.openUrl()}},
                            //     ])
                        }else {
                            Alert.alert(appState.lan.apps.tip1+respond.data.version,respond.data.content
                                ,[
                                    {text: appState.lan.myPool.title2, onPress: () => {}},
                                    {text: appState.lan.myPool.title1, onPress: ()=>{this.openUrl()}},
                                ])
                        }

                    }else{
                        // Toast.show({
                        //     text:'当前已是最新版本',
                        //     position: 'center',
                        // })
                    }

                }else {
                    Toast.show({
                        text:appState.lan.apps.tip3,
                        position: 'center',
                    })
                }
            }else{
                Toast.show({
                    text:respond.msg,
                    position: 'center',
                })

            }

        })
    }

    componentDidMount() {
        super.componentDidMount();
        SplashScreen.hide();
        getHeaders()
        loadLan().then((respond)=>{

        })





        autoLogin(null).then((respond)=>{

            if (respond){

                WebSocketClient.getInstance().initWebSocket()
                let time1 = parseInt(new Date().valueOf()/1000)

                //WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":7,"type":3,"param":{"resolution":"60","klineId":1,"type":2,"limit":150,"endTime":time1}}))
                //WebSocketClient.getInstance().sendMessage(JSON.stringify({"id":1,"param":{"pageSize":20,"pageNo":1,"assetId":1,"status":"8,9","type":1,"pairId":"","tab":1},"reqType":5,"type":1,"sessionId":appState.trade_token}))

                // WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":7,"type":2,"param":{"resolution":"60","klineId":1,"type":2,"limit":150,"endTime":time1}}))

            }


        })
        let version=DeviceInfo.getVersion().replace('.','')
        let aa = version
        while (aa.indexOf('.') != -1){
            aa= aa.replace('.','')
        }
        this.version = parseInt(aa)
        this.appVersion()


        DeviceEventEmitter.addListener('pushEmitterTrade', (data)=>{

            this.changeTab(data)

        })


    }

    componentWillUnmount() {
        super.componentWillUnmount();
        DeviceEventEmitter.removeListener('pushEmitterTrade')
    }


    state = {
        activeIndex: 0,
    }

    changeTab = (index) => {
        this.setState({activeIndex: index})
    }

    render (){
        if (!appState.login){
            this.state.activeIndex = 0
            return  <LoginPage/>
        }
        return <View style={{backgroundColor:'#111214',width:screenW,height:screenH}}>
            <StatusBar barStyle={'light-content'} />
            <TabView style={{flex:1}} type='projector' onChange={this.changeTab}
                     activeIndex={this.state.activeIndex} barStyle={{backgroundColor:'#111214',borderTopWidth:1,borderTopColor:'#212121'}}>
                <TabView.Sheet  title={<TabTitle  active={this.state.activeIndex === 0} color1={'#FF2769'}  color2={'#FF2769'} isNormal={true}>{appState.lan.apps.home}</TabTitle>}
                                icon={<Image style={{width:25,height:25}} source={require('./assert/tabbar/tabbar_icon1-2.png')}></Image>}
                                activeIcon={<Image style={{width:25,height:25}} source={require('./assert/tabbar/tabbar_icon1-1.png')}></Image>}
                >
                    <Home/>
                </TabView.Sheet>

                <TabView.Sheet title={<TabTitle active={this.state.activeIndex === 1} color1={'#FF2769'}  color2={'#FF2769'} isNormal={true}>{appState.lan.apps.trade}</TabTitle>}
                               icon={<Image style={{width:25,height:25}} source={require('./assert/trade/jiaoyi_normal.png')}></Image>}
                               activeIcon={<Image style={{width:25,height:25}} source={require('./assert/trade/jiaoyi.png')}></Image>}
                >
                    <Trade/>
                </TabView.Sheet>

                <TabView.Sheet title={<TabTitle  active={this.state.activeIndex === 2} color1={'#FF2769'}  color2={'#FF2769'} isNormal={true}>{appState.lan.apps.score}</TabTitle>}
                               icon={<Image style={{width:25,height:25}} source={require('./assert/tabbar/tabbar_icon4-2.png')}></Image>}
                               activeIcon={<Image style={{width:25,height:25}} source={require('./assert/tabbar/tabbar_icon4-1.png')}></Image>}
                >
                    <Score/>
                </TabView.Sheet>

                <TabView.Sheet title={<TabTitle  active={this.state.activeIndex === 3}  color1={'#FF2769'}  color2={'#FF2769'} isNormal={true}>{appState.lan.apps.mine}</TabTitle>}
                               icon={<Image style={{width:25,height:25}} source={require('./assert/tabbar/tabbar_icon5-2.png')}></Image>}
                               activeIcon={<Image style={{width:25,height:25}} source={require('./assert/tabbar/tabbar_icon5-1.png')}></Image>}
                >
                    <Mine/>
                </TabView.Sheet>



            </TabView>

        </View>
    }

}
