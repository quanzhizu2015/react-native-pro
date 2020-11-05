import React,{Component} from 'react'
import {View,Image,TouchableOpacity,ScrollView} from 'react-native'
import {NavigationPage, ListRow, NavigationBar, Input, Button, Overlay} from 'teaset';
import Label from 'teaset/components/Label/Label';
import NavigationIconButton from '../../comm/views/NavigationIconButton';
import GradientCode from '../../comm/views/GradientCode';
import {screenH, screenW, unitHeight, unitWidth} from '../../comm/Unitl';
import LinearGradient from 'react-native-linear-gradient';
import {
    appState,
    changeTraPassword,
    chphone,
    miningList,
    miningLock,
    sendMsg,
    setToken,
    userCheck,
} from '../../comm/sdk';
import Toast from 'teaset/components/Toast/Toast';
import {isEmail} from '../../comm/Tool';
import {FONT_M, FONT_R} from '../../comm/Fonts';
import {SuoCangPageItem} from './SuoCangPageItem';


export default  class SuoCangPage extends NavigationPage{

    constructor(props){
        super(props)
        this.state={
            code:'',
            pwd:'',
            rePwd:'',
            enable:false,
            pay_password:'',
            countData:[],
            timeData:[],
            lockData:{},
            productItem:{
                id: 0,
                title: "",
                price: ""
            },
            typeItem:{
                id: 0,
                title: "",
                sub_title: ""
            }
        }

    }


    renderNavigationBar(): * {
        return  <NavigationBar
            title={<View><Label style={{fontSize:18,color:'#fff',fontFamily:FONT_R}}>{appState.lan.myWallet.title35}</Label></View>}
            statusBarStyle={'light-content'}
            background={<View style={{flex:1,backgroundColor:'#1E1D1E'}}/>}
            style={{paddingLeft:25,paddingRight:25}}
            leftView={<NavigationIconButton
                icon={require('../../assert/home/index_ico_arrow_left.png')}
                imageStyle={{width:20,height:20}}
                onPress={()=>{this.navigator.pop()}}
            />}
        >

        </NavigationBar>
    }


    checkPwd(){

        if(!this.state.pay_password.trim()){
            Toast.show({
                text:appState.lan.myPool.tip13,
                position: 'center',
            })

            return
        }

        miningLock({product_id:this.state.productItem.id,type_id:this.state.typeItem.id,pay_password:this.state.pay_password}).then((respond)=>{
            if (respond.code==200){
                this.navigator.popToTop()
                this.overlayPopView && this.overlayPopView.close()

            }else {
                Toast.show({
                    text:respond.message,
                    position: 'center',
                })

            }
        })



    }

    loadData(){
        miningList().then((respond)=>{
            if (respond.code==200){


               let pItem={
                        id: 0,
                        title: "",
                        price: ""
                }
                let tItem={
                    id: 0,
                        title: "",
                        sub_title: ""
                }

                if (respond.data.products && respond.data.products.length>0){
                    pItem = respond.data.products[0]
                }

                if (respond.data.types && respond.data.types.length>0){
                    tItem = respond.data.types[0]
                }

                this.setState({
                    countData:respond.data.products,
                    timeData:respond.data.types,
                    productItem:pItem,
                    typeItem:tItem
                })
            }else {
                Toast.show({
                    text:respond.message,
                    position: 'center',
                })

            }
        })

    }

    componentDidMount() {
        super.componentDidMount();
        this.loadData()
    }



