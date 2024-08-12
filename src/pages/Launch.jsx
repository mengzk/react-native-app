/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 启动页
 */

import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Configs from '../config/index';

const Launch = (props) => {
  let {top, bottom} = useSafeAreaInsets(); // 安全区域

  useEffect(() => {
    if (top > 0) {
      Configs.screen.top = top;
    }
    if (bottom > 0) {
      Configs.screen.bottom = bottom;
    }
    console.log('-----> screen: ', Configs.screen);
    const timer = setTimeout(() => {
      clearTimeout(timer);
      props.navigation.navigate('Main');
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      {/* <Image source={require('../../assets/launch.jpg')} /> */}
      <Text>启动中...</Text>
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
});
