/**
 * Author: Meng
 * Date: 2024-08-14
 * Modify: 2024-08-14
 * Desc: 加载中提示框
 */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, DeviceEventEmitter} from 'react-native';

const AppLoading = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const emitter = DeviceEventEmitter.addListener('AppAppLoading', res => {
      setLoading(res);
    });
    return () => {
      emitter.remove();
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.layout}>
        <Text>加载中...</Text>
      </View>
    );
  } else {
    return <></>;
  }
};

const styles = StyleSheet.create({
  layout: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 0,
    height: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
});
export default React.memo(AppLoading);
