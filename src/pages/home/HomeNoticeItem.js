
import React, {Component} from 'react';
import {View,Image,ImageBackground} from 'react-native'
import {screenW, unitHeight, unitWidth} from '../../comm/Unitl';
import Label from 'teaset/components/Label/Label';
import {FONT_M} from '../../comm/Fonts';
import LinearGradient from "react-native-linear-gradient";
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import PropTypes from 'prop-types';
import NoticePage from './NoticePage';
import {appState} from '../../comm/sdk';

export default class HomeNoticeItem extends Component{

    constructor(props){
        super(props)
        this.state={
            read:this.props.read,
        }
    }

    static propTypes ={
        item:PropTypes.object,
        read:PropTypes.number,
        navigator:PropTypes.object,
        onPress:PropTypes.func
    }

    static defaultProps={
        onPress:()=>{},
        read:1,
        item:{
            "id": 10,
            "title": "",
            "content": "",
            "created_at": "2020-07-10 18:03:24",
            "updated_at": "2020-07-10 18:03:24"
        },


    }

    componentWillUnmount() {

    }

    render(){
        return <TouchableOpacity onPress={()=>{
            this.setState({
                read:1
            })
            this.props.onPress(1)
        }}>
            <View style={{width:screenW-40,height:175*unitWidth,paddingTop:20,paddingLeft:5,paddingRight:5}}>
                <ImageBackground style={{width:screenW-50,height:125*unitWidth,paddingTop:10,
                    paddingBottom:10,paddingLeft:10,paddingRight:10,justifyContent:'space-between'}}
                                 imageStyle={{resizeMode:'contain'}}

                                 source={require('../../assert/home/bg-home.png')}

                >
                    <View style={{flexDirection:'row'}}>
                        <Label style={{fontSize:30,fontFamily:FONT_M,color:'#fff'}}>{appState.lan.home.title7}</Label>
                        <Label style={{marginLeft:10,fontFamily:FONT_M,fontSize:15,color:'#fff',marginTop:15}}>NOTICE</Label>
                    </View>
                    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#FF8FB9','#FF4179']}
                                    style={{width:screenW-50-20,paddingLeft:10,paddingRight:10,height:53,borderRadius:5,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

                        <View style={{width:screenW-50-40-71}}>
                            <Label style={{maxWidth:screenW-50-40-71,fontSize:14,fontFamily:FONT_M,color:'#fff'}}>{this.props.item.title}</Label>
                            <Label style={{maxWidth:screenW-50-40-71,fontSize:9,fontFamily:FONT_M,color:'#fff'}}>{this.props.item.content}</Label>
                        </View>
                        <Image style={{width:58,height:41,marginLeft:10}} source={require('../../assert/home/home_logo.png')}/>

                    </LinearGradient>
                    {
                        this.state.read?<View/>:
                            <Image style={{width:25,height:25,position:'absolute',left:screenW-80,top:50}} source={require('../../assert/home/unreadMessage.png')}/>

                    }

                </ImageBackground>
            </View>
        </TouchableOpacity>
    }
}
