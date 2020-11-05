
import React,{Component} from 'react'
import {View,Image} from 'react-native'
import PropTypes from 'prop-types';
import Label from 'teaset/components/Label/Label';
import moment from 'moment';
import {FONT_M, FONT_R} from '../../comm/Fonts';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
export default class CalculationItem extends Component{

    static propTypes ={
        item:PropTypes.object,
        isShowLine:PropTypes.bool,
        onPress:PropTypes.func
    }

    static defaultProps={
        item:{
            name: "邀请算力",
            value: 15000000,
        },
        isShowLine:true,
        onPress:()=>{}

    }

    constructor(props) {
        super(props)

    }



    render(){

        return <TouchableOpacity onPress={()=>{this.props.onPress()}}>
            <View style={{height:100,backgroundColor:'#1E1D1E00',paddingLeft:25,paddingRight:25}}>
                <View style={{height:99,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View>
                        <Label style={{color:'#fff',fontFamily:FONT_R,fontSize:16}}>{this.props.item.name}</Label>
                        <Label  style={{color:'#fff',fontFamily:FONT_M,fontSize:22}}>{this.props.item.value}</Label>
                    </View>
                    <Image style={{width:36,height:36}} source={require('../../assert/mine/btn_sl_arrow.png')}/>

                </View>
                {this.props.isShowLine?<View style={{height:1,backgroundColor:'#303030'}}/>:<View/>}

            </View>
        </TouchableOpacity>

    }

}
