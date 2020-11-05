import React,{Component} from 'react'
import {View} from 'react-native'
import Label from 'teaset/components/Label/Label';
import {appState} from '../../comm/sdk';
import {FONT_R} from '../../comm/Fonts';
import {screenW} from '../../comm/Unitl';


export default class FooterComponent extends Component{

    constructor(props) {
        super(props);

    }


    render() {
        return<View style={{height:43,justifyContent:'center',alignItems:'center',width:screenW-40}}>
            <Label style={{color:'#CCCCCC',fontSize:12,fontFamily:FONT_R}}>{appState.lan.mine.tip13}</Label>

        </View>
    }


}
