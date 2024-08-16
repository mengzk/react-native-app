/**
 * Author: Meng
 * Date: 2024-08-14
 * Modify: 2024-08-14
 * Desc: 错误提示Model -网络,页面加载等
 */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, DeviceEventEmitter} from 'react-native';

const HintModel = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const emitter = DeviceEventEmitter.addListener('AppHintModel', res => {
      setVisible(res);
    });
    return () => {
      emitter.remove();
    };
  }, []);

  if (visible) {
    return (
      <View style={styles.layout}>
        <Text>Error</Text>
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
export default React.memo(HintModel);