    showInPop(type, modal, text) {

        let overlayView = (
            <Overlay.PopView
                style={{alignItems: 'center', justifyContent: 'center'}}
                type={type}
                modal={modal}
                ref={v => this.overlayPopView = v}
            >
                <ScrollView>
                    <View style={{backgroundColor: '#fff', width: screenW-70,
                        marginTop:150,
                        paddingLeft:15,
                        paddingRight:15,
                        paddingTop:25,
                        paddingBottom:30,
                        height: 225, borderRadius: 15,}}>

                        <View style={{alignItems:'center'}}>
                            <Label style={{color:'#333333',fontSize:20,fontFamily:FONT_M}} type='title' size='xl' text={appState.lan.fundPage.title17} />
                            {/*<UnderlineInput  changeValue={(value)=>{*/}

                            {/*    this.setState({pay_password:value})*/}
                            {/*}}/>*/}

                            <Input
                                style={{width: screenW-100,marginTop:28,fontSize:15}}
                                size='lg'

                                placeholder= {appState.lan.mnemonic.tip8}
                                onChangeText={text => this.setState({pay_password: text})}
                            />
                        </View>

                        <View style={{flexDirection: 'row',justifyContent: 'space-between',marginTop: 20}}>
                            <TouchableOpacity onPress={() => this.overlayPopView && this.overlayPopView.close()}>
                                <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#383838','#383838']} style={{paddingLeft:10,paddingRight:10,width:(screenW-115)/2,height:44,borderRadius:22,flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                                    <Label
                                        style={{color:'#FFFFFF',fontSize:13,fontFamily:FONT_M}}>
                                        {appState.lan.myPool.title2}
                                    </Label>

                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {

                                this.checkPwd()
                            }}>
                                <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#B9EEFD','#D885F8']} style={{paddingLeft:10,paddingRight:10,width:(screenW-115)/2,height:44,borderRadius:22,flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                                    <Label
                                        style={{color:'#FFFFFF',fontSize:13,fontFamily:FONT_M}}>
                                        {appState.lan.myPool.title1}
                                    </Label>


                                </LinearGradient>
                            </TouchableOpacity>

                        </View>
                        {/*{modal ? <Button title='Close' onPress={() => this.overlayPopView && this.overlayPopView.close()} /> : null}*/}
                    </View>
                </ScrollView>
            </Overlay.PopView>
        );
        Overlay.show(overlayView);
    }


    confirm(){

        this.showInPop('zoomOut', true, 'Pop modal')

    }




    renderPage(): null {
        return <View style={{flex:1,backgroundColor:'#111214'}}>
            <ScrollView style={{flex:1,backgroundColor:'#111214'}}>
               <View style={{paddingLeft:16,paddingRight:16}}>
                   <Label style={{marginTop:30,color:'#fff',fontSize:16}}>{appState.lan.myWallet.title37}</Label>
                   <SuoCangPageItem item={this.state.countData} onSelected={(index,item)=>{

                   }}/>

                   <Label style={{marginTop:15,color:'#fff',fontSize:16}}>{appState.lan.myWallet.title38}</Label>
                   <SuoCangPageItem itemHeight={50} item={this.state.timeData} buttonSstyle={{height:50,width:96}}
                                    onSelected={(index,item)=>{

                                    }}/>
                   <View style={{flexDirection:'row'}}>
                       <Image style={{width:16,height:16}} source={require('../../assert/wallet/notice1.png')}/>
                       <Label style={{fontSize:14,color:'#EEEEEE',fontFamily:FONT_M,marginLeft:6}}>{appState.lan.myWallet.title43}</Label>
                   </View>
                   <View  style={{flexDirection:'row',marginTop:8}}>
                       <Image style={{width:16,height:16}} source={require('../../assert/wallet/notice.png')}/>
                       <Label style={{fontSize:14,color:'#EEEEEE',fontFamily:FONT_M,marginLeft:6}}>{appState.lan.myWallet.title44}</Label>
                   </View>



                   <TouchableOpacity style={{marginTop:200,width:screenW-32,alignItems:'center'}} onPress={() => {
                       this.confirm()
                   }}>
                       <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#B9EEFD','#D885F8']} style={{paddingLeft:10,paddingRight:10,width:screenW-52,height:44,borderRadius:22,flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                           <Label
                               style={{color:'#FFFFFF',fontSize:13,fontFamily:FONT_M}}>
                               {appState.lan.myPool.title36}
                           </Label>


                       </LinearGradient>
                   </TouchableOpacity>

               </View>

            </ScrollView>
        </View>
    }

}
