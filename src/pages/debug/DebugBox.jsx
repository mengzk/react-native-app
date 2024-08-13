/**
 * Author: Meng
 * Date: 2024-08-12
 * Modify: 2024-08-12
 * Desc: 调试页面
 * 注意：!!! 这只是一个开发调试入口，项目上线要关闭 !!!
 */
import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, DeviceEventEmitter} from 'react-native';

import Configs from '../../config';

function DebugBox() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const emitter = DeviceEventEmitter.addListener('app-debug', (data) => {
      setVisible(data);
    });

    return () => {
      emitter.remove();
    };
  }, []);

  function onPress() {
    console.log('DebugBox onPress');
    // props.navigate('PanelPage');
  }

  if (Configs.debug || visible) {
    return (
      <View style={styles.page}>
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
          <Text style={styles.debug}>Debug</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return <></>;
  }
}

const styles = StyleSheet.create({
  page: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 66,
    height: 20,
    zIndex: 1000,
    transform: [{rotate: '45deg'}, {translateX: 15}, {translateY: -8}],
    backgroundColor: 'rgba(255,160,0,0.7)',
    justifyContent: 'center',
  },
  debug: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
});
export default React.memo(DebugBox);
