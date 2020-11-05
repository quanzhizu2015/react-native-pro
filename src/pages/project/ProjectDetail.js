import React, {Component} from 'react';
import {NavigationPage,NavigationBar,Label} from 'teaset';
import {View,StyleSheet} from 'react-native';
import NavigationIconButton from '../../comm/views/NavigationIconButton';
import {FONT_R} from '../../comm/Fonts';
import PropTypes from 'prop-types';
import {safeAreaViewHeight, screenH, screenW, statusBarHeight} from '../../comm/Unitl';
import {ImageHost} from '../../comm/config';
import Video from 'react-native-video';
import Pdf from 'react-native-pdf';
let Spinner = require('react-native-spinkit');
export default class ProjectDetail extends NavigationPage {

    static propTypes ={
        item:PropTypes.object,
    }

    static defaultProps={
        ...NavigationPage.defaultProps,
        item:{
            title: "",
            url: "http://192.168.101.32:8008/files/TALENTER.pdf",
            img: "http://192.168.101.32:8008/files/TALENTER白皮书@2x.png",
            type:1
        },

    }

    constructor(props){
        super(props);
        this. state = {
            duration: 0.0,
            currentTime: 0.0,
            isBuffering: false,
            showSpinner:true
        };
    }

    renderNavigationBar(): * {
        return  <NavigationBar
            title={<View><Label style={{fontSize:18,color:'#fff',fontFamily:FONT_R}}>{this.props.item.title}</Label></View>}
            statusBarStyle={'light-content'}
            navigationBarInsets={true}
            background={<View style={{flex:1,backgroundColor:'#1E1D1E'}}/>}
            style={{paddingLeft:25}}
            leftView={<NavigationIconButton
                icon={require('../../assert/home/index_ico_arrow_left.png')}
                imageStyle={{width:9,height:17}}
                onPress={()=>{this.navigator.pop()}}
            />}
        >


        </NavigationBar>
    }

    onLoad(data) {
        console.log('On load fired!');
        this.setState({duration: data.duration});
    }


    onProgress(data) {
        this.setState({currentTime: data.currentTime});
    }

    onBuffer({ isBuffering }: { isBuffering: boolean }) {
        this.setState({ isBuffering });
    }

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        } else {
            return 0;
        }
    }

    renderPage(){

        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
        return <View style={{flex:1,backgroundColor:'#111214'}}>

            {
                this.props.item.type==1?
                    <Pdf
                        source={{uri:this.props.item.url,cache:true}}
                        onLoadComplete={(numberOfPages,filePath)=>{
                            console.log(`number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page,numberOfPages)=>{
                            console.log(`current page: ${page}`);
                        }}
                        onError={(error)=>{
                            console.log(error);
                        }}
                        onPressLink={(uri)=>{
                            console.log(`Link presse: ${uri}`)
                        }}
                        style={{
                            width: screenW,
                            height: screenH-statusBarHeight-safeAreaViewHeight-44,
                        }}/>:
                    <View style={{ height: screenH-statusBarHeight-safeAreaViewHeight-44,width: screenW,justifyContent: 'center',alignItems: 'center',}}>
                        <Video
                            style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor:'#ffffff00'
                            }}

                            onBuffer={()=>{this.setState({showSpinner: true})}}
                            onProgress={()=>{this.setState({showSpinner: false})}}
                            resizeMode={'contain'}

                            source={{uri:this.props.item.url}}
                            //source={{uri:'http://qiniu.qanghu.com/Image/IMG_1589870614976.mp4'}}
                            ref={ref => {
                                this.player = ref;
                            }}
                        />


                        <Spinner style={{
                            top: (screenH-100)/2,
                            left: (screenW-30)/2,
                            position:'absolute'
                        }} isVisible={this.state.showSpinner}
                                 size={30} type={'Circle'} color={'#FF4179'}/>
                    </View>
            }

        </View>
    }

}

const styles=StyleSheet.create({

    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 20,
        backgroundColor: '#cccccc',
    },
    innerProgressRemaining: {
        height: 20,
        backgroundColor: '#2C2C2C',
    },


    })
