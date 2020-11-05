import React, {Component} from 'react';
import {NavigationPage,Input,Toast} from 'teaset';
import {Image, StatusBar, View, ScrollView, Alert, ImageBackground} from 'react-native';
import {safeAreaViewHeight, screenH, screenW, statusBarHeight, unitWidth} from '../../comm/Unitl';
import Label from 'teaset/components/Label/Label';
import {FONT_M, FONT_S} from '../../comm/Fonts';
import LinearGradient from "react-native-linear-gradient";
//import FastImage from 'react-native-fast-image'
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import ScoreDetailPage from './ScoreDetailPage';
import {appState, questionsCode, scoreToken} from '../../comm/sdk';
export default class Score extends NavigationPage {

    constructor(props){
        super(props);
        this.state={
            searchText:'',
            userData:{
                Inviter: null,
                address: "",
                birth: null,
                code: "420T79fc",
                email: null,
                fans: 1,
                follow: 0,
                gmt_create: "2020-07-06 10:45:08",
                gmt_modify: "2020-07-09 14:03:31",
                id: 114,
                is_frozen: 0,
                is_hot: 1,
                is_valid: 0,
                name: "",
                phone: "17730163505",
                qr: null,
                sex: 0,
                sign: "美妆师佳绮，擅长各类妆容",
                url: null,
                works: 1
            }
        }
    }

    searchAction(){

        if(!this.state.searchText.trim()){
            Toast.show({
                text:appState.lan.score.tip1,
                position: 'center',
            })
            return
        }
        questionsCode({inviter_code:this.state.searchText})
            .then((respond)=>{

                if (respond.code==200){
                    if (respond.data){
                        this.setState({
                            userData:respond.data
                        })
                    }else {
                        Toast.show({
                            text:appState.lan.score.title1,
                            position: 'center',
                        })
                    }


                }else {
                    Toast.show({
                        text:respond.message,
                        position: 'center',
                    })
                }


            })


    }

    confirmAction(){

        scoreToken({talenter_code:appState.invitation_code,target_code:this.state.searchText})
            .then((respond)=>{
                if (respond.code==200){
                    let token = respond.data.token
                    this.navigator.push({view:<ScoreDetailPage token={token}/>})
                }else {
                    Toast.show({
                        text:respond.message,
                        position: 'center',
                    })
                }

            })

    }

    scoreAction(){

        if(!this.state.searchText.trim()){
            Toast.show({
                text:appState.lan.score.tip1,
                position: 'center',
            })
            return
        }

        questionsCode({inviter_code:this.state.searchText})
            .then((respond)=>{

                if (respond.code==200){
                    if (respond.data){
                        this.setState({
                            userData:respond.data
                        })

                        let content = '您将对'+respond.data.name+'进行评分'
                        Alert.alert('',content,
                            [
                                {text:"取消", onPress:()=>{}},
                                {text:"确定", onPress:this.confirmAction.bind(this)},
                            ]
                        );

                    }else {
                        Toast.show({
                            text:'没有查找到该主播',
                            position: 'center',
                        })
                    }

                }else {
                    Toast.show({
                        text:respond.message,
                        position: 'center',
                    })
                }


            })



    }

    render(){
        return <View style={{flex:1,backgroundColor:'#111214'}}>
            <StatusBar barStyle={'light-content'} />

            <ImageBackground style={{width:screenW,height:screenH}} resizeMode={'contain'} source={require('../../assert/mnemonic/score_bg.png')}>

                <View style={{backgroundColor:'#000000b0',alignItems:'center',justifyContent:'center',width:screenW,height:screenH}}>
                    <Label style={{color:'#DDDDDD',fontSize:18,textAlign:'center',lineHeight:25}} numberOfLines={5}>{appState.lan.score.title4}</Label>
                    <Label style={{color:'#FFFFFF',fontSize:36,textAlign:'center',lineHeight:50,fontFamily:FONT_S}} numberOfLines={5}>{appState.lan.score.title5}</Label>

                </View>
            </ImageBackground>

            {/*<Image style={{width:screenW,height:495,position:'absolute',left:0,top:0}} source={require('../../assert/home/bg_header.png')}/>*/}
            {/*<View style={{height:statusBarHeight+safeAreaViewHeight}}/>*/}
            {/*<ScrollView scrollEnabled={false}>*/}

            {/*    <View style={{height:44,alignItems:'center',justifyContent:'center'}}>*/}
            {/*        <View style={{height:30,paddingLeft:15,paddingRight:15,alignItems:'center',flexDirection:'row',backgroundColor:'#00000099',width:screenW-100,borderWidth:1,borderColor:'#E4E2E2',borderRadius:15,justifyContent:'center'}} >*/}
            {/*            <Image style={{height:13,width:13}} source={require('../../assert/project/search.png')}/>*/}
            {/*            <Input style={{flex:1,borderColor:'#ffffff00',backgroundColor:'#00000000',fontSize:10,fontFamily:FONT_M,color:"#fff"}}*/}
            {/*                   placeholder='请输入主播ID'*/}
            {/*                   placeholderTextColor={'#9E9E9E50'}*/}
            {/*                   keyboardType = 'email-address'*/}
            {/*                   onChangeText={text => this.setState({searchText: text})}*/}
            {/*                   returnKeyType ='search'*/}
            {/*                   onSubmitEditing={this.searchAction.bind(this)}*/}
            {/*            />*/}
            {/*        </View>*/}
            {/*    </View>*/}

            {/*    <View style={{alignItems:'center'}}>*/}
            {/*        <LinearGradient start={{x: 1, y: 0}} end={{x: 1, y: 1}} colors={['#FF20C9', '#9F04EF']}*/}
            {/*                        style={{width:68,height:68,justifyContent:'center',borderRadius:34,padding:2,marginTop:65}}>*/}
            {/*            <Image style={{width:64,height:64,borderRadius:30}}  source={(this.state.userData.url==null|| this.state.userData.url.length<=0)?require('../../assert/project/default_header.png'):{uri:this.state.userData.url}}/>*/}

            {/*        </LinearGradient>*/}
            {/*        <Label style={{fontFamily:FONT_M,color:'#fff',fontSize:16,marginTop:13,maxWidth:screenW-100}}>{this.state.userData.name}</Label>*/}

            {/*        <TouchableOpacity style={{marginTop:65}} onPress={()=>{this.scoreAction()}}>*/}
            {/*            <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={[ '#A9F2FF','#E680FF']} style={{width:200,height:50,borderRadius:25,justifyContent:'center',alignItems:'center'}}>*/}
            {/*                <Label style={{color:'#ffffff',fontSize:15,fontFamily:FONT_S}}>{appState.lan.score.title3}</Label>*/}


            {/*            </LinearGradient>*/}
            {/*        </TouchableOpacity>*/}
            {/*    </View>*/}
            {/*</ScrollView>*/}

        </View>
    }

}
