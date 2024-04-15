/**
 * Author: Meng
 * Date: 2022-06-23
 * Desc:
 */
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, useColorScheme} from 'react-native';

const MemoInput = props => {
  const defStr = props.defaultValue || '';
  const [valueStr, setValueStr] = useState(defStr);
  const [count, setCount] = useState(defStr.length);
  const maxLength = props.maxLength || 300;
  // const dark = useColorScheme() === 'dark';

  useEffect(() => {
    setValueStr(defStr);
  }, [defStr]);

  function onChangeText(e = '') {
    setCount(e.length);
    if (props.onChangeText) {
      props.onChangeText(e);
    }
  }

  const style = props.style || styles.box;
  const inputStyle = props.inputStyle || styles.input;
  inputStyle.height = style.height;
  if (props.height) {
    style.height = props.height;
    inputStyle.height = props.height;
  }

  return (
    <View style={style}>
      <TextInput
        multiline={true}
        textAlignVertical="top"
        {...props}
        style={inputStyle}
        defaultValue={valueStr}
        maxLength={maxLength}
        placeholder={props.placeholder || '请输入'}
        onChangeText={onChangeText}
      />
      <Text style={styles.count}>
        {count}/{maxLength}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 128,
    borderWidth: 1,
    borderColor: '#efefef',
    backgroundColor: '#F5F5F5',
  },
  input: {
    height: 128,
    padding: 6,
    color: '#232323',
    fontSize: 16,
  },
  count: {
    bottom: 4,
    right: 8,
    zIndex: 1,
    position: 'absolute',
  },
});

export default MemoInput;
