import React,{Component} from 'react'
import {View,Image,TouchableOpacity,ScrollView} from 'react-native'
import {NavigationPage, ListRow, NavigationBar,Input,Button,PullPicker} from 'teaset';
import Label from 'teaset/components/Label/Label';
import NavigationIconButton from '../../comm/views/NavigationIconButton';
import {screenH, screenW, unitHeight} from '../../comm/Unitl';
import LinearGradient from 'react-native-linear-gradient';
import ImageCropPicker from 'react-native-image-crop-picker';

import {appState, myFeedBack} from '../../comm/sdk';
import Toast from 'teaset/components/Toast/Toast';
//import {ImageToNiuYun} from '../../comm/QiNiu';
import {FONT_M, FONT_R} from '../../comm/Fonts';
let Spinner = require('react-native-spinkit');

export default  class CustomerServicePage extends NavigationPage{

    constructor(props){
        super(props)
        this.items = [
            '充提币问题',
            '注册问题',
            '登陆问题',
            '奖励问题',
            '使用问题',
        ];
        this.imageFiles = [];
        this.state={
            selectedIndex: 0,
            email:'',
            debe:'',
            url:'',
            urls:'',
            item:'充提币问题',
            isVisible:false,
            ImageArr:[],
            imageData: [
                {
                    image: require('../../assert/mine/my_ico_add_small.png'),
                    isAdd: true,
                    isImage:false
                },
            ],
        }
    }

    comfirmAction(){

        if(!this.state.email.trim()){
            Toast.show({
                text:appState.lan.feedback.tip,
                position: 'center',
            })
            return
        }
        if(!this.state.debe.trim()){
            Toast.show({
                text:appState.lan.mine.tip1,
                position: 'center',
            })
            return
        }

        myFeedBack('/feedback/store',{
            email:this.state.email,
            content:this.state.debe,
            images:this.imageFiles,

        }).then((respond)=>{

            if (respond.code==200){
                Toast.show({
                    text:appState.lan.feedback.tip2,
                    position: 'center',
                })
                this.navigator.pop();

            }else {
                Toast.show({
                    text:respond.message,
                    position: 'center',
                })

            }

        })
    }


    show() {
        PullPicker.show(
            '问题类别',
            this.items,
            this.state.selectedIndex,
            (item, index) => this.setState({selectedIndex: index,item:item})
        );
    }

    renderNavigationBar(): * {
        return  <NavigationBar
            title={<View><Label  style={{fontSize:18,color:'#fff',fontFamily:FONT_R}}>{appState.lan.feedback.title}</Label></View>}
            statusBarStyle={'light-content'}
            background={<View style={{flex:1,backgroundColor:'#1E1D1E'}}/>}
            leftView={<NavigationIconButton
                icon={require('../../assert/home/index_ico_arrow_left.png')}
                imageStyle={{width:20,height:20}}
                onPress={()=>{this.navigator.pop()}}
            />}
        >

        </NavigationBar>
    }

    renderTitle(title,color){
        return <Label style={{fontSize: 15, color: color,fontFamily:FONT_R}} text={title} />
    }


    async upLoadImage(value){
        this.setState({
            isVisible:true
        })
        // await  ImageToNiuYun(value).then(data=>{
        //     if (data.ok){
        //         let url = this.state.urls
        //         if(url.length>0){
        //             url = this.state.urls+'@'+data.fileUrl
        //         }else {
        //             url = data.fileUrl
        //         }
        //         this.setState({
        //             urls:url,
        //             isVisible:false
        //
        //         })
        //
        //     }else {
        //         this.setState({
        //             isVisible:false
        //         })
        //     }
        // })

    }

    renderItems(){
        return this.state.imageData.map((item,index)=>{
            if(item.isAdd){
                return <TouchableOpacity style={{marginLeft:10}} key={()=>{return 'touch'+index.toString()}} onPress={()=>{

                    ImageCropPicker.openPicker({
                        width: 300,
                        height: 400,
                        //cropping: true,
                        mediaType: 'photo',
                        maxFiles: 3,
                    }).then(async image => {


                        // let arr = this.state.ImageArr;
                        // arr.push(response.uri);
                        // this.setState({ImageArr:arr})
                        //this.upLoadImage(image)
                        let images = new Array(...this.state.imageData);
                        images.push({image:{uri:image.path},isAdd:false, isImage:true});
                        this.imageFiles.push({
                            uri: image.path,
                            type: 'image/png',
                            name:image.filename,
                            size: image.size,
                        })
                        // image.map((value,index)=>{
                        //     if (images.length<4){
                        //         images.push({image:value,isAdd:false, isImage:true});
                        //     }
                        // })
                        let realImages = new Array()
                        images.map(async (value,index)=>{
                            if (!value['isAdd']){
                                realImages.push(value)
                            }

                        })
                        if (images.length<4){
                            realImages.push({
                                image: require('../../assert/mine/my_ico_add_small.png'),
                                isAdd: true,
                            })
                        }


                        this.setState({
                            imageData:realImages
                        })


                    });

                }}>
                    <View style={{width:60,height:60,backgroundColor:'#393A43',alignItems:'center',justifyContent:'center'}}>
                        <Image style={{width:14,height:14}} source={item.image}/>
                        <Label style={{color:'#BBBBBB',fontSize:8,fontFamily:FONT_R,marginTop:4}}>{appState.lan.feedback.title1}</Label>
                    </View>

                </TouchableOpacity>
            }else{
                return  <Image style={{width:60,height:60,marginLeft:10}} source={item.image}/>
            }
        })
    }

