import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    processColor, DeviceEventEmitter,
} from 'react-native';
import update from 'immutability-helper';

import _ from 'lodash';
import {LineChart} from 'react-native-charts-wrapper';
import {screenW} from '../../comm/Unitl';
import moment from 'moment';
import {WebSocketClient} from '../../comm/webSocket/WebSocketClient';
const era = moment('1970-01-01', 'YYYY-MM-DD HH:mm')
class DotLineChart extends React.Component {

    constructor() {
        super();

        this.state = {
            data: {},
            legend: {
                enabled: false,
                textColor: processColor('red'),
                textSize: 12,
                form: 'SQUARE',
                formSize: 14,
                xEntrySpace: 10,
                yEntrySpace: 5,
                formToTextSpace: 5,
                wordWrapEnabled: true,
                maxSizePercent: 0.5,
                custom: {
                    colors: [processColor('red'), processColor('red')],
                    labels: ['REFER', 'USER',]
                }
            },
            marker: {
                enabled: true,
                markerColor: processColor('#F0C0FF8C'),
                textColor: processColor('white'),
                markerFontSize: 14,
            },

            selectedEntry: "",
            yAxis: {left:{axisMinimum:0,position: 'INSIDE_CHART', textColor:processColor('#CCCCCC')}, right: {enabled: false}},
            xAxis: {
                drawLabels: false,
                granularity: 1,
                granularityEnabled: true,
                drawAxisLine: false,
                drawGridLines:false,
                valueFormatter: 'date',
                valueFormatterPattern: 'YYYY-MM-dd',
                since: 0,
                timeUnit: 'DAYS',
                zeroLine:{
                    enabled:false
                },
            },
        }

    }

    getIndexOfDay(day) {
        return moment(day, 'YYYY-MM-DD HH:mm').diff(era, 'days')
    }

    getIndexOfMins(day) {

        let aa = moment(day, 'YYYY-MM-DD HH:mm')
        return moment(day, 'YYYY-MM-DD HH:mm').diff(era, 'minute')
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

            let priceData = data.data.map((e) => {
                let date = moment(e.time).format('YYYY-MM-DD HH:mm')

                let maker = 'open:'+e.open+'\n'+'close:'+e.close+'\n'+'H:'+e.high+'\n'+'L:'+e.low+'\n'+'date:'+date+'\n'

                return{
                    x: this.getIndexOfMins(moment(e.time).format('YYYY-MM-DD HH:mm')),
                    y: e.close,
                    marker: maker
                }})

            this.setState(
                update(this.state, {
                    data: {
                        $set: {
                            dataSets: [

                                {
                                    values: priceData,

                                    label: 'user',
                                    config: {
                                        lineWidth: 1,
                                        drawValues: false,
                                        circleRadius: 5,
                                        drawCircles: false,
                                        highlightEnabled: true,
                                        drawHighlightIndicators: false,
                                        color: processColor('red'),
                                        drawFilled: true,
                                        valueTextSize:10,
                                        fillColor: processColor('red'),
                                        fillAlpha: 45,
                                        valueFormatter: "###.0",
                                        circleColor: processColor('red')
                                    }
                                }],
                        }
                    }
                })
            );




        })

    }


    componentWillUnmount() {

        DeviceEventEmitter.removeListener('pushEmitter7')
        WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":-5,"type":7}))

    }

    // componentDidMount() {
    //     const size = 80;
    //
    //     // this.setState(
    //     //     update(this.state, {
    //     //         data: {
    //     //             $set: {
    //     //                 dataSets: [
    //     //                 //     {
    //     //                 //     values: this.randomParabolaValues(size),
    //     //                 //     label: 'refer',
    //     //                 //     config: {
    //     //                 //         lineWidth: 2,
    //     //                 //         drawValues: false,
    //     //                 //         drawCircles: false,
    //     //                 //         highlightColor: processColor('red'),
    //     //                 //         color: processColor('red'),
    //     //                 //         drawFilled: true,
    //     //                 //         fillColor: processColor('blue'),
    //     //                 //         fillAlpha: 60,
    //     //                 //         highlightEnabled: false,
    //     //                 //         dashedLine: {
    //     //                 //             lineLength: 20,
    //     //                 //             spaceLength: 20
    //     //                 //         }
    //     //                 //     }
    //     //                 // },
    //     //                     {
    //     //                     values: [
    //     //                         {x: 1, y: 11000, marker: "a very long long long long long long long long \nmarker at top left"},
    //     //                         {x: 10, y: 90, marker: "eat eat eat, never\n stop eat"},
    //     //                         {x: 20, y: 130, marker:""  },
    //     //                         {x: 30, y: 11000, marker: "test top center marker"},
    //     //                         {x: 40, y: 2000, marker: "eat more"},
    //     //                         {x: 50, y: 9000, marker: "your are overweight, eat less"},
    //     //                         {x: 60, y: 11000, marker: "test top right marker"},
    //     //                         {x: 70, y: 130, marker:""  },
    //     //                         {x: 80, y: 11000, marker: "test top center marker"},
    //     //                         {x: 90, y: 2000, marker: "eat more"},
    //     //                         {x: 100, y: 9000, marker: "your are overweight, eat less"},
    //     //                         {x: 110, y: 11000, marker: "test top right marker"}
    //     //                         ],
    //     //
    //     //
    //     //                     label: 'user',
    //     //                     config: {
    //     //                         lineWidth: 1,
    //     //                         drawValues: true,
    //     //                         circleRadius: 5,
    //     //                         highlightEnabled: true,
    //     //                         drawHighlightIndicators: true,
    //     //                         color: processColor('red'),
    //     //                         drawFilled: true,
    //     //                         valueTextSize:10,
    //     //                         fillColor: processColor('red'),
    //     //                         fillAlpha: 45,
    //     //                         valueFormatter: "###.0",
    //     //                         circleColor: processColor('red')
    //     //                     }
    //     //                 }],
    //     //             }
    //     //         }
    //     //     })
    //     // );
    // }

    randomParabolaValues(size: number) {
        return _.times(size, (index) => {
            return {x: index, y: index * index}
        });
    }

    handleSelect(event) {
        let entry = event.nativeEvent
        if (entry == null) {
            this.setState({...this.state, selectedEntry: null})
        } else {
            this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
        }

        console.log(event.nativeEvent)
    }

    render() {

        let borderColor = processColor("red");
        return (
            <View style={{width:screenW,height:368}}>



                <View style={styles.container}>


                    <LineChart
                        style={styles.chart}
                        data={this.state.data}
                        chartDescription={{text: ''}}
                        legend={this.state.legend}
                        marker={this.state.marker}
                        scaleYEnabled={false}

                        doubleTapToZoomEnabled={false}
                        autoScaleMinMaxEnabled={true}
                        drawGridBackground={false}

                        //borderColor={borderColor}
                        //borderWidth={1}
                        //drawBorders={true}
                        chartBackgroundColor={processColor("#161F2F")}

                        yAxis={this.state.yAxis}
                        xAxis={this.state.xAxis}


                        onSelect={this.handleSelect.bind(this)}
                        onChange={(event) => console.log(event.nativeEvent)}

                        ref="chart"
                    />
                </View>
            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        width:screenW,height:368,
        backgroundColor:'#161F2F'
    },
    chart: {
        width:screenW,height:368,
        backgroundColor:'#161F2F'
    }
});


export default DotLineChart;
