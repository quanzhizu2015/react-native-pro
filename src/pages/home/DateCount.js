import React,{Component} from 'react'
import {View,TouchableOpacity} from 'react-native'
import LinearGradient from "react-native-linear-gradient";
import Label from 'teaset/components/Label/Label';
import PropTypes from 'prop-types';
import moment, {months} from 'moment';
import {FONT_M} from '../../comm/Fonts';

export default class DateCount extends Component{

    static propTypes ={
        startLive:PropTypes.string,
        callBackAction:PropTypes.func,
        timeLength:PropTypes.number
    }

    static defaultProps={
        startLive:null,
        timeLength:0,
        callBackAction:()=>{}
    }
    constructor(props) {
        super(props);
        this.state={
            timeStr:'00:00:00',
            count:0
        }

    }

    componentDidMount() {

        this.countTime()

    }

    componentWillUnmount() {
        this._timer && clearInterval(this._timer)
        this._timer=null
    }

    getCountString(count){
        if(count<10){
            return '0'+count.toString()
        }else {
            return count.toString()
        }
    }

    // 计时函数
    countTime(){
        if (this.props.startLive){
            let s = (moment(this.props.startLive).valueOf())/1000
            let t = (moment(new Date()).valueOf())/1000
            this.count = Math.ceil(s-t)

            this.setState({count:this.count})
            this._timer=setInterval(()=>{

                let mins=Math.floor(this.count%3600);
                let hour = this.getCountString(Math.floor(this.count/3600))
                let min =  this.getCountString(Math.floor(mins/60))
                let sec =  this.getCountString(this.count%60)
                this.setState({
                    timeStr:hour+':'+min+':'+sec
                })
                this.count--
                this.setState({count:this.count})

            },1000);

        }
    }


    render(){
        return (this.props.startLive&&this.state.count>0)?
            <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#A9F2FF', '#E680FF']} style={{width:110,height:30,borderRadius:15,justifyContent:'center',alignItems:'center'}}>
                <Label style={{fontSize:10,color:'#fff',fontFamily:FONT_M}}>{'倒计时 '+this.state.timeStr}</Label>
            </LinearGradient>:
            (this.props.startLive&&this.state.count>-3600*24)?
                <TouchableOpacity onPress={()=>{this.props.callBackAction()}}>
                    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#A9F2FF', '#E680FF']} style={{width:110,height:30,borderRadius:15,justifyContent:'center',alignItems:'center'}}>
                        <Label style={{fontSize:10,color:'#fff',fontFamily:FONT_M}}>{'去评分'}</Label>
                    </LinearGradient>
                </TouchableOpacity>:
                <View/>

    }

}
