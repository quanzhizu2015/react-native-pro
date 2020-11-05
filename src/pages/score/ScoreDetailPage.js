import React, {Component} from 'react';
import {NavigationPage,NavigationBar,Label} from 'teaset';
import {View} from 'react-native';
import NavigationIconButton from '../../comm/views/NavigationIconButton';
import {FONT_R} from '../../comm/Fonts';
import { WebView } from 'react-native-webview';
import {appState} from '../../comm/sdk';

export default class ScoreDetailPage extends NavigationPage {

    constructor(props){
        super(props);
    }

    renderNavigationBar(): * {
        return  <NavigationBar
            title={<View><Label style={{fontSize:18,color:'#fff',fontFamily:FONT_R}}>{appState.lan.score.title}</Label></View>}
            statusBarStyle={'light-content'}
            navigationBarInsets={true}
            background={<View style={{flex:1,backgroundColor:'#141517'}}/>}
            style={{paddingLeft:25}}
            leftView={<NavigationIconButton
                icon={require('../../assert/home/index_ico_arrow_left.png')}
                imageStyle={{width:9,height:17}}
                onPress={()=>{this.navigator.pop()}}
            />}
        >

        </NavigationBar>
    }

    renderPage(){
        return <View style={{flex:1,backgroundColor:'#111214'}}>
            <WebView
                ref={webview => this.webview = webview}
                source={{uri:`http://ask.talenter.cn?token=`+this.props.token}}
                onMessage={(event) => {this.navigator.pop()}}
                // onLoadEnd={() => {
                //     let message = `{"Name":"selectPhoto","url":"www.baidu.com"}`;
                //     this.webview.postMessage(message);
                //
                // }}
                style={{ flex: 1,marginTop: 0,backgroundColor:'#111214' }}
            />

        </View>
    }

}
