/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 
 *  mode: 1/2 拍照/录像
 *  camera: 1/2 前置/后置
 *  quality: 1/2/3 高/中/低
 *  eventKey: 事件key
 *  callback: 回调
 */

import React, {useEffect, useState} from 'react';
import { View, StyleSheet, DeviceEventEmitter } from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';

function CameraPage(props) {
  const device = useCameraDevice('back');

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    return () => {
      if (props.callback) {
        props.callback(''); // 回调
      }
      if (props.eventKey) {
        DeviceEventEmitter.emit(props.eventKey, ''); // 事件
      }
    };
  }, []);

  return (
    <View style={styles.page}>
      <Camera style={styles.camera} device={device} isActive={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1
  },
  camera: {
    flex: 1
  }
})
export default CameraPage;