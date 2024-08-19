/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 拍照/录像页面
 *
 */

import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';

function TestPage(props) {
  const device = useCameraDevice('back');

  const [visible, setVisible] = useState(false);

  useEffect(() => {}, []);

  return (
    <View style={styles.page}>
      <Camera style={StyleSheet.page} device={device} isActive={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
export default TestPage;
