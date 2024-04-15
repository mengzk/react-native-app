/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc:
 */
import React, { useRef } from 'react';
import { Animated, PanResponder } from 'react-native';

// interface Prop<T, S> {
//   children?: React.ReactElement[] | React.ReactElement;
//   onMove?: (x: number, y: number) => void;
// }

const MoveView = (props) => {
  const panView = useRef(new Animated.ValueXY()).current;

  const pan = useRef(
    PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      // onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      // onMoveShouldSetPanResponder: (evt, gestureState) => true,
      // onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        panView.setOffset({
          x: panView.x._value,
          y: panView.y._value,
        });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: panView.x, dy: panView.y }],
        { useNativeDriver: false },
      ),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        panView.flattenOffset();
        if (props.onMove) {
          // props.onMove(panView.x._value, panView.y._value);
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    }),
  ).current;

  return (
    <Animated.View
      {...pan.panHandlers}
      style={{
        transform: [{ translateX: panView.x }, { translateY: panView.y }],
      }}>
      {props.children}
    </Animated.View>
  );
};

export default MoveView;
