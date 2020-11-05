import React, {Component} from 'react';
import {View,Image} from 'react-native'
import {screenW} from '../../comm/Unitl';
//import FastImage from 'react-native-fast-image'
import {ImageHost} from '../../comm/config';
import PropTypes from 'prop-types';
import Label from 'teaset/components/Label/Label';
import {FONT_M, FONT_R} from '../../comm/Fonts';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import HomeDetail from './HomeDetail';
import NoticePage from './NoticePage';
import moment from  'moment'
import LinearGradient from "react-native-linear-gradient";
import Video from 'react-native-video';
export default class HomeItem extends Component{

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
            id: 173,
            user_id: 114,
            user_name: "佳绮姐姐Alice",
            user_url: "http://qiniu.qanghu.com/Image/IMG_1594006213268.jpg",
            title: "下午两点评分##fu置这行话￥WmGu1DwBjiV￥转移至τаo宝аρρ【让我告诉你一些挑好货的技巧】；或https://m.tb.cn/h.VJbsmIr?sm=725aee 點击鏈→接，再选择瀏lan嘂..大开",
            url: "Image/IMG_1594261907815.png",
            star: 0,
            collect: 0,
            start_live: "2020-07-13 09:00:00",
            is_video: 0,
            is_valid: 0,
            gmt_create: "2020-07-09 10:32:42",
            gmt_modify: "2020-07-13 10:34:12"
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
        let url=''
        if(this.props.item.url && this.props.item.url.length>0){
            let urls = this.props.item.url.split('@')
            if (urls[0].indexOf('http')==-1){
                url = ImageHost+urls[0] //this.props.item.isVideo?ImageHost+urls[0]:getImageUrl(urls[0],(screenW-50)*2,238*2)//
            }else {
                url = urls[0]
            }

        }

        let title = ''
        if(this.props.item.title && this.props.item.title.length>0){
            let titles = this.props.item.title.split('##')
            title = titles[0]
        }

        let s = (moment(this.props.item.start_live).valueOf())/1000
        let t = (moment(new Date()).valueOf())/1000
        let count = Math.ceil(s-t)
        return <TouchableOpacity onPress={()=>{this.props.onPress(this.props.item)}}>
            <View style={{paddingLeft:5,paddingRight:5,height:240+10,width:itemWidth}}>
                {this.props.item.isVideo?
                    <Video style={{width:imageWidth,height:240,
                        position:'absolute',left:0,top:0}}
                        //ref = {(c)=>{this.player=c}}
                           source={{uri:url.trim()}}
                           onProgress = {this.progressUpdated.bind(this)}
                        //ignoreSilentSwitch={"obey"}
                           volume={0}
                        //onLoad = {() => { this.setState({ paused: true }) }}
                           paused={this.state.paused}
                    >

                    </Video>
                    :<Image style={{width:imageWidth,height:240,position:'absolute',left:5,top:0,borderRadius:10}}
                            source={{uri: url}}
                    ></Image>
                }
                <View style={{height:30,marginTop:240-30,backgroundColor:'#00000060',
                    borderBottomLeftRadius:10,borderBottomRightRadius:10,width:imageWidth,
                    justifyContent:'center',paddingLeft:10,paddingRight:10}}>
                    <Label style={{maxWidth:imageWidth,color:'#fff',fontSize:10,fontFamily:FONT_R}}>{title}</Label>
                </View>
                {this.props.item.start_live?
                    <View  style={{position:'absolute',alignItems:'center',justifyContent:'center',
                        borderColor:'#fff',borderWidth:0.5,width:60,height:15,left:imageWidth-65,
                        top:10,backgroundColor:'#2E001876'}}>
                        <Label style={{fontSize:8,color:'#fff',fontFamily:FONT_M}}>{count>0?moment(this.props.item.start_live).format('DD日HH时mm分'):(count<-(3600*24))?'已结束':'评分中'}</Label>
                    </View>:<View style={{position:'absolute'}}/>
                }

            </View>
        </TouchableOpacity>
    }
}
