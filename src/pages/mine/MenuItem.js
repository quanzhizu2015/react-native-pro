import React, {Component} from 'react';
import {View,Image} from 'react-native'
import {screenW, unitWidth} from '../../comm/Unitl';
//import FastImage from 'react-native-fast-image'
import {ImageHost} from '../../comm/config';
import PropTypes from 'prop-types';
import Label from 'teaset/components/Label/Label';
import {FONT_R} from '../../comm/Fonts';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import MinePool from './MinePool';
import {DashSecondHLine} from '../../comm/views/DashSecondLine';
import RegisterPage from '../Login/RegisterPage';
export default class MenuItem extends Component{

    constructor(props){
        super(props)
    }

    static propTypes ={
        item:PropTypes.object,
        navigator:PropTypes.object,
        isShowLine:PropTypes.bool,
        onPress:PropTypes.func
    }

    static defaultProps={
        item:{
            image:require('../../assert/mine/menu2.png'),
            title:''
        },
        isShowLine:true,
        onPress:()=>{}

    }

    render(){

        let itemWidth = (screenW-50)/3.0

        return <TouchableOpacity  onPress={()=>{
            this.props.onPress()
            //this.props.navigator.push({view:<RegisterPage/>})
        }}>
            <View style={{justifyContent:'space-between',alignItems:'center'}}>
                <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',height:95,width:itemWidth,}}>
                    <Image style={{width:34,height:34}} resizeMode={'contain'} source={this.props.item.image}></Image>
                    <Label style={{color:'#fff',fontSize:13,fontFamily:FONT_R}}>{this.props.item.title}</Label>
                </View>

            </View>
        </TouchableOpacity>
    }
}
