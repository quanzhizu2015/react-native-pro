import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Button,
    View, processColor, DeviceEventEmitter,
} from 'react-native';

import moment from 'moment';

import {BarChart, CombinedChart} from 'react-native-charts-wrapper';
import {screenW} from '../../comm/Unitl';
import PropTypes from 'prop-types';
import Toast from 'teaset/components/Toast/Toast';
import {set} from 'mobx';
import {WebSocketClient} from '../../comm/webSocket/WebSocketClient';
import {isIos} from 'react-native-calendars/src/expandableCalendar/commons';


const era = moment('1970-01-01', 'YYYY-MM-DD')
const distanceToLoadMore = 10
const pageSize = 20


class Chart extends React.Component {


    constructor() {
        super();

        this.isLoading = false
        this.isfirst = 0
        this.xMin = 0
        this.xMax = 0
        this.tapIndex = 0

        this.state = {

            // chartData: {//图表数据结构
            //     dataSets:
            //         [{
            //             values: [
            //                 {y:[0.00, 0.00], marker: ["row1", "row3"]},
            //                 {y:[0.00, 0.00], marker:["row4", "row5"]},
            //                 {y:[0.00, 0.00], marker:["hello", "third"]},
            //                 {y:[0.00, 27000], marker:["row6", "row7"]},
            //                 {y:[0.00, 0.00], marker: ["row8", "row9"]},
            //                 {y:[0.00, 0.00], marker:["row10", "row11"]},
            //                 {y:[0.00, 0.00], marker: ["row12", "row13"]},
            //                 {y:[0.00, 0.00], marker:["row14", "row15"]},
            //             ],
            //             config: {
            //                 colors: [processColor('#999999'), processColor('#FF7733')],
            //                 stackLabels: ['目标', '达成']
            //             }
            //         }],
            // },

            priceXAxis: {
                drawLabels: false,
                granularity: 1,
                granularityEnabled: true,
                drawAxisLine: false,
                drawGridLines:false,
                valueFormatter: 'date',
                valueFormatterPattern: 'YYYY-MM-dd',
                since: 0,
                timeUnit: 'DAYS'
            },
            priceYAxis: {
                right:{
                    enabled:true,
                    drawGridLines:false,
                    drawAxisLine: false,
                    drawLabels: true,
                    centerAxisLabels:isIos? false:true,
                    granularity:0.00001,
                    labelCount: 5,
                    valueFormatter:'##0.0000' ,

                    labelCountForce:true,
                    granularityEnabled: true,
                    //granularity: 100,
                    //valueFormatter:'largeValue',

                    axisMinimum: 0,
                    //axisMaximum: 1000,

                    position: 'INSIDE_CHART',

                    textColor:processColor('#CCCCCC'),
                    spaceTop:20,
                    textSize:9,
                    zeroLine:{
                        enabled:false
                    },


                },
                left:{
                    enabled:false,
                    drawGridLines:false,
                    drawAxisLine: false,
                    drawLabels: false,
                    granularity: 1,
                    textColor:processColor('#CCCCCC'),
                    spaceTop:0,
                    zeroLine:{
                        enabled:false
                    }
                }
            },
            volumeXAxis: {
                drawLabels: false,
                textColor: processColor('#CCCCCC'),
                textSize:9,
                position: 'BOTTOM',
                granularityEnabled: true,
                valueFormatter: 'date',
                valueFormatterPattern: 'MM-dd',
                since: 0,
                timeUnit: 'DAYS',
                drawGridLines: false,
                drawAxisLine:true
            },
            volumeYAxis: {
                right:{
                    enabled:false,
                    drawGridLines:false,

                    position: 'INSIDE_CHART',
                    drawAxisLine: false,
                    drawLabels: false,
                    textColor:processColor('#CCCCCC'),
                    spaceTop:0,
                    zeroLine:{
                        enabled:false
                    }
                },
                left:{
                    enabled:false,
                    drawGridLines:false,
                    drawAxisLine: false,
                    drawLabels: false,
                    textColor:processColor('#CCCCCC'),
                    spaceTop:0,
                    zeroLine:{
                        enabled:false
                    }
                }

            },


            visibleRange: {x: {
                    min: 1,
                    max: 30
                },
                y: {
                    // left: {
                    //     min:0.1,
                    //     max: 30
                    // },
                    // right: {
                    //     min: 0.1,
                    //     max: 500
                    // }
                }
            },//{x: {min: 1, max: 30},y:{left:{min:0,max:0},right:{min:0,max:0}}},

            visibleRangeA: {x: {
                    min: 1,
                    max: 30
                },
                y: {
                    // left: {
                    //     min:0.1,
                    //     max: 30
                    // },
                    // right: {
                    //     min: 0.1,
                    //     max: 500
                    // }
                }
            }

        }
    }




