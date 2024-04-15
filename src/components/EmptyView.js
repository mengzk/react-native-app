/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc:
 */

import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Images from '../Images/Common/index'
// interface Props {
//   title?: string;
//   icon?: string;
// }

const EmptyView = (props) => {
  return (
    <View style={styles.box}>
      <Image style={styles.img} source={props.icon || Images.Partner_empty} />
      <Text style={styles.text}>{props.msg || '没有发现记录哦！'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    flexDirection: 'column',
  },
  img: {
    width: 128,
    height: 128,
    marginBottom: 8,
  },
  text: {
    color: '#989898'
  }
});

export default EmptyView;
