/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 相册页面
 *  mode: 1/2/3 图片/视频/视频图片
 *  count: 选择数量
 *  eventKey: 事件key
 *  callback: 回调
 */

import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

function GalleryPage(props) {

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
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
export default GalleryPage;