    getIndexOfDay(day) {
        return moment(day, 'YYYY-MM-DD').diff(era, 'days')
    }



    generateNewData(from, to, data) {

       // let fromIndex = this.getIndexOfDay(from)
       // let toIndex = this.getIndexOfDay(to)
        // amount: 0
        // close: 326.056
        // high: 326.056
        // klineId: 1
        // klineName: "ETH/USDT"
        // low: 326.056
        // open: 326.056
        // resolution: 2
        // time: 1602911700000
        // volume: 0





        let x = 100
        let ydata = []
        let priceData = data.map((e) => {

            ydata.push(e.high.toString())
            ydata.push(e.low.toString())
            x++

            return{
            x: x,
            shadowH: e.high,
            shadowL: e.low,
            open: e.open,
            close: e.close,
            date: moment(e.time).format('YYYY-MM-DD HH:mm')
        }})
        let ma5Data =[] //data.map(e => ({x: this.getIndexOfDay(e.date), y: e.ma5}))
        let ma15Data =[] //data.map(e => ({x: this.getIndexOfDay(e.date), y: e.ma15}))
        let y = 100
        let largeValue = 100
        let minValue = 0

        let mid  = 0
        if (data && data.length>0){
            mid = (data[data.length-1].high)/2.0
        }
        let volumeData = data.map((e,index) => {
            y++
            if (index==0){
                largeValue =e.high
                minValue = e.low

            }else{
                if (e.high > largeValue){
                    largeValue =e.high+50
                }
                if (e.low < minValue){
                    minValue = e.low
                }
            }

            return  {x:y,y: e.volume}
        })

        let volumeDateData = data.map(e => {
            y++
            return  {y: 0}

        })


        let valueFormatter =  data.map((e) => {
            return this.tapIndex == 3?moment(e.time).format('MM-DD'): moment(e.time).format('HH:mm')
        })





        // let priceData = data.map((e) => {
        //     return{
        //         x: this.getIndexOfDay(e.date),
        //         shadowH: e.shadowH,
        //         shadowL: e.shadowL,
        //         open: e.open,
        //         close: e.close,
        //         date: e.date
        //     }})
        // let ma5Data =[] //data.map(e => ({x: this.getIndexOfDay(e.date), y: e.ma5}))
        // let ma15Data =[] //data.map(e => ({x: this.getIndexOfDay(e.date), y: e.ma15}))
        // let volumeData = data.map(e => ({x: this.getIndexOfDay(e.date), y: e.volume}))

        return {

            combinedData: {
                lineData: {
                    dataSets: [{
                        values: ma5Data,
                        label: 'ma5',
                        config: {
                            drawValues: false,
                            mode: "CUBIC_BEZIER",
                            drawCircles: false,
                            color: processColor('#FFDB79')
                        }

                    }, {
                        values: ma15Data,
                        label: 'ma15',

                        config: {
                            drawValues: false,
                            mode: "CUBIC_BEZIER",
                            drawCircles: false,
                            color: processColor('#2DB58C')
                        }
                    }],
                },
                candleData: {
                    dataSets: [{
                        values: priceData,
                        label: 'price',

                        config: {
                            barWidth: 0.2,
                            visible:true,
                            axisDependency: 'RIGHT',
                            drawValues: false,
                            highlightColor: processColor('darkgray'),
                            shadowColor: processColor('black'),
                            shadowWidth: 1,
                            shadowColorSameAsCandle: true,
                            increasingColor: processColor('#2DB58C'),
                            increasingPaintStyle: 'FILL',
                            decreasingColor: processColor('#D14B5A'),


                        }
                    }],

                }
            },
            // priceYAxis: {
            //     right:{
            //         enabled:true,
            //         drawGridLines:false,
            //         drawAxisLine: false,
            //         drawLabels: true,
            //         centerAxisLabels:isIos? false:true,
            //
            //         //labelCount: 5,
            //         //valueFormatter:['10','20','40','80','160','320','640'] ,
            //
            //         labelCountForce:true,
            //         granularityEnabled: true,
            //         granularity:1,
            //         //granularity: 100,
            //         //valueFormatter:'largeValue',
            //
            //         axisMinimum: minValue-10,
            //         axisMaximum: largeValue,
            //
            //         position: 'INSIDE_CHART',
            //
            //         textColor:processColor('#CCCCCC'),
            //
            //         textSize:9,
            //         zeroLine:{
            //             enabled:false
            //         },
            //
            //         // limitLines: [
            //         //     {
            //         //         limit: mid,
            //         //         lineColor: processColor('white'),
            //         //         valueTextColor: processColor('white'),
            //         //         labelPosition:'LEFT_TOP',
            //         //         lineDashLengths: [5, 5]
            //         //     }
            //         // ]
            //     },
            //     left:{
            //         enabled:true,
            //         drawGridLines:false,
            //         drawAxisLine: false,
            //         drawLabels: false,
            //         granularity: 1,
            //         textColor:processColor('#CCCCCC'),
            //         spaceTop:0,
            //         zeroLine:{
            //             enabled:false
            //         }
            //     }
            // },
            visibleRange: {x: {
            min: 1,
                max: 30
             },
            y: {
                left: {
                    min: minValue,
                    max: largeValue+50
                },
                right: {
                        min: minValue,
                        max: largeValue+50
                }
            }
        },

            volumeDateXAxis:{

                drawLabels: true,
                textColor: processColor('#CCCCCC'),
                textSize:9,
                position: 'BOTTOM',
                // granularityEnabled: true,
                 valueFormatter:valueFormatter,
                // valueFormatterPattern: 'YYYY-MM-dd',
                // since: 0,
                // timeUnit: 'DAYS',
                 drawGridLines: false,
                // drawAxisLine:false

            },


            volumeData: {
                dataSets: [{
                    values: volumeData,
                    label: '',
                    config: {

                        barWidth: 0.2,
                        colors:[processColor('#E74E61'),processColor('#2DB58C')],
                        drawValues: false,
                       // color:processColor('#E74E61'),
                        stackLabels:[],
                        highlightColor: processColor('orange'),
                        shadowColor: processColor('green'),
                        shadowWidth: 1,

                        shadowColorSameAsCandle: true,
                        increasingColor: processColor('#2DB58C'),
                        increasingPaintStyle: 'FILL',
                        decreasingColor: processColor('#D14B5A')


                    },

                }],


            },
            volumeDateData: {
                dataSets: [{
                    values: volumeDateData,
                    label: '',
                    config: {

                        barWidth: 0.2,
                        colors:[processColor('#E74E61'),processColor('#2DB58C')],
                        drawValues: false,
                        // color:processColor('#E74E61'),
                        stackLabels:[],
                        highlightColor: processColor('orange'),
                        shadowColor: processColor('green'),
                        shadowWidth: 1,

                        shadowColorSameAsCandle: true,
                        increasingColor: processColor('#2DB58C'),
                        increasingPaintStyle: 'FILL',
                        decreasingColor: processColor('#D14B5A')
                    },

                }],

                // chartDescription: {
                //     textColor: processColor('#2DB58C'),
                //     text: 'Hello',
                // },



            },


        }

    }

