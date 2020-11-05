import React,{Component} from 'react'
import {View} from 'react-native'
import {Calendar} from 'react-native-calendars';
import PropTypes from 'prop-types';

export default class CalendarView extends Component{


    static propTypes ={
        onPressAction:PropTypes.func
    }

    static defaultProps={
        onPressAction:(startDateString,endDateString)=>{}

    }

    constructor(props){
        super(props)
        this.state =  {
            startDateString:undefined,
            endDateString:undefined,
            startDate:undefined,
            endDate:undefined,
        };
    }

    onDayPress = (day) => {
        if (this.state.startDate==undefined){
            this.setState({startDate: day,startDateString:day.dateString});
        }else{
            if (day.timestamp >this.state.startDate.timestamp){
                this.setState({endDate: day,endDateString:day.dateString},()=>{
                    this.props.onPressAction(this.state.startDateString,this.state.endDateString)
                });

            }else {
                let date = this.state.startDate
                this.setState({startDate: day,startDateString:day.dateString,endDate:date,endDateString:date.dateString},()=>{
                    this.props.onPressAction(this.state.startDateString,this.state.endDateString)
                });
            }
        }


    }


    render(){
        return  <Calendar
            onDayPress={this.onDayPress}
            markedDates={{
                [this.state.startDateString]: {selected: true,disableTouchEvent: true,selectedDotColor: 'orange'},
                [this.state.endDateString]: {selected: true,disableTouchEvent: true,selectedDotColor: 'orange'}
            }}
        />

    }

}
