import React,{Component} from 'react'
import {View} from 'react-native'
import PropTypes from 'prop-types';
import Label from 'teaset/components/Label/Label';
import moment from 'moment';
import {FONT_M, FONT_R} from '../../comm/Fonts';
import {screenW} from '../../comm/Unitl';
import {appState} from '../../comm/sdk';
export default class CollideTradeRecordeItem extends Component{

    static propTypes ={
        item:PropTypes.object,
    }

    static defaultProps={

        item:{
            id: 1,
            collision_ratio: "0:0",
            collision_num_real: 0.0000000000000000,
            consume_btc_real: 0.0000000000000000,
            created_at: "2020-07-08 17:01:30"
        }

    }

    constructor(props) {
        super(props);

    }




    render(){

        let date =''
        if(this.props.item.created_at){
            date = moment(this.props.item.created_at).format('YYYY-MM-DD')
        }
        return <View style={{height:150,paddingTop:10}}>
            <View style={{height:140,paddingLeft:25,paddingRight:25,
                backgroundColor:'#1E1D1E'}}>
                <View style={{height:40,justifyContent:'center'}}>
                    <Label style={{color:'#999999',fontSize:14,fontFamily:FONT_R}}>{date}</Label>
                </View>
                <View style={{height:1,backgroundColor:'#303030',width:screenW-50}}/>
                <View style={{height:99,justifyContent:'center'}}>
                    <View style={{justifyContent:'space-between',flexDirection:'row',marginTop:8}}>
                        <Label style={{fontFamily:FONT_R,color:'#fff',fontSize:14}}>{appState.lan.collideTrade.title16}</Label>
                        <Label style={{fontFamily:FONT_R,color:'#fff',fontSize:14}}>{parseFloat(this.props.item.collision_num_real).toFixed(2)}</Label>
                    </View>
                    <View style={{justifyContent:'space-between',flexDirection:'row',marginTop:8}}>
                        <Label style={{fontFamily:FONT_R,color:'#fff',fontSize:14}}>{appState.lan.collideTrade.title17}</Label>
                        <Label style={{fontFamily:FONT_R,color:'#fff',fontSize:14}}>{this.props.item.collision_ratio}</Label>
                    </View>
                    <View style={{justifyContent:'space-between',flexDirection:'row',marginTop:8}}>
                        <Label style={{fontFamily:FONT_R,color:'#fff',fontSize:14}}>{appState.lan.collideTrade.title18}</Label>
                        <Label style={{fontFamily:FONT_R,color:'#fff',fontSize:14}}>{parseFloat(this.props.item.consume_btc_real).toFixed(2)}</Label>
                    </View>

                </View>

            </View>


        </View>

    }

}