    mockLoadData(from, to) {
        return new Promise(resolve => {
            setTimeout(() => {

                let fromIndex = this.getIndexOfDay(from)
                let toIndex = this.getIndexOfDay(to)

                this.xMin = fromIndex
                this.xMax = toIndex

                console.log("load data from " + from + " to " + to)
                console.log("fromIndex " + fromIndex + " toIndex " + toIndex)
                resolve(
                    Array.from(new Array(parseInt(toIndex - fromIndex)), (val, index) => {

                        let x = fromIndex + index;

                        let y = Math.abs(100 * Math.sin(0.1 * x))

                        let date = era.clone().add(x, 'days');


                        // no data in weekend
                       // if (date.isoWeekday() < 6) {

                            if(x % 2 == 0) {
                                return {
                                    date: date.format('YYYY-MM-DD'),

                                    shadowH: y + 220,
                                    shadowL: y + 180,
                                    open: y + 190,
                                    close: y + 200,

                                    ma5: y + 170,
                                    ma15: y + 150,
                                    volume: Math.abs(100 * Math.cos(0.1 * x)) + 100
                                }
                            } else {
                                return {
                                    date: date.format('YYYY-MM-DD'),

                                    shadowH: y + 220,
                                    shadowL: y + 180,
                                    open: y + 200,
                                    close: y + 190,

                                    ma5: y + 170,
                                    ma15: y + 150,
                                    volume: Math.abs(100 * Math.cos(0.1 * x)) + 100
                                }
                            }
                        // } else {
                        //     return null
                        // }
                    }).filter(x => x))
            }, 50)
        })
    }

