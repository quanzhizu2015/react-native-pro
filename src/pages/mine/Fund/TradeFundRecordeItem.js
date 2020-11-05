import React,{Component} from 'react'
import {View} from 'react-native'
import PropTypes from 'prop-types';
import Label from 'teaset/components/Label/Label';
import moment from 'moment';
import {FONT_M, FONT_R} from '../../../comm/Fonts';
export default class TradeFundRecordeItem extends Component{

    static propTypes ={
        item:PropTypes.object,
    }

    static defaultProps={

        item:{
            id: 1,
            user_id: 1,
            contract_time: "2020-07-09 17:51:20",
            contract_amount: "10.00000000",
            poundage: "0.00100000",
            state: 1,
            created_at: "2020-07-09 17:51:20",
            updated_at: "2020-07-09 17:51:20"
        }

    }

    constructor(props) {
        super(props);

    }




    render(){

        let date =''
        let time = ''
        if(this.props.item.created_at){
            date = moment(this.props.item.created_at).format('YYYY-MM-DD')
            time = moment(this.props.item.created_at).format('HH:mm')
        }
        return <View style={{height:70,backgroundColor:'#1E1D1E'}}>
            <View style={{height:69,paddingLeft:25,paddingRight:25,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <View>
                    <Label style={{color:'#fff',fontFamily:FONT_R,fontSize:15}}>{date}</Label>
                    <Label  style={{color:'#999999',fontFamily:FONT_R,fontSize:12}}>{time}</Label>
                </View>
                <Label  style={{color:'#fff',fontFamily:FONT_M,fontSize:15}}>{this.props.item.contract_amount+' T'}</Label>
                <Label style={{color:'#fff',fontFamily:FONT_M,fontSize:15}}>{this.props.item.poundage}</Label>

            </View>
            <View style={{height:1,backgroundColor:'#303030'}}/>

        </View>

    }

}
