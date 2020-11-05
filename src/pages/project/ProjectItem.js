import React, {Component} from 'react';
import {View,Image,ImageBackground} from 'react-native'
import {screenW, unitWidth} from '../../comm/Unitl';
//import FastImage from 'react-native-fast-image'
import {ImageHost} from '../../comm/config';
import PropTypes from 'prop-types';
import Label from 'teaset/components/Label/Label';
import {FONT_R} from '../../comm/Fonts';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import moment from  'moment'

import ProjectDetail from './ProjectDetail';

class ProjectItem extends Component{

    constructor(props){
        super(props)
    }

    static propTypes ={
        item:PropTypes.object,
        navigator:PropTypes.object,
    }

    static defaultProps={
        item:{
            title: "",
            url: "http://192.168.101.32:8008/files/TALENTER.pdf",
            img: "http://192.168.101.32:8008/files/TALENTER白皮书@2x.png",
            type:1
        },


    }

    render(){

        return <TouchableOpacity  onPress={()=>{
            this.props.navigator.push({view:<ProjectDetail item={this.props.item}/>})
        }}>
            <View style={{height:200,width:screenW-40}}>
                <ImageBackground style={{width:screenW-40,height:180,position:'absolute',left:0,top:0,alignItems:'center',justifyContent:'center'}}
                       resizeMode={'stretch'}

                       source={{uri:this.props.item.img}}
                >
                    {this.props.item.type==1?<View/>:
                        <Image style={{width:43,height:43}} source={require('../../assert/mine/play_large.png')}/>}
                </ImageBackground>
                <View style={{height:40,marginTop:180*unitWidth-40,backgroundColor:'#00000060',
                    paddingLeft:15,
                    justifyContent:'center'}}>
                    <Label style={{maxWidth:screenW-50-30,color:'#D8D8D8',fontSize:12,fontFamily:FONT_R}}>{this.props.item.title}</Label>
                </View>

            </View>
        </TouchableOpacity>
    }
}


class ProjectItem1 extends Component{

    constructor(props){
        super(props)
        this.state={

            paused:false,

        }
    }

    static propTypes ={
        item:PropTypes.object,
        navigator:PropTypes.object,
        onPress:PropTypes.func
    }

    static defaultProps={
        onPress:()=>{},
        item:{
            title: "",
            url: "http://192.168.101.32:8008/files/TALENTER.pdf",
            img: "http://192.168.101.32:8008/files/TALENTER白皮书@2x.png",
            type:1
        },


    }

    progressUpdated = (data) => {
        if(data.currentTime >0.07){
            // this.player.pause();
            this.setState({ paused: true })
        }
    }

    render(){


        let itemWidth = (screenW-40)/2.0
        let imageWidth = (screenW-60)/2.0

        let s = (moment(this.props.item.start_live).valueOf())/1000
        let t = (moment(new Date()).valueOf())/1000
        let count = Math.ceil(s-t)
        return <TouchableOpacity onPress={()=>{this.props.onPress(this.props.item)}}>
            <View style={{paddingLeft:5,paddingRight:5,height:184+20,width:itemWidth}}>
                {/*{this.props.item.isVideo?*/}
                {/*    <Video style={{width:imageWidth,height:184,*/}
                {/*        position:'absolute',left:0,top:0}}*/}
                {/*        //ref = {(c)=>{this.player=c}}*/}
                {/*           source={{uri:this.props.item.url.trim()}}*/}
                {/*           onProgress = {this.progressUpdated.bind(this)}*/}
                {/*        //ignoreSilentSwitch={"obey"}*/}
                {/*           volume={0}*/}
                {/*        //onLoad = {() => { this.setState({ paused: true }) }}*/}
                {/*           paused={this.state.paused}*/}
                {/*    >*/}

                {/*    </Video>*/}
                {/*    :<Image style={{width:imageWidth,height:184,position:'absolute',left:5,top:0,borderRadius:10}}*/}
                {/*            source={{uri: this.props.item.img}}*/}
                {/*    ></Image>*/}
                {/*}*/}
                <ImageBackground style={{width:imageWidth,height:184,position:'absolute',left:5,top:0,borderRadius:10,alignItems:'center',justifyContent:'center'}}
                       source={{uri: this.props.item.img}}
                >
                    {this.props.item.type==1?<View/>:
                        <Image style={{width:37,height:37}} source={require('../../assert/mine/play_large.png')}/>}
                </ImageBackground>
                <View style={{height:30,marginTop:184-30,backgroundColor:'#00000060',
                    borderBottomLeftRadius:10,borderBottomRightRadius:10,width:imageWidth,
                    justifyContent:'center',paddingLeft:10,paddingRight:10}}>
                    <Label style={{maxWidth:imageWidth,color:'#fff',fontSize:10,fontFamily:FONT_R}}>{this.props.item.title}</Label>
                </View>


            </View>
        </TouchableOpacity>
    }
}

export {ProjectItem,ProjectItem1}