    componentDidMount() {


        DeviceEventEmitter.addListener('pushEmitter7', (data)=>{
            // amount: 163621.35812038
            // close: 11370.5
            // count: 14.388581
            // high: 11376.06
            // id: 1602987300
            // low: 11369.61
            // open: 11373.43
            // vol: 14.388581

            this.isfirst++
            let today = moment().format('YYYY-MM-DD')
            //console.log(data)
            if (data.data && data.data.length>0){
                let startTime =  data.data[0].time
                let endTime =  data.data[data.data.length-1].time
               // let axisMinimum = this.getIndexOfDay(moment(startTime).format('YYYY-MM-DD hh:mm')) - 0.5;
               // let axisMaximum = this.getIndexOfDay(moment(endTime).format('YYYY-MM-DD hh:mm')) + 0.5;


                this.setState({
                    ...this.generateNewData('', '', data.data),
                    zoom: {scaleX: 1, scaleY: 1, xValue: data.data.length+100 - 5, yValue: 1, axisDependency: 'RIGHT'},
                    priceXAxis: {...this.state.priceXAxis, axisMinimum: 100, axisMaximum: 100+data.data.length},
                    volumeXAxis: {...this.state.volumeXAxis, axisMinimum: 100, axisMaximum: 100+data.data.length}
                    })

            }else {

                let axisMinimum = this.getIndexOfDay('2017-01-01') - 0.5;
                let axisMaximum = this.getIndexOfDay(today) + 0.5;

                this.setState({
                    ...this.generateNewData('', '', []),
                    zoom: {scaleX: 1, scaleY: 1, xValue: this.getIndexOfDay(today) - 5, yValue: 1, axisDependency: 'RIGHT'},
                    priceXAxis: {...this.state.priceXAxis, axisMinimum: axisMinimum, axisMaximum: axisMaximum},
                    volumeXAxis: {...this.state.volumeXAxis, axisMinimum: axisMinimum, axisMaximum: axisMaximum}
                })
            }



        })


        // let today = moment().format('YYYY-MM-DD')
        // let start = moment().add(-2 * pageSize, 'days').format('YYYY-MM-DD')
        //
        // // for example, this company ipo at 2017-1-1, you can get this information from your server
        // let axisMinimum = this.getIndexOfDay('2017-01-01') - 0.5;
        // let axisMaximum = this.getIndexOfDay(today) + 0.5;
        //
        //
        // this.mockLoadData(start, today).then((data) => {
        //     this.setState({
        //         ...this.generateNewData(start, today, data),
        //         zoom: {scaleX: 1, scaleY: 1, xValue: this.getIndexOfDay(today) - 5, yValue: 0, axisDependency: 'RIGHT'},
        //         priceXAxis: {...this.state.priceXAxis, axisMinimum: axisMinimum, axisMaximum: axisMaximum},
        //         volumeXAxis: {...this.state.volumeXAxis, axisMinimum: axisMinimum, axisMaximum: axisMaximum}
        //     })
        // })

    }

