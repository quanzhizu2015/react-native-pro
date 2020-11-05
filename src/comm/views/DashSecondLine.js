import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
/*水平方向的虚线
 * len 虚线个数
 * width 总长度
 * backgroundColor 背景颜色
 * */
export  class DashSecondLine extends Component {

    static propTypes ={
        len:PropTypes.number,
        backgroundColor:PropTypes.string
    }

    static defaultProps={
        len:10,
        backgroundColor:'#fff'
    }

    render() {
        let len = this.props.len;
        let arr = [];
        for (let i = 0; i < len; i++) {
            arr.push(i);
        }
        return <View style={[styles.dashLine, {width: this.props.width}]}>
            {
                arr.map((item, index) => {
                    return <Text style={[styles.dashItem, {backgroundColor: this.props.backgroundColor}]}
                                 key={'dash' + index}> </Text>
                })
            }
        </View>
    }
}


export  class DashSecondHLine extends Component {

    static propTypes ={
        len:PropTypes.number,
        backgroundColor:PropTypes.string
    }

    static defaultProps={
        len:10,
        backgroundColor:'#fff'
    }

    render() {
        let len = this.props.len;
        let arr = [];
        for (let i = 0; i < len; i++) {
            arr.push(i);
        }
        return <View style={[styles.dashHLine, {width: this.props.width}]}>
            {
                arr.map((item, index) => {
                    return <Text style={[styles.dashHItem, {backgroundColor: this.props.backgroundColor}]}
                                 key={'dash' + index}> </Text>
                })
            }
        </View>
    }
}
const styles = StyleSheet.create({

    dashLine: {
        flexDirection: 'column',
        height: 80
    },
    dashItem: {
        height: 2,
        width: 1,
        marginTop: 2,
    },
    dashHLine: {
        flexDirection: 'row',
    },
    dashHItem: {
        height: 1,
        width: 2,
        marginRight: 2,
    }
})

