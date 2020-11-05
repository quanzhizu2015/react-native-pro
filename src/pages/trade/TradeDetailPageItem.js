import React,{Component} from 'react'
import {DeviceEventEmitter, View} from 'react-native';
import Label from 'teaset/components/Label/Label';
import {appState} from '../../comm/sdk';
import {FONT_M, FONT_R, FONT_S} from '../../comm/Fonts';
import PropTypes from 'prop-types';
import moment from 'moment';
import {screenW} from '../../comm/Unitl';


class TradeDetailPageItem extends Component{

    constructor(props) {
        super(props);
        this.state = {
            hoursData:{
                highestIn24Hour: "0.00",
                id: 1,
                lowestIn24Hour: "0.00",
                symbol: "ETH/USDT",
                usdkIncrement: "0.00",
                usdkPrice: "0.00",
                volumeIn24Hour: "0.0000"
            }
        }
    }


    componentDidMount() {

        DeviceEventEmitter.addListener('pushEmitter4', (data)=>{

            this.setState({
                hoursData:data.data
            })

            //console.log(data)
        })

    }


    componentWillUnmount() {

        DeviceEventEmitter.removeListener('pushEmitter4')

    }

    render() {
      return  <View style={{height:78,backgroundColor:'#161F2F',paddingLeft:16,paddingRight:16,
          alignItems:'center',
          flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{flexDirection:'row'}}>
              <Label style={{color:'#2DB58C',fontSize:40}}>{this.state.hoursData.usdkPrice}</Label>
              <Label style={{color:'#2DB58C',fontSize:13}}>{this.state.hoursData.usdkIncrement+'%'}</Label>
          </View>
          <View>
              <View style={{flexDirection:'row',marginTop:5,minWidth:60,justifyContent:'space-between'}}>
                  <Label style={{fontSize:12,fontFamily:FONT_M,color:'#fff'}}>{appState.lan.trade.title21}</Label>
                  <Label style={{fontSize:12,fontFamily:FONT_M,color:'#fff',marginLeft:5}}>{this.state.hoursData.highestIn24Hour}</Label>
              </View>
              <View style={{flexDirection:'row',marginTop:5,minWidth:60,justifyContent:'space-between'}}>
                  <Label style={{fontSize:12,fontFamily:FONT_M,color:'#fff'}}>{appState.lan.trade.title22}</Label>
                  <Label style={{fontSize:12,fontFamily:FONT_M,color:'#fff',marginLeft:5}}>{this.state.hoursData.lowestIn24Hour}</Label>
              </View>
              <View style={{flexDirection:'row',marginTop:5,minWidth:60,justifyContent:'space-between'}}>
                  <Label style={{fontSize:12,fontFamily:FONT_M,color:'#fff'}}>{appState.lan.trade.title23}</Label>
                  <Label style={{fontSize:12,fontFamily:FONT_M,color:'#fff',marginLeft:5}}>{this.state.hoursData.usdkPrice}</Label>
              </View>
          </View>


        </View>
    }

}


class TradeDetailPageItem1 extends Component{

    static propTypes ={
        item:PropTypes.object,
    }

    static defaultProps={
        isShowTopLine:false,
        item:{
            amount: "2.0336",
            matchType: 2,
            pairName: "ETH/USDT",
            price: "326.2430",
            ts: 1603164493770
        }
    }


    constructor(props) {
        super(props);

    }

    render() {
        let itemWidth = (screenW-32)/4
        let date =''
        if(this.props.item.ts){
            date = moment(this.props.item.ts).format('HH:mm:ss')
        }
        return  <View style={{height:25,backgroundColor:'#161F2F',paddingLeft:16,paddingRight:16,
            alignItems:'center',
            flexDirection:'row',justifyContent:'space-between',width:screenW}}>
            <Label style={{color:'#fff',fontSize:12,fontFamily:FONT_S,width:itemWidth}}>{date}</Label>
            <Label style={{color:this.props.item.matchType==1?'#2DB58C':'#E74E61',fontSize:12,fontFamily:FONT_S,width:itemWidth,textAlign:'center'}}>{this.props.item.matchType==1?appState.lan.trade.title3:appState.lan.trade.title4}</Label>
            <Label style={{color:'#fff',fontSize:12,fontFamily:FONT_S,width:itemWidth,textAlign:'center'}}>{this.props.item.price}</Label>
            <Label style={{color:'#fff',fontSize:12,fontFamily:FONT_S,width:itemWidth,textAlign:'right'}}>{this.props.item.amount}</Label>

        </View>
    }

}


export {TradeDetailPageItem,TradeDetailPageItem1}
