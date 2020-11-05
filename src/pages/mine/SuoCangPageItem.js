
import React,{Component} from 'react'
import {View,Image,TouchableOpacity,ScrollView} from 'react-native'
import PropTypes from 'prop-types';
import {screenW} from '../../comm/Unitl';
import Label from 'teaset/components/Label/Label';
import {FONT_M} from '../../comm/Fonts';
import SelectButton from '../../comm/views/SelectButton';
import moment from 'moment';
import {appState} from '../../comm/sdk';


class SuoCangPageButton extends Component{
    static propTypes ={
        item:PropTypes.array,
        style:PropTypes.object,
        index:PropTypes.number,
        isSelected:PropTypes.bool,
        onSelected:PropTypes.func
    }

    static defaultProps={
        item:{
            id: 4,
            title: "",
            price: "0.00",
            sub_title: ""
        },
        style: {},
        index:0,
        isSelected:false,
        onSelected:()=>{}
    }

    render(){
        return <TouchableOpacity
            style={[{width:84,height:38,backgroundColor:this.props.isSelected?'#C9ACF9':'#383838',justifyContent:'center',alignItems:'center'},this.props.style]}
            onPress={()=>{this.props.onSelected(this.props.index,this.props.item)}}>
            <Label style={{fontFamily:FONT_M,fontSize:14,color:'#fff',textAlign:'center'}} numberOfLines={2}>{this.props.item.sub_title&& this.props.item.sub_title.trim()?this.props.item.title+'\n'+this.props.item.sub_title:this.props.item.title}</Label>
        </TouchableOpacity>
    }
}

 class SuoCangPageItem extends Component{
    static propTypes ={
        item:PropTypes.array,
        itemHeight:PropTypes.number,

        buttonSstyle:PropTypes.object,
        style:PropTypes.object,
        onSelected:PropTypes.func
    }

    static defaultProps={
        item:[],
        itemHeight:38,
        style: {},
        buttonSstyle: {},
        onSelected:()=>{}
    }

    constructor() {
        super();
        this.state={
            selectedIndex:0
        }
    }

    render(){

        return<View style={[{height:18+18+this.props.itemHeight,alignItems:'center',width:screenW-32,flexDirection:'row',justifyContent:'space-between',paddingLeft:16,paddingRight:16},this.props.style]}>
            {
                this.props.item.map((value,index)=>{

                    return <SuoCangPageButton item={value} index={index}
                                              style={this.props.buttonSstyle}
                                              onSelected={(index,item)=>{
                                                  this.setState({selectedIndex:index})
                                                  this.props.onSelected(index,item)
                                              }}
                                              isSelected={index==this.state.selectedIndex?true:false}/>


                })
            }

        </View>
    }
}


class SuoCangPageItem1 extends Component{
    static propTypes ={
        item:PropTypes.object,

    }

    static defaultProps={
        item:{
            id: 9,
            price: "0.00",
            expire: 0,
            lock_up_date: "2020-11-02 14:03:46",
            expiry_date: "2020-12-02 14:03:46"

        },
    }

    constructor() {
        super();

    }

    render(){

        let date =''
        if(this.props.item.lock_up_date){
            date = moment(this.props.item.lock_up_date).format('YYYY-MM-DD')
        }
        let endDate =''
        if(this.props.item.expiry_date){
            endDate = moment(this.props.item.expiry_date).format('YYYY-MM-DD')
        }

        return<View style={{height:100,width:screenW,backgroundColor:'#111214'}}>
            <View style={{height:99,width:screenW,paddingLeft:16,paddingRight:16,backgroundColor:'#1E1D1E',alignItems:'center',flexDirection:'row',justifyContent:'space-between',}}>
                <View style={{backgroundColor:'#1E1D1E'}}>
                    <Label style={{color:'#FFFFFF',fontFamily:FONT_M,fontSize:16}}>{appState.lan.myPool.title37+date}</Label>
                    <Label style={{color:'#EEEEEE',fontFamily:FONT_M,fontSize:14,marginTop:10}}>{appState.lan.myPool.title38+this.props.item.expire}</Label>
                    <Label style={{color:'#EEEEEE',fontFamily:FONT_M,fontSize:14}}>{appState.lan.myPool.title39+endDate}</Label>
                </View>
                <View style={{backgroundColor:'#1E1D1E'}}>
                    <Label style={{color:'#EEEEEE',fontFamily:FONT_M,fontSize:14}}>{appState.lan.myPool.title40}</Label>
                    <Label style={{color:'#2DB58C',fontFamily:FONT_M,fontSize:28}}>{this.props.item.price+'T'}</Label>
                </View>
            </View>



        </View>
    }
}


class SuoCangPageItem2 extends Component{
    static propTypes ={
        item:PropTypes.object,

    }

    static defaultProps={
        item:{
            id: 9,
            price: "0.00",
            expire: 0,
            lock_up_date: "2020-11-02 14:03:46",
            state_explain: ""

        },
    }

    constructor() {
        super();

    }

    render(){

        let date =''
        if(this.props.item.lock_up_date){
            date = moment(this.props.item.lock_up_date).format('YYYY-MM-DD')
        }


        return<View style={{height:100,width:screenW,backgroundColor:'#111214'}}>
            <View style={{height:99,width:screenW,paddingLeft:16,paddingRight:16,backgroundColor:'#1E1D1E',justifyContent:'center'}}>
                <View style={{backgroundColor:'#1E1D1E',flexDirection:'row',justifyContent:'space-between'}}>
                    <Label style={{color:'#FFFFFF',fontFamily:FONT_M,fontSize:16}}>{appState.lan.myPool.title37+date}</Label>
                    <Label style={{color:this.props.item.state_explain==appState.lan.myPool.title42?'#2DB58C':'#CB9734',fontFamily:FONT_M,fontSize:9}}>{this.props.item.state_explain}</Label>
                </View>
                <View style={{flexDirection:'row',marginTop:16,justifyContent:'space-between'}}>
                    <View style={{backgroundColor:'#1E1D1E',flexDirection:'row',alignItems:'center'}}>
                        <Label style={{color:'#EEEEEE',fontFamily:FONT_M,fontSize:14}}>{appState.lan.myPool.title40+'：'}</Label>
                        <Label style={{color:'#2DB58C',fontFamily:FONT_M,fontSize:24}}>{this.props.item.price+'T'}</Label>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Label style={{color:'#EEEEEE',fontFamily:FONT_M,fontSize:14,marginTop:10}}>{appState.lan.myPool.title38}</Label>
                        <Label style={{color:'#CB9734',fontFamily:FONT_M,fontSize:24}}>{this.props.item.expire+appState.lan.myPool.title44}</Label>

                    </View>
                </View>
            </View>



        </View>
    }
}


export {SuoCangPageItem,SuoCangPageButton,SuoCangPageItem1,SuoCangPageItem2}
