import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Image} from 'react-native';
import NavigationButton from 'teaset/components/NavigationBar/NavigationButton';

export default class NavigationIconButton extends NavigationButton {

    static propTypes = {
        ...NavigationButton.propTypes,
        icon: Image.propTypes.source,
        imageStyle:PropTypes.object
    }

    static defaultProps={
        imageStyle:{
            width: 20,
            height: 20,
        }
    }

    renderTitle() {
        let {icon} = this.props;
        if (icon === null || icon === undefined) return super.renderTitle();

        return <Image style={this.props.imageStyle} source={icon}/>;
    }

}
