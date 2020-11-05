import React, {Component} from 'react';
import {NavigationPage,NavigationBar,Label,Theme} from 'teaset';
import {StyleSheet, View,ImageBackground} from 'react-native';
import NavigationIconButton from '../../comm/views/NavigationIconButton';
import {FONT_M, FONT_R, FONT_S} from '../../comm/Fonts';
import ListRow from 'teaset/components/ListRow/ListRow';
import {screenW} from '../../comm/Unitl';
import {appState, incomeDetails, miningPoolIndex} from '../../comm/sdk';
import Toast from 'teaset/components/Toast/Toast';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class InComeDetailPage extends NavigationPage {

    static propTypes ={
        id:PropTypes.number,

    }

    static defaultProps={
        ...NavigationPage.defaultProps,
        id:null
    }

    constructor(props){
        super(props);
        Theme.rowSeparatorColor='#303030'
        this.state={
            inComeData:{
                time: "",
                mining_rewards: 0,
                promotion_reward:0,
                fund_rewards: 0,
                score_rewards: 0,
                revolving_pool_rewards: 0,
                total_income_for_the_day: 0,
                currency: "TALENTER"
            },
            data:[
                {
                    name:appState.lan.myPool.title13,
                    value:0
                },
                {
                    name:appState.lan.myPool.title26,
                    value:0
                },
                {
                    name:appState.lan.myPool.title15,
                    value:0
                }
                // ,
                // {
                //     name:appState.lan.myPool.title16,
                //     value:0
                // }
            ]
        }
    }

    loadData(){
        incomeDetails(
            {
                id:this.props.id
            }
        ).then((respond)=>{
            if (respond.code==200){

                let data = [
                    {
                        name:appState.lan.myPool.title13,
                        value:respond.data.mining_rewards
                    },
                    {
                        name:appState.lan.myPool.title26,
                        value:respond.data.promotion_reward
                    },
                    {
                        name:appState.lan.myPool.title15,
                        value:respond.data.score_rewards
                    }
                    // ,
                    // {
                    //     name:appState.lan.myPool.title16,
                    //     value:respond.data.revolving_pool_rewards
                    // }
                ]

                this.setState({
                    inComeData:respond.data,
                    data:data
                })

            }else{
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

    renderNavigationBar(): * {
        return  <NavigationBar
            title={<View><Label style={{fontSize:18,color:'#fff',fontFamily:FONT_R}}>{appState.lan.myPool.title17t}</Label></View>}
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

    renderPage(){

        // let date =''
        //
        // if(this.props.item.created_at){
        //     date = moment(this.props.item.date).format('YYYY-MM-DD')
        // }
        return <View style={{flex:1,backgroundColor:'#111214'}}>
            <ListRow
                style={{paddingLeft:25,paddingRight:25,height:54,backgroundColor:'#ffffff00'}}
                bottomSeparator={'none'}
                title={<Label style={styles.itemText}>{appState.lan.myPool.title12}</Label>}
                detail={<Label style={styles.itemText}>{this.state.inComeData.time}</Label>} />
            {this.state.data.map((item,index)=>{
               return <ListRow
                    style={{paddingLeft:25,paddingRight:25,height:54,backgroundColor:'#1E1D1E'}}
                    bottomSeparator={'full'}
                    title={<Label style={styles.itemText}>{item.name}</Label>}
                    detail={<Label style={styles.itemText}>{item.value}</Label>} />
            })}

            <View style={{alignItems:'center',marginTop:30}}>
                <ImageBackground style={{width:screenW-50,height:74,paddingLeft:20,paddingRight:20,justifyContent:'space-between',alignItems:'center',flexDirection:'row'}} source={require('../../assert/mine/pic_earnings_bg.png')}>
                    <Label style={{fontFamily:FONT_S,fontSize:16,color:'#fff'}}>{appState.lan.myPool.title18}</Label>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Label style={{fontFamily:FONT_S,fontSize:34,color:'#fff'}}>{this.state.inComeData.total_income_for_the_day}</Label>
                        <Label style={{marginLeft:6,marginTop: 15,fontFamily:FONT_S,fontSize:14,color:'#fff'}}>{this.state.inComeData.currency}</Label>
                    </View>
                </ImageBackground>
            </View>

        </View>
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red'
    },
    title: {
        color: '#999999',
        fontFamily: FONT_R,
        fontSize: 13,
    },
    content: {
        color: '#333333',
        fontFamily: FONT_M,
        fontSize: 22,
        marginTop:5
    },
    itemText:{
        fontFamily:FONT_R,
        fontSize:14,
        color:'#fff'
    },

});
