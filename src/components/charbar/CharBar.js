/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc:
 */
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, PanResponder, StyleSheet } from 'react-native';


const codes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'L', 'J', 'K', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#']

let viewTop = 0;
let timer_id = -1;

const CharBar = (props) => {
  const [charIdx, setCharIdx] = useState(props.index || 0);
  const [showChar, setShowChar] = useState('');
  const show_duration = props.duration || 1200;

  useEffect(() => {
    console.log(charIdx);
    setCharIdx(props.index || 0);
  }, [props]);

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => { },
      onPanResponderMove: (evt, gestureState) => {
        const mY = Math.round(gestureState.moveY - viewTop);
        let index = Math.ceil(mY / 22) - 1;
        if (index > -1 && index < codes.length && index != charIdx) {
          setShowChar(codes[index])
          setCharIdx(index);
          // console.log(charIdx, showChar, index)
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => { }
    })
  ).current;

  function onShowChar() {
    clearTimeout(timer_id);
    timer_id = setTimeout(() => {
      clearTimeout(timer_id);
      setShowChar('');
      if (props.onChange && charIdx != props.index) {
        props.onChange(charIdx);
      }
    }, show_duration);

    return (
      <View style={styles.showChar}>
        <Text style={styles.showCharText}>{showChar}</Text>
      </View>
    )
  }

  const show = showChar.length > 0;
  return (
    <>
      <View style={styles.box} {...pan.panHandlers}
        onLayout={(e) => {
          viewTop = e.nativeEvent.layout.y;
        }}>
        {codes.map((e, idx) => {
          return <Text key={e} style={charIdx == idx ? styles.select : styles.text}>{e}</Text>
        })}
      </View>
      {show && onShowChar()}
    </>
  )
}

const styles = StyleSheet.create({
  box: {
    width: 22,
    zIndex: 97,
    top: 32,
    right: 6,
    position: 'absolute',
    backgroundColor: '#00000010',
    borderRadius: 16,
  },
  text: {
    height: 22,
    maxHeight: 22,
    fontSize: 14,
    color: '#676767',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 22
  },
  select: {
    height: 22,
    maxHeight: 22,
    fontSize: 16,
    color: '#232323',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 22,
    borderRadius: 11,
    backgroundColor: '#FFFFFF'
  },
  showChar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    top: '50%',
    left: '48%',
    zIndex: 997,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#FFFFFFA0'
  },
  showCharText: {
    fontSize: 32,
    color: '#232323',
    fontWeight: '700',
  }
})

export default CharBar;
