import React,{Component} from 'react'
import {View,ScrollView,Image,TouchableOpacity} from 'react-native'
import {screenW} from '../../comm/Unitl';
import {NavigationBar, NavigationPage,ListRow} from 'teaset';
import PropTypes from 'prop-types';
import Label from 'teaset/components/Label/Label';
import InComeDetailPage from './InComeDetailPage';
import moment from 'moment';
import {FONT_M, FONT_R} from '../../comm/Fonts';
import {appState} from '../../comm/sdk';


export  default  class InComeItem extends NavigationPage{

    static propTypes ={
        item:PropTypes.object,
        navigator:PropTypes.object

    }

    static defaultProps={
        item:{
            id: 39,
            amount: "3212.48",
            created_at: "2020-08-19 16:37:42",
            state: 1
        }

    }

    constructor(props){
        super(props)
    }



    render (){
       let time = moment(this.props.item.created_at).format('YYYY-MM-DD')
       let imComeCount = this.props.item.amount==null?0.00:this.props.item.amount
        return <View style={{height:75,width:screenW,paddingRight:25,flexDirection:'row',backgroundColor:'#1E1D1E',borderBottomWidth:1,borderColor:'#303030'}}>
            <TouchableOpacity onPress={()=>{this.props.navigator.push({view:<InComeDetailPage id={this.props.item.id}/>})}}>
                <View style={{height:74,width:screenW,justifyContent:'space-between',backgroundColor:'#1E1D1E',paddingRight:25,paddingLeft:25,alignItems:'center',flexDirection:'row'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Image style={{width:19,height:19}} source={require('../../assert/mine/wallet_ico_today.png')}/>
                        <View style={{marginLeft:15}}>
                            <Label style={{color:'#fff',fontSize:15,fontFamily:FONT_M}}>{time}</Label>
                            <Label style={{color:'#999999',fontSize:12,marginTop:5,fontFamily:FONT_R}}>{appState.lan.mine.tip8}</Label>

                        </View>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Label style={{color:'#fff',fontSize:18,fontFamily:FONT_M}}>+ {imComeCount}</Label>

                    </View>

                </View>
            </TouchableOpacity>
            <View style={{width:screenW-20,height:1,backgroundColor:'#cccccc'}}/>


        </View>
    }

}
