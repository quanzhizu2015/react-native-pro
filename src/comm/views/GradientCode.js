import React, {Component} from 'react';
import {
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import {NavigationPage} from 'teaset';
import PropTypes from 'prop-types';

import LinearGradient from 'react-native-linear-gradient';
import {appState} from '../sdk';


export default class GradientCode extends NavigationPage {


    static propTypes = {
        codeBtnText:PropTypes.string,
        bgColor:PropTypes.string,
        bgColor1:PropTypes.string,
        onPress:PropTypes.func
    };

    static defaultProps = {
        codeBtnText:appState.lan.apps.title,
        bgColor:'#FF8FB9',
        bgColor1:'#FF4179',
        onPress:()=>{}
    };

    state = {
        bg: '#b1b1b1',
        codeBtnText: this.props.codeBtnText, //获取验证码文案
        bgColor:this.props.bgColor,
        bgColor1:this.props.bgColor1,
        // fontSize: this.props.fontSize? this.props.fontSize : 10
    }

    constructor(props){
        super(props)
        this.count = 60
    }

  componentWillUnmount() {
      super.componentWillUnmount();
      this.timer && clearTimeout(this.timer);


  }


    sendMsg = async() => {

        if (!this.timer) { //锁定

            this.props.onPress()
            console.log('aaaa')
            let msg = this.count-- + "s"
            this.setState({codeBtnText: msg,bgColor:'#393A43',bgColor1:'#393A43'})

            this.timer = setInterval(() => {
                this.state.bg = '#fff'
                let msg = this.count + "s"
                if (this.count-- <= 0) {
                    this.setState({codeBtnText: appState.lan.apps.title,bgColor:this.props.bgColor,bgColor1:this.props.bgColor1})
                    this.count=60
                    clearInterval(this.timer)
                    delete this.timer

                }else{
                    this.setState({codeBtnText: msg,bgColor:'#393A43',bgColor1:'#393A43'})
                }

            }, 1000)

        }
    }


    render() {
        let fontSize = this.props.fontSize ? this.props.fontSize : 12

        return <TouchableOpacity onPress={this.sendMsg}>

            <LinearGradient start={{x: 1, y: 0}} end={{x: 1, y: 1}} colors={[this.state.bgColor, this.state.bgColor1, ]} style={{width:90,height:26,borderRadius:13,justifyContent:'center',alignItems:'center'}}>
                <Text
                    style={{color:'#FFFFFF',fontSize:fontSize,}}>
                    {this.state.codeBtnText}
                </Text>
            </LinearGradient>



        </TouchableOpacity>

    }
}
