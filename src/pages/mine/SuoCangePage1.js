import React, {Component} from 'react';
import {NavigationPage,NavigationBar,Label} from 'teaset';
import {View, FlatList, TouchableOpacity} from 'react-native';
import NavigationIconButton from '../../comm/views/NavigationIconButton';
import {FONT_M, FONT_R} from '../../comm/Fonts';
import {screenH, screenW} from '../../comm/Unitl';
import TransferRecordItem from './TransferRecordItem';
import Toast from 'teaset/components/Toast/Toast';
import {appState, indexIndex, miningNotExpiredList, transferInto, transferRecord} from '../../comm/sdk';
import LinearGradient from "react-native-linear-gradient";
import {SuoCangPageItem, SuoCangPageItem1} from './SuoCangPageItem';
import SuoCangePage2 from './SuoCangPage2';
import SuoCangePage from './SuoCangPage';
export default class SuoCangePage1 extends NavigationPage {

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
        miningNotExpiredList({
            page:current_page
        }).then((respond)=>{
            this.isLoadMore = false
            if (respond.code==200){
                if (respond.data.list.current_page ==1){

                    this.setState({
                        list:respond.data.list.data,
                        current_page:respond.data.list.current_page,
                        last_page:respond.data.list.last_page,
                        isRefreshing:false
                    })
                }else {
                    let array = new Array(...this.state.list)
                    array.push(...respond.data.list.data)
                    this.setState({
                        list:array,
                        current_page:respond.data.list.current_page,
                        last_page:respond.data.list.last_page,
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
            title={<View><Label style={{fontSize:18,color:'#fff',fontFamily:FONT_R}}>{appState.lan.myWallet.title35}</Label></View>}
            statusBarStyle={'light-content'}
            navigationBarInsets={true}
            background={<View style={{flex:1,backgroundColor:'#1E1D1E'}}/>}
            style={{paddingLeft:25,paddingRight:25}}

            rightView={<NavigationIconButton
                icon={require('../../assert/wallet/suocang_record.png')}
                imageStyle={{width:20,height:20}}
                onPress={()=>{ this.navigator.push({view:<SuoCangePage2/>})}}
            />}

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

        return <SuoCangPageItem1 item={item}/>

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


            <View style={{height:56,width:screenW,alignItems:'center'}}>
                <TouchableOpacity  onPress={() => {
                    this.navigator.push({view:<SuoCangePage/>})
                }}>
                    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#B9EEFD','#D885F8']} style={{width:screenW-52,height:44,borderRadius:22,flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                        <Label
                            style={{color:'#FFFFFF',fontSize:13,fontFamily:FONT_M}}>
                            {appState.lan.myPool.title41}
                        </Label>


                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    }

}
