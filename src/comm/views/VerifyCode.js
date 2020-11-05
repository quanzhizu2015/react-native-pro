import React, {Component} from 'react';
import {
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import {NavigationPage} from 'teaset';
import PropTypes from 'prop-types';
import {appState} from '../sdk';



export default class VerifyCode extends NavigationPage {


    static propTypes = {
        ...View.propTypes,
        codeBtnText:PropTypes.string,
        bgColor:PropTypes.string,
        textColor:PropTypes.string,
        countingBgColor:PropTypes.string,
        countingTextColor:PropTypes.string,
        onPress:PropTypes.func
    };

    static defaultProps = {
        codeBtnText:appState.lan.apps.title,
        bgColor:'#CFABFF',
        textColor:'#FFFFFF',
        countingBgColor:'#b1b1b1',
        countingTextColor:'#fff',
        onPress:()=>{}
    };

    state = {
        // bg: '#d10023',
        codeBtnText: this.props.codeBtnText, //获取验证码文案
        bgColor:this.props.bgColor,
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
            let result= this.props.onPress()
            if(result){
                console.log('aaaa')
                let msg = this.count-- + "s"
                this.setState({codeBtnText: msg,bgColor:this.props.countingBgColor})
                this.timer = setInterval(() => {
                    //this.state.bg = '#fff'
                    let msg = this.count + "s"
                    if (this.count-- <= 0) {
                        this.setState({codeBtnText: appState.lan.apps.title,bgColor:this.props.bgColor})
                        this.count=60
                        clearInterval(this.timer)
                        delete this.timer

                    }else{
                        this.setState({codeBtnText: msg,bgColor:this.props.countingBgColor})
                    }
                }, 1000)
            }

        }
    }


    render() {
        let fontSize = this.props.fontSize ? this.props.fontSize : 10

        return <TouchableOpacity onPress={this.sendMsg}>

            <View style={{width:90,height:24,borderRadius:5,backgroundColor:this.state.bgColor,justifyContent:'center',alignItems:'center'}}>
                <Text
                    style={{color:this.props.textColor,fontSize:fontSize,}}>
                    {this.state.codeBtnText}
                </Text>
            </View>

        </TouchableOpacity>

    }
}
