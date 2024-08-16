/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 启动页
 */

import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Images from '../assets/imgs';
import {initDeviceInfo} from '../config/constants';
import {initLibs} from '../libs/index';

const Launch = props => {
  let {top, bottom} = useSafeAreaInsets(); // 安全区域

  useEffect(() => {
    // 初始化设备信息
    initDeviceInfo(top, bottom);
    // 初始化三方库
    initLibs();

    // 延时跳转首页
    const timer = setTimeout(() => {
      clearTimeout(timer);
      props.navigation.replace('Main');
    }, 600);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Images.launch} />
      <Text style={styles.text}>启动中...</Text>
    </View>
  );
};
export default Launch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#676767',
    fontSize: 14,
    marginTop: 16,
  },
});
