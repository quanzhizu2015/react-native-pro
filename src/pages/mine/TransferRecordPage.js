import React, {Component} from 'react';
import {NavigationPage,NavigationBar,Label} from 'teaset';
import {View,FlatList} from 'react-native';
import NavigationIconButton from '../../comm/views/NavigationIconButton';
import {FONT_R} from '../../comm/Fonts';
import {screenH, screenW} from '../../comm/Unitl';
import TransferRecordItem from './TransferRecordItem';
import Toast from 'teaset/components/Toast/Toast';
import {appState, indexIndex, transferInto, transferRecord} from '../../comm/sdk';

export default class TransferRecordPage extends NavigationPage {

    constructor(props){
        super(props);
        this.state={
            refreshing: false,
            current_page:1,
            last_page:1,
            list:[],
        }
    }


    loadData(current_page){

        if(this.isLoadMore){
            return
        }

        this.setState({isRefreshing:true})
        this.isLoadMore = true
        transferRecord({
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
                Toast.show({
                    text:respond.message,
                    position: 'center',
                })
                this.setState({isRefreshing:false})

            }

        })
    }

    componentDidMount() {
        super.componentDidMount();
        this.loadData(1)
    }

    renderNavigationBar(): * {
        return  <NavigationBar
            title={<View><Label style={{fontSize:18,color:'#fff',fontFamily:FONT_R}}>转账记录</Label></View>}
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



    _keyExtractor = (item, index) => index.toString();

    renderItem({item, index}) {

        return <TransferRecordItem item={item}/>

    }

    renderPage(){
        return <View style={{flex:1,backgroundColor:'#111214'}}>
            <FlatList
                data={this.state.list}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={(data)=>this.renderItem(data)}
                ListHeaderComponent={()=>{return <View style={{height:10}}/>}}
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