    handleChange(event) {
        let nativeEvent = event.nativeEvent




        if (nativeEvent.action == 'chartTranslated') {
            let {left, right, centerX} = nativeEvent

           // this.setState({

                // priceYAxis: {
                //     right:{
                //         enabled:true,
                //         drawGridLines:false,
                //         drawAxisLine: false,
                //         drawLabels: true,
                //         centerAxisLabels:isIos? false:true,
                //
                //         //labelCount: 5,
                //         //valueFormatter:['10','20','40','80','160','320','640'] ,
                //
                //         labelCountForce:true,
                //         granularityEnabled: true,
                //         granularity:1,
                //         //granularity: 100,
                //         //valueFormatter:'largeValue',
                //
                //         axisMinimum: nativeEvent.bottom-50,
                //         axisMaximum: nativeEvent.top+50,
                //
                //         position: 'INSIDE_CHART',
                //
                //         textColor:processColor('#CCCCCC'),
                //
                //         textSize:9,
                //         zeroLine:{
                //             enabled:false
                //         },
                //
                //         // limitLines: [
                //         //     {
                //         //         limit: mid,
                //         //         lineColor: processColor('white'),
                //         //         valueTextColor: processColor('white'),
                //         //         labelPosition:'LEFT_TOP',
                //         //         lineDashLengths: [5, 5]
                //         //     }
                //         // ]
                //     },
                //     left:{
                //         enabled:true,
                //         drawGridLines:false,
                //         drawAxisLine: false,
                //         drawLabels: false,
                //         granularity: 1,
                //         textColor:processColor('#CCCCCC'),
                //         spaceTop:0,
                //         zeroLine:{
                //             enabled:false
                //         }
                //     }
                // },
                //zoom:{...this.state.zoom, scaleY:328/(nativeEvent.top-nativeEvent.bottom) ,}

           // })

            if (!this.isLoading) {

                if (this.xMin > left - distanceToLoadMore || right + distanceToLoadMore > this.xMax) {

                    this.isLoading = true

                    // Because of the implementation of MpAndroidChart, if the action of setDataAndLockIndex is triggered by user dragging,
                    // then the size of new data should be equal to original data, otherwise the calculation of position transition won't be accurate,
                    // use may find the chart suddenly blink to another position.
                    // This restriction only exists in android, in iOS, we have no such problem.

                    // let toIndex = Math.min(centerX + pageSize, moment().diff(era, 'days'));
                    // let fromIndex = toIndex - 2 * pageSize;
                    //
                    // let from = era.clone().add(fromIndex, 'days').format('YYYY-MM-DD')
                    // let to = era.clone().add(toIndex, 'days').format('YYYY-MM-DD')
                    // this.mockLoadData(from, to).then((data) => {
                    //
                    //     let newData = this.generateNewData(from, to, data);
                    //
                    //     this.refs.priceChart.setDataAndLockIndex(newData.combinedData)
                    //     this.refs.volumeChart.setDataAndLockIndex(newData.volumeData)
                    //
                    //     this.isLoading = false
                    //
                    // })
                }
            }
        }
    }

    handleSelect(event) {
        let entry = event.nativeEvent

        let data = entry.data
        if (data){
            let str = 'open:'+data.open +'\nclose:'+data.close+'\nH:'+data.shadowH+'\nL:'+data.shadowL+'\ndate:'+data.date
            Toast.show({text:str,position: 'center'})
        }



    }


