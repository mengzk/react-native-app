/**
 * @Description: keyboard sticky view 键盘吸附视图
 * @author Jobs
 * @date 2022/8/16
 */

'use strict'
import React, {useState, useEffect} from 'react'
import {
    Animated,
    Keyboard,
    Easing,
    EventEmitter
} from 'react-native'
import PropTypes from 'prop-types'

const KBStickyView = props => {
    const {kbStickyOffset} = props

    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0))
    const [keyboardHeight, setKeyboardHeight] = useState(226)

    useEffect(() => {
        let lister1 = Keyboard.addListener('keyboardWillShow', keyboardWillShow)
        let lister2 = Keyboard.addListener('keyboardWillHide', keyboardWillHide)
        return () => {
            lister1.remove('keyboardWillShow')
            lister2.remove('keyboardWillHide')
        }
    }, [props])

    const keyboardWillShow = event => {
        const {duration, endCoordinates: {height: keyboardHeight}} = event
        setKeyboardHeight(keyboardHeight)
        handleKbAnimation(1, duration)
    }

    const keyboardWillHide = event => {
        handleKbAnimation(0, event.duration)
    }

    const handleKbAnimation = (value = 1, duration) => {
        Animated.timing(animatedValue, {
            toValue: value,
            duration: duration,
            easing: Easing.linear,
            useNativeDriver: true
        }).start()
    }

    const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -keyboardHeight + kbStickyOffset]
    })

    return (
        <Animated.View
            style={{
                transform: [{translateY}]
            }}
        >
            {props?.children}
        </Animated.View>
    )
}

KBStickyView.propTypes = {
    kbStickyOffset: PropTypes.number
}

KBStickyView.defaultProps = {
    kbStickyOffset: 0
}

export default KBStickyView
