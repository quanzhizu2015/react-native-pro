import React,{Component} from 'react'
import {View} from 'react-native'
import PropTypes from 'prop-types';
import Label from 'teaset/components/Label/Label';
import moment from 'moment';
import {FONT_M, FONT_R} from '../../comm/Fonts';
export default class TransferRecordItem extends Component{

    static propTypes ={
        item:PropTypes.object,
    }

    static defaultProps={

        item:{
            id: 1,
            update_coin_num: "100.00000000",
            explain: "转入",
            type:2,
            created_at: "2020-07-13 10:59:57"
        }

    }

    constructor(props) {
        super(props);

    }

    getStatus(type){
        switch (type) {
            case 2:
                return '转入'
            break
            case 3:
                return '转出'
            break
            default:
                return ''
                break
        }

    }

    getStatusColor(type){
        switch (type) {
            case '转入':
                return '#EF50AB'
                break
            case '转出':
                return '#62DFB9'
                break
            default:
                return '#62DFB9'
                break
        }

    }


    render(){

       // let status = this.getStatus(this.props.item.explain)
        let color = this.getStatusColor(this.props.item.explain)

        let date =''
        let time = ''
        if(this.props.item.created_at){
            date = moment(this.props.item.created_at).format('YYYY-MM-DD')
            time = moment(this.props.item.created_at).format('HH:mm')
            // let hours = moment(this.props.item.date).hours()
            // let mins = moment(this.props.item.date).minutes()
            // time=hours+':'+mins
        }
        return <View style={{height:70,backgroundColor:'#1E1D1E'}}>
            <View style={{height:69,paddingLeft:25,paddingRight:25,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <View>
                    <Label style={{color:'#fff',fontFamily:FONT_R,fontSize:15}}>{date}</Label>
                    <Label  style={{color:'#999999',fontFamily:FONT_R,fontSize:12}}>{time}</Label>
                </View>
                <Label  style={{color:'#fff',fontFamily:FONT_M,fontSize:15}}>{this.props.item.update_coin_num+' T'}</Label>
                <Label style={{color:color,fontFamily:FONT_M,fontSize:15}}>{this.props.item.explain}</Label>

            </View>
            <View style={{height:1,backgroundColor:'#303030'}}/>

        </View>

    }

}
