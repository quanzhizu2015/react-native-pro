import React,{Component} from 'react'
import {View} from 'react-native'
import {screenW} from '../../comm/Unitl';
import PropTypes from 'prop-types';
import Label from 'teaset/components/Label/Label';
import {FONT_M} from '../../comm/Fonts';


export default class MineTeamItem extends Component{


    static propTypes ={
        item:PropTypes.object,
        onPress:PropTypes.func
    }

    static defaultProps={
        item:{
            user_id: 0,
            username: "",
            mining_pool_asset: 0
        },
        onPress:()=>{}

    }
    constructor(props) {
        super(props);

    }

    render(){
        return <View style={{height:50,width:screenW,paddingLeft:15,paddingRight:15}}>

            <View style={{height:50,width:screenW-30,backgroundColor:'#2A2A2A',paddingLeft:20,paddingRight:20,
                flexDirection:'row',justifyContent:'space-between',alignItems:'center'
            }}>
                <Label style={{color:'#fff',fontSize:18,fontFamily:FONT_M}}>{this.props.item.username}</Label>
                <Label style={{color:'#E74E61',fontSize:18,fontFamily:FONT_M}}>{this.props.item.mining_pool_asset}</Label>

            </View>

        </View>
    }

}
