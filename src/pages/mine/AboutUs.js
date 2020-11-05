import React,{Component} from 'react'
import {View, ScrollView, Alert, Image, Linking,DeviceEventEmitter} from 'react-native';
import {NavigationBar, NavigationPage, ListRow, PullPicker, Toast, Overlay, Theme, Button} from 'teaset';
import Label from 'teaset/components/Label/Label';
import NavigationIconButton from '../../comm/views/NavigationIconButton';
import DeviceInfo from 'react-native-device-info';
import {screenW, unitWidth} from '../../comm/Unitl';
import {FONT_M, FONT_R} from '../../comm/Fonts';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import {appState, saveLanIndex, updateLan, versionIndex} from '../../comm/sdk';
import {downLoadHost} from '../../comm/config';
import {koa} from '../../lan/koa';
import {cn} from '../../lan/cn';


export  default  class AboutUs extends NavigationPage{

    constructor(props){
        super(props)
        this.state={
            lanIndex:appState.lanIndex

        }
        // this.items=[
        //     appState.lan.mine.tip9,
        //     //appState.lan.mine.tip10,
        //     appState.lan.mine.tip11,
        // ]
    }

    componentDidMount() {
        super.componentDidMount();

        let version=DeviceInfo.getVersion().replace('.','')
        let aa = version
        while (aa.indexOf('.') != -1){
            aa= aa.replace('.','')
        }
        this.version = parseInt(aa)
    }

    renderNavigationBar(): * {
        return  <NavigationBar
            title={<View><Label style={{fontSize:18,color:'#fff',fontFamily:FONT_R}}>{appState.lan.mine.title16}</Label></View>}
            statusBarStyle={'light-content'}
            style={{paddingLeft:25,paddingRight:25}}
            background={<View style={{flex:1,backgroundColor:'#1E1D1E'}}/>}
            leftView={<NavigationIconButton
                icon={require('../../assert/home/index_ico_arrow_left.png')}
                imageStyle={{width:20,height:20}}
                onPress={()=>{this.navigator.pop()}}
            />}
        >

        </NavigationBar>
    }

    renderTitle(title){
        return <Label style={{fontSize: 14, color: '#fff',fontFamily:FONT_M}} text={title} />
    }


    showLan() {
        PullPicker.show(
            appState.lan.mine.title15,
            this.items,
            this.state.lanIndex,
             (item, index) =>  {
                this.setState({lanIndex: index})
                //注册监听事件，时间名称：changeMine  传参：jsonData.avatar（头像url）
                DeviceEventEmitter.emit('changeLange',index);

                if (index==0){
                    appState.setState({lan:cn,lanIndex:index})

                }else if (index==1){
                    appState.setState({lan:koa,lanIndex:index})
                }
                 saveLanIndex(index).then((respond)=>{

                 })

            }
        );
    }

    showPop(type, modal, text,title,content) {
        let overlayView = (
            <Overlay.PopView
                style={{alignItems: 'center', justifyContent: 'center'}}
                type={type}
                modal={modal}
                ref={v => this.overlayPopView = v}s
            >
                <View style={{backgroundColor: Theme.defaultColor,paddingLeft:20,paddingRight:20, width: screenW-100, minHeight: 180, borderRadius: 15, justifyContent: 'center', alignItems: 'center'}}>
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
                            // Alert.alert(appState.lan.apps.tip1+respond.data.version,appState.lan.apps.tip4
                            //     ,[
                            //         {text: appState.lan.myPool.title1, onPress: ()=>{this.openUrl()}},
                            //     ])
                            this.showPop('zoomOut', true, 'Pop modal',appState.lan.apps.tip1+respond.data.version,respond.data.content)

                        }else {
                            Alert.alert(appState.lan.apps.tip1+respond.data.version,respond.data.content
                                ,[
                                    {text: appState.lan.myPool.title2, onPress: () => {}},
                                    {text: appState.lan.myPool.title1, onPress: ()=>{this.openUrl()}},
                                ])
                        }
                    }else{
                        Toast.show({
                            text:appState.lan.mine.title25,
                            position: 'center',
                        })

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

    renderPage (){

        this.items=[
            appState.lan.mine.tip9,
            //appState.lan.mine.tip10,
            appState.lan.mine.tip11,
        ]
        let version = '版本  v'+ DeviceInfo.getVersion()
        return <View style={{flex:1,backgroundColor:'#111214'}}>
            <ScrollView style={{flex:1,backgroundColor:'#111214'}}>

                <View style={{paddingLeft:25,paddingRight:25}}>
                    <View style={{height:110*unitWidth+20,paddingTop:10,paddingBottom:10,width:screenW-50,justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff00'}}>
                        <Image style={{width:screenW-50,height:110*unitWidth}} source={require('../../assert/mine/my_pic_aboutus.png')}/>
                    </View>
                    {/*<ListRow topSeparator={'indent'} bottomSeparator={'none'}  title={this.renderTitle(version)} />*/}
                    <View style={{height:88,width:screenW-50,backgroundColor:'#1E1D1E',paddingLeft:10,paddingRight:10,
                        borderRadius:10,justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>{this.appVersion()}}>
                            <View style={{flexDirection:'row',width:screenW-70,height:43,alignItems:'center',justifyContent:'space-between'}}>
                                <Label style={{fontSize: 15, color: '#fff',fontFamily:FONT_M}} text={appState.lan.mine.title1} />
                                <Image style={{height:16,width:16}} source={require('../../assert/mine/ico_arrow_right.png')}/>

                            </View>

                        </TouchableOpacity>
                        <View style={{backgroundColor:'#303030',height:1,width:screenW-50}}/>
                        <TouchableOpacity onPress={()=>{this.showLan()}}>
                            <View style={{flexDirection:'row',height:43,width:screenW-70,alignItems:'center',justifyContent:'space-between'}}>
                                <Label style={{fontSize: 15, color: '#fff',fontFamily:FONT_M}} text={appState.lan.mine.title2} />
                                <Image style={{height:16,width:16}} source={require('../../assert/mine/ico_arrow_right.png')}/>

                            </View>

                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </View>
    }

}
