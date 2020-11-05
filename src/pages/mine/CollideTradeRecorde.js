import React, {Component} from 'react';
import {NavigationPage,NavigationBar,Label} from 'teaset';
import {FlatList, View} from 'react-native';
import NavigationIconButton from '../../comm/views/NavigationIconButton';
import {FONT_M, FONT_R} from '../../comm/Fonts';
import {screenH, screenW, statusBarHeight} from '../../comm/Unitl';
import {appState, collisionLog} from '../../comm/sdk';
import Toast from 'teaset/components/Toast/Toast';
import CollideTradeRecordeItem from './CollideTradeRecordeItem';

export default class CollideTradeRecorde extends NavigationPage {

    constructor(props){
        super(props);
        this.state={
            refreshing: false,
            current_page:1,
            last_page:1,
            list:[],
        }
    }

    renderNavigationBar(): * {
        return  <NavigationBar
            title={<View><Label style={{fontSize:18,color:'#fff',fontFamily:FONT_R}}>{appState.lan.collideTrade.title15}</Label></View>}
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

        if(this.isLoadMore){
            return
        }

        this.setState({isRefreshing:true})
        this.isLoadMore = true
        collisionLog({
            page:current_page
        }).then((respond)=>{
            this.isLoadMore = false
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
                // Toast.show({
                //     text:respond.message,
                //     position: 'center',
                // })
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

        return <CollideTradeRecordeItem item={item}/>

    }


    renderPage(){
        return <View style={{width:screenW,height:screenH-statusBarHeight-44,backgroundColor:'#111214'}}>
            <FlatList
                data={this.state.list}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={(data)=>this.renderItem(data)}

                //onScroll={this.props.onScroll}
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
