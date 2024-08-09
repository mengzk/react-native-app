/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 多行输入框 含字数
 */

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';


// Props {
//   style?: object; //
//   height?: number; //
//   maxLength?: number; //
//   showCount?: boolean; //
//   placeholder?: string; //
//   defaultValue?: string; //
//   onChangeText?: (str) => void;
// }
const InputBox = (props) => {
  const [count, setCount] = useState(0);
  const show = props.showCount == null ? true : props.showCount;

  function onChangeText(e = '') {
    show && setCount(e.length);
    if(props.onChangeText) {
      props.onChangeText(e);
    }
  }

  const style = props.style || styles.box;
  const inputStyle = {...styles.input};
  if(style.padding) {
    inputStyle.padding = style.padding;
  }
  if(style.height) {
    inputStyle.height = style.height;
  }
  return (
    <View style={style}>
      <TextInput
        style={inputStyle}
        textAlignVertical="top"
        defaultValue={props.defaultValue}
        multiline={true}
        returnKeyType="done"
        blurOnSubmit={true}
        maxLength={props.maxLength || 300}
        placeholder={props.placeholder || '请输入'}
        placeholderTextColor="#979797"
        onChangeText={onChangeText}
        autoFocus={props.autoFocus}
      />
      {show && <Text style={styles.count}>
        {count}/{props.maxLength || 300}
      </Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 150,
    minHeight: 110,
    borderRadius: 6,
    backgroundColor: '#F5F5F5',
  },
  input: {
    height: 150,
    paddingTop: 12,
    padding:12,
    fontSize: 14,
    color: '#232323'
  },
  count: {
    color: '#969696',
    fontSize: 12,
    bottom: 12,
    right: 12,
    position: 'absolute',
  }
});

export default InputBox;
