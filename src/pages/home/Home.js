import React, {Component} from 'react';
import {View, FlatList, StatusBar,Image} from 'react-native';
import {NavigationPage,Toast} from 'teaset';
import HomeItem from './HomeItem';
import HomeNoticeItem from './HomeNoticeItem';
import {appState, indexIndex, indexNotices, workList} from '../../comm/sdk';
import {safeAreaViewHeight, screenW, statusBarHeight} from '../../comm/Unitl';
import HomeDetail from './HomeDetail';
import NoticePage from './NoticePage';
import MnemonicCopy from '../../Mnemonic/MnemonicCopy';
import FooterComponent from './FooterComponent';

export default class Home extends NavigationPage {

    constructor(props){
      super(props);
        this.state={
            refreshing: false,
            list:[],
            current_page:1,
            last_page:1,
            read:1,
            notice:{


            }
        }

        this.item1Data = {
            dataType:0,
            list:[
                {
                    url:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1208437838,4074727506&fm=26&gp=0.jpg',
                    userUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586248924497&di=1cae9c6311d882a1b96f92ea8b78116b&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180623%2F0882133ed5d448fdade6b1e02bd945d3.jpeg',
                    userName:'陈晓',
                    title:'四月美好的季节',
                    isVideo:0
                },
                {
                    url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586249002354&di=19aa124dbc9b864b638313311719d58f&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160518%2F1b67c28406bf446a8144754c4f09f243_th.jpg',
                    userUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586249032378&di=b265dd5ef48bf32f039d955e480b8848&imgtype=0&src=http%3A%2F%2Fpic.plures.net%2F05aa%2Fqm2n%2F7546171d5c07218e03dd078bacf173f1.jpg',
                    userName:'黑马不黑',
                    title:'喜欢这种拍摄',
                    isVideo:0
                },
                {
                    url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586249183222&di=9858b6fe514995858abb4032349fa588&imgtype=0&src=http%3A%2F%2Fp8.qhimg.com%2Ft0171e28fede227357f.jpg%3Fsize%3D2311x3082',
                    userUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586249076746&di=42269fa71d4ad3cce78110c5ae91efbd&imgtype=0&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2F4fdfd5b2de5302d416c5571601e3176a.jpeg%40c_1%2Cw_2875%2Ch_2009%2Cx_0%2Cy_0',
                    userName:'白马白',
                    title:'终于出门透气了',
                    isVideo:0
                },


            ]
        }


        this.productData=[
            this.item1Data,
            {
                url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586258711482&di=f65534e4145722f99b1c620e897fa5d0&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn00%2F0%2Fw1440h960%2F20180317%2F037b-fyshfuq5165863.jpg',
                userUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3110641331,3206684137&fm=26&gp=0.jpg',
                userName:'黑马不黑',
                title:'喜欢这种拍摄，色彩很不错',
                star:96,
                collage:46,
                userId:4,
                isVideo:0
            },
            {
                url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586248325446&di=f512d5cf712c71ce9e08a8c80f8d562d&imgtype=0&src=http%3A%2F%2Fp1.ssl.cdn.btime.com%2Ft01f0355aa29a44eb58.jpg%3Fsize%3D895x564%3Fsize%3D895x564',
                userUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586250674482&di=179e4343803a29498d981aff14128fed&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn12%2F779%2Fw2048h2731%2F20180617%2F0eac-hcyszsa8391105.jpg',
                userName:'陈晓',
                title:'天气很好，太阳出来了，可以出山',
                star:96,
                collage:46,
                isVideo:0
            },
            {
                url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586248367107&di=a8ed3d80ac85305059f402749ba5ca51&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn20111%2F733%2Fw1400h933%2F20190211%2Fa9af-hswimzx9220159.jpg',
                userUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586250728306&di=c970a165f8e976bf494864aac88675b9&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fpic%2F1%2Ffd%2F645d1215651.jpg',
                userName:'陈晓',
                title:'四月美好的季节',
                star:96,
                collage:46,
                isVideo:0
            },

            {
                url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586248482139&di=03cd8c3675e13271086d970ccacbf1db&imgtype=0&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D1216288385%2C263230203%26fm%3D214%26gp%3D0.jpg',
                userUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586250784719&di=21e7a866267d6ad6543531a2d19bf19d&imgtype=0&src=http%3A%2F%2Fimg2.gtimg.com%2Fdbimg%2F2012%2Fpiclib%2F20120712%2F20%2F3fc6d7518f903def10b9063aa759d606.jpg',
                userName:'白马白',
                title:'遇见，离开',
                star:96,
                collage:46,
                isVideo:0
            },
            {
                url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586249571516&di=9270693a20d206f2da230d3caf24009c&imgtype=0&src=http%3A%2F%2Fol09.tgbusdata.cn%2Fv2%2Fthumb%2Fjpg%2FY2U0ZiwwLDAsNCwzLDEsLTEsMCxyazUw%2Fu%2Folpic.tgbusdata.cn%2Fuploads%2Fallimg%2F160923%2F312-160923153048.jpg',
                userUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586142378547&di=6d53ed3eca812bcec47fb1a7d0479b27&imgtype=0&src=http%3A%2F%2Fxnnews.com.cn%2Fwenyu%2Flxsj%2F201808%2FW020180814647032838651.jpg',
                userName:'白马白',
                title:'终于出门透气了',
                star:96,
                collage:46,
                isVideo:0
            },{
                url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586250878533&di=79afd2323ef9ef15cdc3cd1d627ee5bb&imgtype=0&src=http%3A%2F%2Fimg3.myhsw.cn%2F2016-11-06%2F4kqzfq65.jpg%3F750',
                userUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586250824840&di=5554d3d12092a33575b7d5ad657ea147&imgtype=0&src=http%3A%2F%2Fimage.suning.cn%2Fuimg%2Fsop%2Fcommodity%2F117797961660002771812367_x.jpg',
                userName:'黑马不黑',
                title:'喜欢这种拍摄',
                star:96,
                collage:46,
                isVideo:0
            }

        ]

    }

