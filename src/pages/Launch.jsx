/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 启动页
 */

import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Configs from '../config/index'

const Launch = () => {
  let {top, bottom} = useSafeAreaInsets(); // 安全区域
  Configs.screen.top = top;
  Configs.screen.bottom = bottom;

  return (
    <View style={styles.container}>
      {/* <Image source={require('../../assets/launch.jpg')} /> */}
    </View>
  );
};
export default Launch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f60',
  },
});
