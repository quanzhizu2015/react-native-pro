import React,{Component} from 'react'
import {View,Image} from 'react-native'
import PropTypes from 'prop-types';
import Label from 'teaset/components/Label/Label';
import moment from 'moment';
import {FONT_M, FONT_R} from '../../comm/Fonts';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import {screenW} from '../../comm/Unitl';
import {appState} from '../../comm/sdk';
export default class CalculationInviteItem extends Component{

    static propTypes ={
        item:PropTypes.object,
        isShowLine:PropTypes.bool,
        onPress:PropTypes.func
    }

    static defaultProps={
        item:{
            user_id: 11,
            username: "",
            personal_computing_power: 0
        },
        isShowLine:true,
        onPress:()=>{}

    }

    constructor(props) {
        super(props)

    }



    render(){

        return <TouchableOpacity onPress={()=>{this.props.onPress()}}>
            <View style={{height:60,backgroundColor:'#1E1D1E'}}>
                <View style={{height:59,paddingLeft:25,paddingRight:25,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <Label style={{color:'#fff',fontFamily:FONT_R,fontSize:15}}>{this.props.item.username}</Label>
                    <Label  style={{color:'#fff',fontFamily:FONT_R,fontSize:15}}>{appState.lan.myPool.tip14+' '+this.props.item.personal_computing_power}</Label>
                </View>
                {this.props.isShowLine?<View style={{height:1,backgroundColor:'#303030'}}/>:<View/>}

            </View>
        </TouchableOpacity>

    }

}
