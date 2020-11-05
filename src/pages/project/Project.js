import React, {Component} from 'react';
import {NavigationPage, Toast} from 'teaset';
import {Image, StatusBar, View, ScrollView, FlatList} from 'react-native';
import {safeAreaViewHeight, screenW, statusBarHeight} from '../../comm/Unitl';
import Label from 'teaset/components/Label/Label';
import index from 'react-native-splash-screen';
import {ProjectItem,ProjectItem1} from './ProjectItem';
import HomeNoticeItem from '../home/HomeNoticeItem';
import NoticePage from '../home/NoticePage';
import FooterComponent from '../home/FooterComponent';
import {appState, indexIndex, projectDetailIndex} from '../../comm/sdk';
import MnemonicCopy from '../../Mnemonic/MnemonicCopy';
import HomeItem from '../home/HomeItem';
import HomeDetail from '../home/HomeDetail';
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity';
import {FONT_S} from '../../comm/Fonts';
import ProjectDetail from './ProjectDetail';

export default class Project extends NavigationPage {

    constructor(props){
        super(props);
        this.state={
            refreshing: false,
            projectData:{
                corporate_brochure: [],
                corporate_promotion_video: [],
                app_operation_video: []
            },
        }

    }

    loadData(current_page){


        if(this.isLoadMore){
            return
        }

        this.setState({isRefreshing:true})
        this.isLoadMore = true
        projectDetailIndex().then((respond)=>{
            this.isLoadMore = false
            if (respond.code==200){
                this.setState({
                    projectData:respond.data,
                    isRefreshing:false,

                })


            }else {
                this.setState({isRefreshing:false})
                Toast.show({
                    text:respond.message,
                    position: 'center',
                })

            }

        })
    }

    componentDidMount() {
        super.componentDidMount();
        this.loadData(1)
    }

    _keyExtractor = (item, index) => index.toString();

    renderItem({item, index}) {

        return <ProjectItem1 item={item} navigator={this.navigator} onPress={(item)=>{
            this.navigator.push({view:<ProjectDetail item={item}/>})

        }}/>

    }


    render(){

        let height = 50
        if (this.state.projectData.corporate_brochure != null && this.state.projectData.corporate_brochure.length>0){
            height = height+ this.state.projectData.corporate_brochure.length*200 + 50
        }
        if (this.state.projectData.corporate_promotion_video != null && this.state.projectData.corporate_promotion_video.length>0){
            height = height+ this.state.projectData.corporate_promotion_video.length*200 + 50
        }
        return <View style={{flex:1,backgroundColor:'#111214',paddingLeft:20,paddingRight:20}}>
            <StatusBar barStyle={'light-content'} />

            <Image style={{width:screenW,height:495,position:'absolute',left:0,top:0}} source={require('../../assert/home/bg_header.png')}/>
            <View style={{height:statusBarHeight+safeAreaViewHeight}}/>
            <View style={{height:44,alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>{this.navigator.pop()}}>
                    <Image style={{width:19,height:17}} source={require('../../assert/home/index_ico_arrow_left.png')}/>
                </TouchableOpacity>
                <Label style={{fontSize:18,color:'#fff'}}>TALENTER SHOW</Label>
                <View style={{width:19,}}/>
            </View>
            {/*<ScrollView>*/}
            {/*    {*/}
            {/*        this.data.map((item,index)=>{*/}
            {/*            return <ProjectItem key={'item'+index} item={item} navigator={this.navigator}/>*/}
            {/*        })*/}
            {/*    }*/}

            {/*</ScrollView>*/}

            <FlatList
                data={this.state.projectData.app_operation_video}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                ListHeaderComponent={()=>{


                    return <View style={{height:height,width:screenW}}>
                        {
                            (this.state.projectData.corporate_brochure != null && this.state.projectData.corporate_brochure.length>0)?
                                <View>
                                    <View style={{height:50,justifyContent:'center',paddingLeft:8}}>
                                        <Label style={{fontSize:17,fontFamily:FONT_S,color:'#fff'}}>{appState.lan.project.title1}</Label>
                                    </View>
                                    {this.state.projectData.corporate_brochure.map((item,index)=>{
                                        return <ProjectItem key={'item'+index} item={item} navigator={this.navigator}/>
                                    })}
                                </View>:<View/>

                        }

                        {
                            (this.state.projectData.corporate_promotion_video != null && this.state.projectData.corporate_promotion_video.length>0)?
                            <View>
                                <View style={{height:50,justifyContent:'center',paddingLeft:8}}>
                                    <Label style={{fontSize:17,fontFamily:FONT_S,color:'#fff'}}>{appState.lan.project.title2}</Label>
                                </View>
                                {this.state.projectData.corporate_promotion_video.map((item,index)=>{
                                    return <ProjectItem key={'item'+index} item={item} navigator={this.navigator}/>
                                })}
                            </View>:<View/>
                        }


                        <View style={{height:50,justifyContent:'center',paddingLeft:8}}>
                            <Label style={{fontSize:17,fontFamily:FONT_S,color:'#fff'}}>{appState.lan.project.title3}</Label>
                        </View>



                    </View>

                }}

                renderItem={(data,index)=>this.renderItem(data,index)}
                onRefresh={()=>{this.loadData(1)}}
                //onScroll={this.props.onScroll}
                numColumns={2}
                // onEndReached={()=>{
                //     if(this.state.current_page <= this.state.last_page)
                //         this.loadData(this.state.current_page+1)
                // }}
                onEndReachedThreshold={0.2}
                refreshing={this.state.refreshing}/>

        </View>
    }

}
