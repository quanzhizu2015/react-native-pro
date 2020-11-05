import React,{Component} from 'react'
import {View, Image, Clipboard} from 'react-native';
import {screenW} from '../comm/Unitl';
import {Label, Toast} from 'teaset';
import PropTypes from 'prop-types';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import {appState} from '../comm/sdk';

 class MItem1 extends Component{

     static propTypes ={
         item:PropTypes.string,
         onPress:PropTypes.func
     }

     static defaultProps={
         item:'',
         onPress:()=>{}
     }

    constructor() {
        super();
    }

    render(){

        let itemWidth = (screenW-50)/3
        return <TouchableOpacity onPress={()=>{this.props.onPress(this.props.item)}}>
            <View style={{height:50,width:itemWidth,alignItems:'center',justifyContent:'center'}}>
                <View style={{paddingTop:5,paddingBottom:5,paddingLeft:10,paddingRight:10,backgroundColor:'#1E1D1E'}}>
                    <Label style={{color:'#ffffff',fontSize:15}}>{this.props.item}</Label>
                </View>
            </View>
        </TouchableOpacity>
    }
}

 class MItem2 extends Component{

     static propTypes ={
         item:PropTypes.string,
         onPress:PropTypes.func
     }

     static defaultProps={
         item:'',
         onPress:()=>{}
     }

     constructor() {
         super();
     }

     render(){

         let itemWidth = (screenW-50)/3
         return <TouchableOpacity onPress={()=>{this.props.onPress(this.props.item)}}>
             <View style={{height:50,width:itemWidth,alignItems:'center',justifyContent:'center'}}>
                 <View style={{paddingTop:5,paddingBottom:5,paddingLeft:10,paddingRight:10,backgroundColor:'#1E1D1E'}}>
                     <Label style={{color:'#ffffff',fontSize:15}}>{this.props.item}</Label>
                 </View>
             </View>
         </TouchableOpacity>
     }
}


class MItem3 extends Component{

    static propTypes ={
        item:PropTypes.object,
        onPress:PropTypes.func,
        style:PropTypes.object
    }

    static defaultProps={
        item: {
            title:'',
            content:''
        },
        style:{},
        onPress:()=>{}
    }

    _setClipboardContent = async (string) => {

        // 将文字复制到系统的粘贴板上，在系统其他的地方可以粘贴
        Clipboard.setString(string);

        // 取出所存的值， Clipboard.getString()  返回的是以一个promise对象，所以可以在then里面存到state，或者使用同步存到state中
        try {
            let content = await Clipboard.getString();
            this.setState({content});
            Toast.message(appState.lan.apps.tip,'short','bottom')
        } catch (e) {
            this.setState({content:e.message});
        }
    };

    constructor() {
        super();
    }

    render(){


        return <TouchableOpacity onPress={this._setClipboardContent.bind(this,this.props.item.content)}>
            <View style={[this.props.style,{padding:20,width:screenW-50,alignItems:'center',justifyContent:'center',backgroundColor:'#1E1D1E'}]}>
                <View style={{paddingTop:5,paddingBottom:5,width:screenW-90,flexDirection:'row',justifyContent:'space-between',backgroundColor:'#1E1D1E'}}>
                    <Label style={{color:'#ffffff',fontSize:14}}>{this.props.item.title}</Label>
                    <Image style={{width:14,height:14}} source={require('../assert/mnemonic/tip.png')}/>
                </View>
                <Label style={{color:'#999999',width:screenW-90,fontSize:12,marginTop:13}} numberOfLines={5}>{this.props.item.content}</Label>
            </View>
        </TouchableOpacity>
    }
}

export {MItem1,MItem2,MItem3}
