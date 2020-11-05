import React, {Component} from 'react';
import {NavigationPage,NavigationBar,Label} from 'teaset';
import {View,FlatList} from 'react-native';
import NavigationIconButton from '../../comm/views/NavigationIconButton';
import {FONT_R} from '../../comm/Fonts';
import {screenH, screenW, statusBarHeight} from '../../comm/Unitl';
import PropTypes from 'prop-types';
import CalculationDisItem from './CalculationDisItem';
import {
    appState,
    miningPoolIcePower,
    miningPoolQinfeng,
    promoteComputingPowerDistribution,
    transferRecord,
} from '../../comm/sdk';
import Toast from 'teaset/components/Toast/Toast';
import Theme from 'teaset/themes/Theme';

export default class CalculationDisPage extends NavigationPage {

    static propTypes ={
        type:PropTypes.number,
    }

    static defaultProps={
        ...NavigationPage.defaultProps,
        type:1

    }

    constructor(props){
        super(props);
        this.state={
            refreshing: false,
            current_page:1,
            last_page:1,
            list:[],
            effective_quantity:0,
            total:0
        }
    }


    loadData(current_page){

        if(this.isLoadMore){
            return
        }

        this.setState({isRefreshing:true})
        this.isLoadMore = true
        if(this.props.type==1) { // 冰峰算力
            promoteComputingPowerDistribution({
                page:current_page
            }).then((respond)=>{
                this.isLoadMore = false
                if (respond.code==200){
                    if (respond.data.users.current_page ==1){

                        this.setState({
                            list:respond.data.users.data,
                            current_page:respond.data.users.current_page,
                            last_page:respond.data.users.last_page,
                            isRefreshing:false,
                            effective_quantity:respond.data.effective_quantity,
                            total:respond.data.users.total
                        })
                    }else {
                        let array = new Array(...this.state.list)
                        array.push(...respond.data.users.data)
                        this.setState({
                            list:array,
                            current_page:respond.data.users.current_page,
                            last_page:respond.data.users.last_page,
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

        if(this.props.type==2) { // 青峰算力

            miningPoolQinfeng({
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

    }

    componentDidMount() {
        super.componentDidMount();
        this.loadData(1)
    }

    renderNavigationBar(): * {
        return  <NavigationBar
            title={<View><Label style={{fontSize:18,color:'#fff',fontFamily:FONT_R}}>{this.props.type==1?appState.lan.myPool.tip21+this.state.total+' '+appState.lan.myPool.tip22+this.state.effective_quantity:appState.lan.myPool.title11}</Label></View>}
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

        return <CalculationDisItem item={item}/>

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
                    if(this.state.last_page>this.state.current_page){
                        this.loadData(this.state.current_page+1)
                    }

                }}
                onEndReachedThreshold={0.2}
                refreshing={this.state.refreshing}/>
        </View>
    }

}
