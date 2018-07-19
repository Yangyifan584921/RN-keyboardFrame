import React, {Component, PropTypes} from'react';
import {
    Keyboard,
    View,
    Dimensions,
    LayoutAnimation,
    StyleSheet
} from 'react-native';



export default class KeyBoardFrame extends Component{
    static defaultProps = {
        topSpacing: 0,
        onToggle: () => null
    }

    constructor(props) {
        super(props)
        this.state = {
            keyboardSpace: 0,
            isKeyboardOpened: false
        }
        this._listeners = []
        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)
    }
    componentWillMount() {
        this._listeners = [
            Keyboard.addListener('keyboardWillShow', this.show),
            Keyboard.addListener('keyboardWillHide', this.hide),
        ]
    }

    show(event) {
        const screenHeight = Dimensions.get('window').height;
        const keyboardSpace = (screenHeight - event.endCoordinates.screenY) + this.props.topSpacing;
        this.setState({
            keyboardSpace,
            isKeyboardOpened: true
        })
    }

    hide(event) {
        this.setState({
            keyboardSpace: 0,
            isKeyboardOpened: false
        })
    }

    componentWillUmmount() {
        this._listeners.forEach(item => item.remove())
    }

    render() {
        return(
            <View style={[styles.container, {height: this.state.keyboardSpace}]}/>
        )
    }
}

const styles= StyleSheet.create({
    container: {
        left: 0,
        right: 0,
        bottom: 0
    }
})