    tabSelected(index){

        this.tapIndex = index


    }


    componentWillUnmount() {

        DeviceEventEmitter.removeListener('pushEmitter7')
        WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":-5,"type":7}))

    }

    render() {
        return (
            <View style={{height:368,width:screenW}}>

                <CombinedChart
                    data={this.state.combinedData}
                    xAxis={this.state.priceXAxis}
                    yAxis={this.state.priceYAxis}
                    onChange={(event) => this.handleChange(event)}
                    visibleRange={isIos?this.state.visibleRange:this.state.visibleRangeA}
                    zoom={this.state.zoom}
                    drawBarShadow={false}
                    touchEnabled = {true}
                    group="stock"
                    identifier="price"
                    syncX={true}
                    syncY={false}
                    viewPortOffsets={{left:10,right:10,top:10,bottom:10}}
                    scaleYEnabled={false}
                    autoScaleMinMaxEnabled={true}
                    //highlights={this.state.highlights}
                    dragDecelerationEnabled={false}
                    //yAxis={{left: {enabled: false}, right: {position: 'INSIDE_CHART'}}}
                    ref="priceChart"
                    doubleTapToZoomEnabled={false}  // it has to be false!!
                    chartDescription={{text: ""}}
                    legend={{enabled: false,}}
                    onSelect={this.handleSelect.bind(this)}


                    //zoom={{scaleX: 15.41, scaleY: 1, xValue:  40, yValue: 916, axisDependency: 'LEFT'}}
                    style={{height:328,width:screenW,backgroundColor:'#0D1627',padding:0}}/>


                <BarChart
                     data= {this.state.volumeData}
                     xAxis= {this.state.volumeDateXAxis}

                    yAxis={this.state.volumeYAxis}
                    onChange={(event) => this.handleChange(event)}
                    visibleRange={this.state.visibleRangeA}
                    zoom={this.state.zoom}
                     touchEnabled = {false}
                     scaleYEnabled={false}

                     chartDescription={{text: ""}}

                     group="stock"
                    identifier="volume"
                    syncX={true}
                    syncY={false}
                    legend={{enabled: false,}}
                    //zoom={{scaleX: 15.41, scaleY: 1, xValue:  40, yValue: 916, axisDependency: 'LEFT'}}
                    dragDecelerationEnabled={false}
                    //yAxis={{left: {enabled: false}, right: {position: 'INSIDE_CHART'}}}
                    ref="volumeChart"
                    doubleTapToZoomEnabled={false}  // it has to be false!!
                    style={{height:40,width:screenW,backgroundColor: '#0D1627'}}/>
                {/*<BarChart*/}
                {/*    data= {this.state.volumeDateData}*/}

                {/*    xAxis= {this.state.volumeDateXAxis}*/}

                {/*    yAxis={this.state.volumeYAxis}*/}
                {/*    onChange={(event) => this.handleChange(event)}*/}
                {/*    visibleRange={{x: {min: 1, max: 300}}}*/}
                {/*    zoom={this.state.zoom}*/}

                {/*    group="stock"*/}
                {/*    identifier="volumeDate"*/}
                {/*    syncX={true}*/}
                {/*    syncY={false}*/}
                {/*    legend={{enabled: false,}}*/}
                {/*    //zoom={{scaleX: 15.41, scaleY: 1, xValue:  40, yValue: 916, axisDependency: 'LEFT'}}*/}
                {/*    dragDecelerationEnabled={false}*/}
                {/*    //yAxis={{left: {enabled: false}, right: {position: 'INSIDE_CHART'}}}*/}
                {/*    ref="volumeDateChart"*/}
                {/*    doubleTapToZoomEnabled={false}  // it has to be false!!*/}
                {/*    style={{height:20,width:screenW,backgroundColor: '#0D1627'}}/>*/}


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    price: {
        flex: 4
    },
    volume: {
        flex: 1
    }
});

export default Chart;


