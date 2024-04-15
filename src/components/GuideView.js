/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc: 指南组件
 */
import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const GuideView = (props) => {

  return (
    <>
      <View style={styles.box}>

      </View>
      {props.msg ? <Text>{props.msg}</Text> : null}
      {props.icon ? <Image source={props.icon} /> : null}
    </>
  )
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
})

export default GuideView;