    renderPage(): null {
        const options = {
            title: appState.lan.mine.selectImage,
            mediaType:'photo',
            cancelButtonTitle: appState.lan.mine.cancel,
            takePhotoButtonTitle: appState.lan.mine.takeAPhoto,
            chooseFromLibraryButtonTitle: appState.lan.mine.image,
            durationLimit: 10,
            allowsEditing: false,


            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        return <View style={{flex:1,backgroundColor:'#111214'}}>
            <ScrollView style={{backgroundColor:'#111214'}}>
                <View style={{paddingLeft:30,paddingTop:10,paddingBottom:8}}>
                    {this.renderTitle(appState.lan.mine.title24,'#999999')}
                </View>

                <View style={{height:44,paddingLeft:25,paddingRight:25,justifyContent:'space-between',alignItems:'center'}}>
                    <View style={{backgroundColor:'#19191E',height:44,width:screenW-50,justifyContent:'space-between',alignItems:'center'}}>
                        <Input style={{borderColor:'#ffffff00',backgroundColor:'#ffffff00',color:'#fff',fontFamily:FONT_R,fontSize:14,height:44,width:screenW-50,paddingLeft:16}}
                               placeholder={appState.lan.feedback.title2}
                               placeholderTextColor={'#666666'}
                               onChangeText={text => this.setState({email: text})}></Input>

                    </View>
                </View>

                {/*<View style={{paddingLeft:30,paddingTop:10,paddingBottom:8}}>*/}
                {/*    {this.renderTitle('问题类别','#999999')}*/}
                {/*</View>*/}

                {/*<View style={{height:44,paddingLeft:25,paddingRight:25,justifyContent:'space-between',alignItems:'center'}}>*/}

                {/*    <TouchableOpacity onPress={()=>{this.show()}}>*/}
                {/*        <View style={{backgroundColor:'#19191E',paddingLeft:15,paddingRight:15,height:44,width:screenW-50,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>*/}
                {/*            <Label style={{color:'#fff',fontSize:14}}>{this.state.item}</Label>*/}
                {/*            <Image style={{width:16,height:16}} source={require('../../assert/mine/wallet_ico_arrow_down.png')}/>*/}

                {/*        </View>*/}
                {/*    </TouchableOpacity>*/}

                {/*</View>*/}




                <View style={{paddingLeft:25,paddingRight:25}}>
                    <View style={{paddingLeft:5,paddingTop:10,paddingBottom:8}}>
                        {this.renderTitle(appState.lan.feedback.title3,'#999999')}
                    </View>
                    <Input style={{width:screenW-50,height:224,backgroundColor:'#19191E',borderColor:'#ffffff00',color:"#fff",fontSize:14,fontFamily:FONT_R}}
                           multiline={true}
                           placeholder= {appState.lan.feedback.title4}
                           placeholderTextColor={'#666666'}
                           onChangeText={text => this.setState({debe: text})}

                    ></Input>

                </View>

                <View style={{paddingLeft:25,paddingRight:25,marginTop:0}}>
                    <View style={{height:50,justifyContent:'center'}}>
                        <Label style={{color:'#999999',fontSize:14,fontFamily:FONT_M}} numberOfLines={3}>{appState.lan.feedback.title5}</Label>
                    </View>
                    <View style={{backgroundColor:'#19191E',paddingRight:10,paddingTop:10,paddingBottom:10,flexDirection:'row'}}>
                        {this.renderItems()}
                    </View>
                </View>


                <View style={{paddingLeft:25,paddingRight:25,height:50,marginTop:60,marginBottom:20}}>
                    <TouchableOpacity onPress={()=>{this.comfirmAction()}}>
                        <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={[ '#B9EEFD','#D885F8' ]} style={{width:screenW-30,height:50,borderRadius:25,justifyContent:'center',alignItems:'center'}}>
                            <Label style={{color:'#ffffff'}}>{appState.lan.feedback.title6}</Label>

                        </LinearGradient>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            <Spinner style={{
                top: (screenH-100)/2,
                left: (screenW-30)/2,
                position:'absolute'
            }} isVisible={this.state.isVisible}
                     size={30} type={'Circle'} color={'#FF4179'}/>
        </View>
    }

}
