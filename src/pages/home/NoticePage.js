import React, {Component} from 'react';
import {NavigationPage,NavigationBar,Label} from 'teaset';
import {View,FlatList} from 'react-native';
import NavigationIconButton from '../../comm/views/NavigationIconButton';
import {FONT_R} from '../../comm/Fonts';
import {screenH, screenW} from '../../comm/Unitl';

import NoticeItem from './NoticeItem';
import {appState, indexNotices} from '../../comm/sdk';

export default class NoticePage extends NavigationPage {


    constructor(props){
        super(props);
        this.state={
            refreshing: false,
            total:null,
            current_page:1,
            last_page:1,
            list:[
                // {
                //     title: "关于VIDY充提USDT的注意事项",
                //     date: '2020-03-23T10:09:45.000+0000',
                //     content: '尊敬的YOU+全球会员：\n' +
                //         'VIDY时链地址中的USDT暂时只支持omnl链，VIDY时链地址中的USDT暂时只支持omnl链，VIDY时链地址中的USDT暂时只支持omnl链，' +
                //         'VIDY时链地址中的USDT暂时只支持omnl链，VIDY时链地址中的USDT暂时只支持omnl链，以防止地址错误造成损失以防止地址错误造成损。',
                //     auther:'系统'
                // },
                // {
                //     title: "关于VIDY充提USDT的注意事项",
                //     date: '2020-03-23T10:09:45.000+0000',
                //     content: '尊敬的YOU+全球会员：\n' +
                //         'VIDY时链地址中的USDT暂时只支持omnl链，VIDY时链地址中的USDT暂时只支持omnl链，VIDY时链地址中的USDT暂时只支持omnl链，' +
                //         'VIDY时链地址中的USDT暂时只支持omnl链，VIDY时链地址中的USDT暂时只支持omnl链，以防止地址错误造成损失以防止地址错误造成损。',
                //     auther:'系统'
                // },
                // {
                //     title: "关于VIDY充提USDT的注意事项",
                //     date: '2020-03-23T10:09:45.000+0000',
                //     content: '尊敬的YOU+全球会员：\n' +
                //         'VIDY时链地址中的USDT暂时只支持omnl链，VIDY时链地址中的USDT暂时只支持omnl链，VIDY时链地址中的USDT暂时只支持omnl链，' +
                //         'VIDY时链地址中的USDT暂时只支持omnl链，VIDY时链地址中的USDT暂时只支持omnl链，以防止地址错误造成损失以防止地址错误造成损。',
                //     auther:'系统'
                // },
            ],
        }
    }

    renderNavigationBar(): * {
        return  <NavigationBar
            title={<View><Label style={{fontSize:18,color:'#fff',fontFamily:FONT_R}}>{appState.lan.home.title7}</Label></View>}
            statusBarStyle={'light-content'}
            navigationBarInsets={true}
            background={<View style={{flex:1,backgroundColor:'#1E1D1E'}}/>}
            style={{paddingLeft:25}}
            leftView={<NavigationIconButton
                icon={require('../../assert/home/index_ico_arrow_left.png')}
                imageStyle={{width:20,height:20}}
                onPress={()=>{this.navigator.pop()}}
            />}
        >

        </NavigationBar>
    }

    loadData(current_page){
        this.setState({isRefreshing:true})
        indexNotices({
            page:current_page
        }).then((respond)=>{
            if (respond.code==200){

                if (respond.data.current_page ==1){
                    this.setState({
                        list:respond.data.data,
                        current_page:respond.data.current_page,
                        last_page:respond.data.last_page,
                        isRefreshing:false
                    })
                }else {
                    let array = new Array(...this.state.list)
                    array.push(...respond.data.data)
                    this.setState({
                        list:array,
                        current_page:respond.data.current_page,
                        last_page:respond.data.last_page,
                        isRefreshing:false
                    })
                }


            }else {
                this.setState({isRefreshing:false})

            }

        })

    }

    componentDidMount() {
        super.componentDidMount();
        this.loadData(1)
    }

    _keyExtractor = (item, index) => index.toString();

    renderItem({item, index}) {

        return <NoticeItem item={item}/>

    }

    renderPage(){
        return <View style={{flex:1,backgroundColor:'#111214'}}>
            <FlatList
                data={this.state.list}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={(data)=>this.renderItem(data)}
                ListHeaderComponent={()=>{return <View style={{height:10}}/>}}
                onRefresh={()=>{this.loadData(1)}}
                onEndReached={()=>{

                    if(this.state.current_page <= this.state.last_page)
                    this.loadData(this.state.current_page+1)

                }}
                onEndReachedThreshold={0.2}
                refreshing={this.state.refreshing}/>
        </View>
    }

}
