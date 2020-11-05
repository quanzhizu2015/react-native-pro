import  React,{Component} from 'react'
import {View} from 'react-native'
import PropTypes from 'prop-types';
import Label from 'teaset/components/Label/Label';
import {FONT_M, FONT_R} from '../Fonts';


export class InputItem extends Component{

    static propTypes ={
        style:PropTypes.object,
        containStyle:PropTypes.object,
        leftElement:PropTypes.element,
        detailElement:PropTypes.element,
        rightElement:PropTypes.element,
        isShowBottomLine:PropTypes.bool,
        contentHeight:PropTypes.number
    }

    static defaultProps={
        style:{},
        containStyle:{},
        leftElement:null,
        detailElement:null,
        rightElement:null,
        isShowBottomLine:true,
        contentHeight:49
    }

    constructor(props){
        super(props)
    }


    render(){

        return <View style={[{height:50,marginTop:10,justifyContent:'center'},this.props.style]}>
            <View style={[{flexDirection:'row',alignItems:'center',height:this.props.contentHeight},this.props.containStyle]}>
                {
                    this.props.leftElement != null?this.props.leftElement:<View/>
                }
                {
                    this.props.detailElement != null?this.props.detailElement:<View/>
                }
                {
                    this.props.rightElement != null?this.props.rightElement:<View/>
                }
            </View>
            {this.props.isShowBottomLine?<View style={{height:1,backgroundColor:'#848484'}}/>:<View/>}

        </View>

    }

}


export class TitleInputItem  extends Component{


    static propTypes ={
        style:PropTypes.object,
        containStyle:PropTypes.object,
        leftElement:PropTypes.element,
        detailElement:PropTypes.element,
        rightElement:PropTypes.element,
        isShowBottomLine:PropTypes.bool,
        title:PropTypes.string,
        contentHeight:PropTypes.number,
    }

    static defaultProps={
        style:{},
        containStyle:{},
        leftElement:null,
        detailElement:null,
        rightElement:null,
        isShowBottomLine:true,
        contentHeight:25,
    }

    constructor(props) {
        super(props);
    }

    render(){

        return <View style={[{height:60,marginTop:10},this.props.style]}>
            <View style={[{height:59,justifyContent:'center'},this.props.containStyle]}>
                <Label style={{fontFamily:FONT_M,fontSize:13,color:'#fff'}}>{this.props.title}</Label>
                <View style={{flexDirection:'row',alignItems:'center',height:this.props.contentHeight}}>
                    {
                        this.props.leftElement != null?this.props.leftElement:<View/>
                    }
                    {
                        this.props.detailElement != null?this.props.detailElement:<View/>
                    }
                    {
                        this.props.rightElement != null?this.props.rightElement:<View/>
                    }

                </View>
            </View>

            {this.props.isShowBottomLine?<View style={{height:1,backgroundColor:'#848484'}}/>:<View/>}
        </View>

    }

}

export class DouLabel extends Component{

    static propTypes ={
        style:PropTypes.object,
        title:PropTypes.string,
        content:PropTypes.string
    }

    static defaultProps={
        style: {},
        title:'',
        content:''
    }

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={this.props.style}>
                <Label style={{color:'#999999',fontFamily:FONT_R,fontSize:14}}>{this.props.title}</Label>
                <Label style={{color:'#fff',fontFamily:FONT_M,fontSize:15,marginTop:3}}>{this.props.content}</Label>

            </View>
        );
    }

}
