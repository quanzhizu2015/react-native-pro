import React,{Component} from 'react'
import {View,Image} from 'react-native'
import PropTypes from 'prop-types';
import Label from 'teaset/components/Label/Label';
import moment from 'moment';
import {FONT_M, FONT_R} from '../../comm/Fonts';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import {screenW} from '../../comm/Unitl';
export default class NoticeItem extends Component{

    static propTypes ={
        item:PropTypes.object,
    }

    static defaultProps={
        item:{
            id: 10,
            title: "",
            content: "",
            created_at: "2020-07-08 10:47:57",
            updated_at: "2020-07-08 10:47:57"
        },

    }

    constructor(props) {
        super(props)

    }



    render(){

        let time = moment(this.props.item.created_at).format('YYYY-MM-DD')
        return <TouchableOpacity onPress={()=>{}}>
            <View style={{width:screenW,paddingTop:25,paddingLeft:25,paddingRight:25}}>
                <View style={{padding:15,borderRadius:10,backgroundColor:'#1E1D1E'}}>
                    <Label style={{color:'#fff',fontFamily:FONT_R,fontSize:15}}>{this.props.item.title}</Label>
                    <Label  style={{color:'#999999',fontFamily:FONT_R,fontSize:13,marginTop:5}}>{time}</Label>
                    <Label  style={{color:'#fff',fontFamily:FONT_R,fontSize:13,marginTop:10}} numberOfLines={100}>{this.props.item.content}</Label>
                    <View style={{flexDirection:'row',marginTop:10,alignItems:'center'}}>
                        <Label style={{color:'#999999',fontSize:13,fontFamily:FONT_R}}>by</Label>
                        <View style={{height:18,justifyContent:'center',paddingLeft:5,paddingRight:5,
                            marginLeft:5,
                            backgroundColor:'#E9729E',borderRadius:9}}>
                            <Label style={{color:'#fff',fontSize:13,fontFamily:FONT_R}}>{'系统'}</Label>
                        </View>
                    </View>
                </View>

            </View>
        </TouchableOpacity>

    }

}
