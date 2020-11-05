import React,{Component} from 'react'
import {View} from 'react-native'
import PropTypes from 'prop-types';
import Label from 'teaset/components/Label/Label';
import {appState, mnemonicLogin, setToken, userCodeLogin} from '../comm/sdk';
import {Input} from 'teaset';
import {Device_No, screenW} from '../comm/Unitl';
import {FONT_R} from '../comm/Fonts';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import Toast from 'teaset/components/Toast/Toast';

export default class MLogin extends Component{

    static propTypes ={
        callBackAction:PropTypes.func,
    }

    static defaultProps={
        callBackAction:()=>{}
    }

    constructor() {
        super();
        this.state={
            mnemonic:'',
        }
    }


    login= async() =>{
        //appState.setState({login:true})


        if(!this.state.mnemonic.trim()){
            Toast.show({
                text:appState.lan.mnemonic.tip10,
                position: 'center',
            })

            return
        }


        mnemonicLogin({mnemonic:this.state.mnemonic,device_no:Device_No}).then((respond)=>{
            if (respond.code==200){

                setToken(respond.data.token,
                    respond.data.user.mobile,
                    respond.data.user.username,
                    respond.data.user.avatar,
                    respond.data.user.sex,
                    respond.data.user.birthday,
                    '',
                    respond.data.user.address,
                    respond.data.user.invitation_code,
                    //respond.data.user.qing_feng_invitation_code,
                    respond.data.user.area,
                    respond.data.user.mobile,
                    respond.data.user.is_node_user,
                    respond.data.user.has_backed_up
                );

                this.props.callBackAction()


            }else{
                Toast.show({
                    text:respond.message,
                    position: 'center',
                })

            }

        })




    }


    render(){
        return <View style={{paddingTop:23}}>
            <Label style={{fontSize:13,color:'#999999'}}>{appState.lan.mnemonic.tip}</Label>

            <Input style={{width:screenW-50,height:224,marginTop:22,backgroundColor:'#19191E',borderColor:'#ffffff00',color:"#fff",fontSize:14,fontFamily:FONT_R}}
                   multiline={true}
                   placeholderTextColor={'#666666'}
                   onChangeText={text => this.setState({mnemonic: text})}

            ></Input>


            <TouchableOpacity style={{width:screenW-50,height:50,backgroundColor:'#383838'
                ,borderRadius:25,alignItems:'center',justifyContent:'center',marginTop:80}}
                              onPress={this.login.bind(this)}
            >
                <Label style={{color:'#FFFFFF',fontSize:15}}>{appState.lan.mnemonic.title3}</Label>
            </TouchableOpacity>

        </View>
    }
}
