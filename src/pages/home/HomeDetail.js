import React from 'react';
import {
     View,
     ScrollView,
     TouchableOpacity,
     ImageBackground,
     StatusBar,
    Clipboard,
    Image
 } from 'react-native';
 import {
     NavigationBar,
     NavigationPage,
     Carousel,
     Overlay,
     AlbumView,
 } from 'teaset';
 import Label from 'teaset/components/Label/Label';
 import NavigationIconButton from '../../comm/views/NavigationIconButton';
 import {safeAreaViewHeight, screenH, screenW, statusBarHeight} from '../../comm/Unitl';
 import PropTypes from 'prop-types';

 import {
    appState,
    scoreToken,
    workDetail,
} from '../../comm/sdk';
 import {ImageHost} from '../../comm/config';
 import Toast from 'teaset/components/Toast/Toast';
 import Video from 'react-native-video';
 import LinearGradient from 'react-native-linear-gradient';
 import moment from 'moment';
 import FastImage from 'react-native-fast-image'
 import {FONT_M, FONT_R, FONT_S} from '../../comm/Fonts';
import ScoreDetailPage from '../score/ScoreDetailPage';
import DateCount from './DateCount';

 export default class HomeDetail extends NavigationPage {
     static propTypes = {
         item: PropTypes.object,

     };

     static defaultProps = {
         ...NavigationPage.defaultProps,
         item: {
             id: 6,
             user_id: 4,
             user_name: null,
             user_url: null,
             title: '这些东西也不要乱吃##刚会斤斤计较就这样的事就是你说',
             url:
                 'image&quality=80&size=b9999_10000&sec=1584362569616&di=384c2ccc4e63b07cb69dad3619cf54e1&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201310%2F19%2F235356fyjkkugokokczyo0.jpg@image&quality=80&size=b9999_10000&sec=1584362586677&di=6f8cb7011ba099f30138d656661eeb9f&imgtype=jpg&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D2155983538%2C3860699715%26fm%3D214%26gp%3D0.jpg',
             star: 0,
             collect: null,
             type: 0,
             gmtCreate: '2020-03-17T09:28:48.000+0000',
             gmtModify: '2020-03-17T17:38:28.000+0000',
             prefix: 'https://inkych.oss-cn-hangzhou.aliyuncs.com/',
         },
     };

     constructor(props) {
         super(props);

         this.title = ''
         this.content=''
         if(this.props.item.title && this.props.item.title.length>0){
             let titles = this.props.item.title.split('##')
             this.title = titles[0]
             if(titles != null && titles.length>1){
                 this.content = titles[1]
             }
         }
         this.time = moment(this.props.item.gmtCreate).format('YYYY-MM-DD')
         this.state={
             workData:{
                 id: 139,
                 user_id: 34,
                 user_name: "冬三月",
                 user_url: "http://qiniu.qanghu.com/Image/IMG_1593584216727.jpg",
                 title: "剪刀手嘟嘟嘴##阳光明媚，带闺蜜出来耍耍",
                 url: "Image/IMG_1589855925985.jpg",
                 inviter_code:'',
                 star: 0,
                 collect: 0,
                 start_live: null,
                 is_video: 0,
                 is_valid: 0,
                 gmt_create: "2020-05-19 10:39:42",
                 gmt_modify: "2020-07-01 14:17:00",
                 user_sign:'',
                 platform_name:''
             }
         }

     }

     //异步函数 箭头函数不需要绑定this了
     _setClipboardContent = async (string) => {

         // 将文字复制到系统的粘贴板上，在系统其他的地方可以粘贴
         Clipboard.setString(string);

         // 取出所存的值， Clipboard.getString()  返回的是以一个promise对象，所以可以在then里面存到state，或者使用同步存到state中
         try {
             let content = await Clipboard.getString();
             this.setState({content});
             Toast.message('复制成功','short','bottom')
         } catch (e) {
             this.setState({content:e.message});
         }
     };

     //异步函数 箭头函数不需要绑定this了
     clipboardContent = async (string) => {

         // 将文字复制到系统的粘贴板上，在系统其他的地方可以粘贴
         Clipboard.setString(string);

         // 取出所存的值， Clipboard.getString()  返回的是以一个promise对象，所以可以在then里面存到state，或者使用同步存到state中
         try {
             let content = await Clipboard.getString();
             this.setState({content});
             Toast.message('复制成功','short','bottom')
         } catch (e) {
             this.setState({content:e.message});
         }
     };



     loadData() {
         workDetail(this.props.item.id).then(respond => {
             if (respond.code == 200) {

                 this.setState({

                     workData: respond.data,

                 });
             } else {
                 Toast.show({
                     text: respond.message,
                     position: 'center',
                 });
             }
         });
     }



     show(modal) {
         // let items = [
         //     {title: '编辑', onPress: () =>{
         //
         //             this.navigator.push({view:<WorkEditPage item={this.props.item}/>})
         //
         //         }},
         //     {title: '删除',color:'#E9445A',onPress:() =>{
         //             this.workDelAction()
         //         }},
         // ];
         // let cancelItem = {title: '取消'};
         // ActionSheet.show(items, cancelItem, {modal});
     }




     componentDidMount() {
         super.componentDidMount();

         this.loadData();
     }



     renderControl() {
         return <Carousel.Control />;
     }

     renderNavigationBar(): * {
         return (
             <NavigationBar
                 style={{paddingLeft: 15, paddingRight: 25}}
                 statusBarInsets={true}
                 statusBarStyle={'light-content'}
                 background={<View style={{flex: 1, backgroundColor: '#111214'}} />}

                 leftView={
                     <View
                         style={{
                             flexDirection: 'row',
                             justifyContent: 'center',
                             alignItems: 'center',
                         }}>
                         <NavigationIconButton
                             icon={require('../../assert/home/index_ico_arrow_left.png')}
                             imageStyle={{width:9,height:17}}
                             onPress={() => {
                                 this.navigator.pop();
                             }}
                         />
                         <TouchableOpacity onPress={() => {}}>
                             <View
                                 style={{
                                     marginLeft: 5,
                                     flexDirection: 'row',
                                     alignItems: 'center',
                                     justifyContent: 'center',
                                 }}>
                                 <LinearGradient
                                     start={{x: 1, y: 0}}
                                     end={{x: 1, y: 1}}
                                     colors={['#FF20C9', '#9F04EF']}
                                     style={{
                                         width: 30,
                                         height: 30,
                                         justifyContent: 'center',
                                         borderRadius: 22,
                                         padding: 2,
                                     }}>
                                     <Image
                                         style={{width: 26, height: 26, borderRadius: 13}}
                                         source={
                                             (this.state.workData.user_url == null || this.state.workData.user_url.length<1)
                                                 ? require('../../assert/project/default_header.png')
                                                 : {uri: this.state.workData.user_url}
                                         }
                                     />
                                 </LinearGradient>
                                 <Label
                                     style={{
                                         marginLeft: 5,
                                         fontSize: 14,
                                         fontFamily: FONT_R,
                                         color: '#fff',
                                     }}>
                                     {this.state.workData.user_name}
                                 </Label>
                             </View>
                         </TouchableOpacity>
                     </View>
                 }

             >
             </NavigationBar>
         );
     }

     renderTitle(title) {
         return <Label style={{fontSize: 12, color: '#000000'}} text={title} />;
     }

     onImagePress(index) {
         let overlayView = (
             <Overlay.PopView
                 style={{}}
                 containerStyle={{flex: 1}}
                 overlayOpacity={1}
                 type="custom"
                 customBounds={{
                     x: 0,
                     y: statusBarHeight + 44,
                     width: screenW,
                     height: 300,
                 }}
                 ref={v => (this.fullImageView = v)}>
                 <AlbumView
                     style={{width:screenW,height:700,backgroundColor:'#000000'}}
                     control={true}
                     images={this.images}
                     //thumbs={this.thumbs}
                     defaultIndex={index}
                     onPress={() => this.fullImageView && this.fullImageView.close()}
                 />
                 <StatusBar animated={false} hidden={true} />
             </Overlay.PopView>
         );
         Overlay.show(overlayView);
     }

     renderImages() {
         let urls = new Array();
         if (this.props.item.url && this.props.item.url.length > 0) {
             urls = this.props.item.url.split('@');
             this.images = new Array();
             //this.thumbs= new Array()
             return urls.map((item, index) => {
                 let imageUrl = '';
                 if (item.indexOf('http') == -1) {
                     imageUrl = ImageHost + item;
                 } else {
                     imageUrl = item;
                 }
                 this.images.push({uri: imageUrl});
                 return (
                     <TouchableOpacity
                         key={index.toString()}
                         style={{flex: 1}}
                         onPress={() => this.onImagePress(index)}>
                         <FastImage
                             style={{width: screenW-50, height: 240,borderBottomLeftRadius:10,borderBottomRightRadius:10}}
                             resizeMode="cover"
                             source={{uri: imageUrl}}
                         />
                     </TouchableOpacity>
                 );
             });
         }
     }



     renderPage() {
         return (
             <View style={{width:screenW,height:screenH, backgroundColor:'#111214'}}>
                 <ScrollView>
                    <View style={{paddingLeft:25,paddingRight:25,borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
                        {this.props.item.isVideo ? (
                            <Video
                                style={{
                                    width: screenW-50,
                                    minHeight: 240,
                                    borderBottomLeftRadius:10,borderBottomRightRadius:10
                                }}
                                source={{uri: ImageHost + this.props.item.url}}
                                ref={ref => {
                                    this.player = ref;
                                }}
                            />
                        ) : (
                            <Carousel style={{height: 240,borderBottomLeftRadius:10,borderBottomRightRadius:10}} control={this.renderControl()}>
                                {this.renderImages()}
                            </Carousel>
                        )}
                        <View style={{height:40,width:screenW-50,backgroundColor:'#00000060',position:'absolute',left:25,top:240-40,borderBottomLeftRadius:10,borderBottomRightRadius:10}}></View>
                    </View>
                     <View style={{paddingLeft:25,paddingRight:25,marginTop:20}}>
                         <Label style={{fontFamily:FONT_S,color:'#fff',fontSize:22}}>{appState.lan.home.title6}</Label>
                         <ImageBackground style={{width:screenW-50,height:140,padding:15}} resizeMode="contain"  source={require('../../assert/home/bg-home.png')}>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                <Label style={{fontSize:20,color:'#fff',fontFamily:FONT_M,maxWidth:screenW-200}}>{this.title}</Label>

                                {
                                    this.state.workData.start_live==null?<View/>: <DateCount startLive={this.state.workData.start_live} timeLength={24} callBackAction={()=>{
                                    scoreToken({talenter_code:appState.invitation_code,target_code:this.state.workData.inviter_code})
                                    .then((respond)=>{
                                    if (respond.code==200){
                                    let token = respond.data.token
                                    this.navigator.push({view:<ScoreDetailPage token={token}/>})
                                }else {
                                    Toast.show({
                                    text:respond.message,
                                    position: 'center',
                                })
                                }

                                })
                                }}/>
                                }

                            </View>
                             <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#FF8FB9', '#FF4179']} style={{width:screenW-80,height:66,borderRadius:15,padding:10,marginTop:10,justifyContent:'center',alignItems:'center'}}>
                                 <Label style={{fontFamily:FONT_R,fontSize:11,color:'#fff',width:screenW-100,height:50}} numberOfLines={100}>{this.state.workData.user_sign}</Label>
                             </LinearGradient>
                             {/*<TouchableOpacity style={{marginTop:10}} onPress={this.clipboardContent.bind(this,this.content)}>*/}
                             {/*    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#FF8FB9', '#FF4179']} style={{width:screenW-80,height:66,borderRadius:15,padding:10,marginTop:10,justifyContent:'center',alignItems:'center'}}>*/}
                             {/*        <Label style={{fontFamily:FONT_R,fontSize:11,color:'#fff',width:screenW-100,height:50}} numberOfLines={100}>{this.state.workData.user_sign}</Label>*/}
                             {/*    </LinearGradient>*/}
                             {/*</TouchableOpacity>*/}
                         </ImageBackground>
                     </View>
                     <View style={{paddingLeft:25,paddingRight:25,marginTop:20}}>
                         <ImageBackground style={{width:screenW-50,height:110,paddingLeft:15,paddingRight:15,justifyContent:'center'}} resizeMode="contain"  source={require('../../assert/home/video_bg.png')}>

                             <TouchableOpacity  onPress={this.clipboardContent.bind(this,this.content)}>
                                 <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:screenW-65}}>
                                     <View style={{flexDirection:'row',alignItems:'center',width:screenW-115-80,paddingRight:10,paddingLeft:0}}>
                                         <Label style={{fontSize:20,color:'#fff',fontFamily:FONT_M,maxWidth:150}}>{appState.lan.home.title3}</Label>
                                         <View style={{backgroundColor:'#ffffff50',marginTop:5,padding:2,marginLeft:10}}>
                                             <Label style={{fontSize:8,color:'#fff',fontFamily:FONT_M}}>{appState.lan.home.title4}</Label>
                                         </View>

                                     </View>
                                     <View style={{flexDirection:'row',maxWidth:115,marginTop:3,paddingRight:10,paddingLeft:0,justifyContent:'flex-end'}}>
                                         <Label style={{fontSize:11,color:'#fff',fontFamily:FONT_R,maxWidth:105,textAlign:'right'}}  numberOfLines={5}>{appState.lan.home.title5+this.state.workData.platform_name}</Label>
                                         {/*<Label style={{fontSize:11,color:'#fff',fontFamily:FONT_R}}>{this.state.workData.platform_name}</Label>*/}
                                     </View>
                                 </View>
                                 <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#FFFFFF40', '#D258F980']} style={{width:screenW-80,marginTop:5,height:56,borderRadius:15,padding:10,justifyContent:'center',alignItems:'center'}}>
                                     <Label style={{fontFamily:FONT_R,fontSize:11,color:'#fff',width:screenW-100,height:40}} numberOfLines={100}>{this.content}</Label>
                                 </LinearGradient>

                             </TouchableOpacity>
                         </ImageBackground>
                     </View>

                 </ScrollView>

             </View>
         );
     }
 }
