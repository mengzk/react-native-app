/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc:
 */
import React from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

// interface Props extends TextInputProps {
//   text?: string;
//   hint?: string;
//   onPress?: () => void;
// }

const Search = (props) => {
  return (
    <View style={styles.box}>
      <View style={styles.inputView}>
        <Image style={styles.img} />
        <TextInput
          style={styles.input}
          maxLength={36}
          {...props}
          defaultValue={props.text}
          placeholder={props.hint || '搜索项目'}
        />
      </View>
      <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
        <Text>搜索</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: 48,
    paddingLeft: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  inputView: {
    height: 32,
    flex: 1,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
  },
  img: {
    width: 20,
    height: 20,
    marginLeft: 12,
    marginRight: 6,
  },
  input: {
    flex: 1,
    padding: 0,
    margin: 0,
    lineHeight: 16,
    justifyContent: 'center',
  },
  btn: {
    height: '90%',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
});

export default Search;