    componentWillUnmount() {
        super.componentWillUnmount();
    }

    loadData(current_page){


        if(this.isLoadMore){
            return
        }

        this.setState({isRefreshing:true})
        this.isLoadMore = true
        indexIndex({
            page:current_page
        }).then((respond)=>{
            this.isLoadMore = false
            if (respond.code==200){
                if (respond.data.works.current_page ==1){

                    let list  = new Array()
                    // if(respond.data.notice){
                    //     list.push({dataType:0,...respond.data.notice})
                    // }
                   list.push(...respond.data.works.data)
                    this.setState({
                        list:list,
                        read:respond.data.read,
                        current_page:respond.data.works.current_page,
                        last_page:respond.data.works.last_page,
                        isRefreshing:false,
                        notice:respond.data.notice
                    })
                }else {
                    let array = new Array(...this.state.list)
                    array.push(...respond.data.works.data)
                    this.setState({
                        list:array,
                        current_page:respond.data.works.current_page,
                        last_page:respond.data.works.last_page,
                        isRefreshing:false
                    })
                }


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
        if (appState.has_backed_up==0)
        this.navigator.push({view:<MnemonicCopy token={null}/>})
    }

    _keyExtractor = (item, index) => index.toString();

    renderItem({item, index}) {
        // if (item.dataType==0){
        //     return <HomeNoticeItem item={item} navigator={this.navigator} onPress={()=>{this.navigator.push({view:<NoticePage/>})}}/>
        // }else{
        //     return <HomeItem item={item} navigator={this.navigator} onPress={(item)=>{
        //         this.navigator.push({view:<HomeDetail item={item}/>})
        //         //this.navigator.push({view:<MnemonicCopy token={null}/>})
        //     }}/>
        //
        // }
        return <HomeItem item={item} navigator={this.navigator} onPress={(item)=>{
            this.navigator.push({view:<HomeDetail item={item}/>})
            //this.navigator.push({view:<MnemonicCopy token={null}/>})
        }}/>

    }



    render(){
       return <View style={{flex:1,backgroundColor:'#111214',paddingLeft:20,paddingRight:20}}>
           <StatusBar barStyle={'light-content'} />
           <View style={{height:statusBarHeight+safeAreaViewHeight}}/>

           <Image style={{width:screenW,height:495,position:'absolute',left:0,top:0}} source={require('../../assert/home/bg_header.png')}/>

           <FlatList
               data={this.state.list}
               extraData={this.state}
               keyExtractor={this._keyExtractor}
               ListHeaderComponent={()=>{
                   return <HomeNoticeItem item={this.state.notice} read={this.state.read} navigator={this.navigator} onPress={(read)=>{
                      this.setState({
                          read:read
                      })
                       this.navigator.push({view:<NoticePage/>})
                   }}/>

               }}
               ListFooterComponent ={()=>{
                   if(this.state.current_page <= this.state.last_page){
                       return <View style={{height:10}}/>
                   }else {
                       return <FooterComponent item={this.state.notice} navigator={this.navigator} onPress={()=>{this.navigator.push({view:<NoticePage/>})}}/>


                   }

               }}
               renderItem={(data,index)=>this.renderItem(data,index)}
               onRefresh={()=>{this.loadData(1)}}
               //onScroll={this.props.onScroll}
               numColumns={2}
               onEndReached={()=>{
                   if(this.state.current_page <= this.state.last_page)
                   this.loadData(this.state.current_page+1)
               }}
               onEndReachedThreshold={0.2}
               refreshing={this.state.refreshing}/>

        </View>
    }
}
