/**
 * Author: Meng
 * Date: 2024-08-07
 * Modify: 2024-08-07
 * Desc: 键盘吸附组件
 */

import React, {useState, useEffect} from 'react';
import {Animated, Keyboard, Easing} from 'react-native';

function StickyView(props) {
  const {offset} = props;

  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
  const [keyboardHeight, setKeyboardHeight] = useState(226);

  useEffect(() => {
    let lister1 = Keyboard.addListener('keyboardWillShow', keyboardWillShow);
    let lister2 = Keyboard.addListener('keyboardWillHide', keyboardWillHide);
    return () => {
      lister1.remove('keyboardWillShow');
      lister2.remove('keyboardWillHide');
    };
  }, [props]);

  const keyboardWillShow = event => {
    const {
      duration,
      endCoordinates: {height: keyboardHeight},
    } = event;
    setKeyboardHeight(keyboardHeight);
    handleKbAnimation(1, duration);
  };

  const keyboardWillHide = event => {
    handleKbAnimation(0, event.duration);
  };

  const handleKbAnimation = (value = 1, duration) => {
    Animated.timing(animatedValue, {
      toValue: value,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -keyboardHeight + kbStickyOffset],
  });

  return (
    <Animated.View
      style={{
        transform: [{translateY}],
      }}>
      {props?.children}
    </Animated.View>
  );
}

export default StickyView;
