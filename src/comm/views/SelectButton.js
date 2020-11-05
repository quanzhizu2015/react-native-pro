import  React,{Component} from 'react'
import {View,TouchableOpacity,Image} from 'react-native'
import PropTypes from 'prop-types';

export default class SelectButton extends Component{
    static propTypes = {
        style:PropTypes.object,
        imageStyle:PropTypes.object,
        selectImage:PropTypes.number,
        normalImage:PropTypes.number,
        onPress:PropTypes.func,
        isSelected:PropTypes.bool
    };

    static defaultProps = {
        style:{width:20,height:12},
        imageStyle:{width:20,height:12},
        selectImage:require('../../assert/login/unlook.png'),
        normalImage:require('../../assert/login/look.png'),
        isSelected:false,
        onPress:(isSelected)=>{}
    };

    constructor(props){
        super(props)
        this.state={
            isSelected:this.props.isSelected
        }
    }

    onPress(){


        this.setState({isSelected:!this.state.isSelected},()=>{
            this.props.onPress(this.state.isSelected);
        })

    }

    render(){
        return <TouchableOpacity onPress={this.onPress.bind(this)} >
            <View style={this.props.style}>
                <Image style={this.props.imageStyle} resizeMode={'contain'}  source={this.state.isSelected?this.props.selectImage:this.props.normalImage}/>
            </View>

        </TouchableOpacity>
    }
}
