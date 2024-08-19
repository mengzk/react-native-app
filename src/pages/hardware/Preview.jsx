/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 预览相册页面
 *  mode: 1/2/3 图片/视频/视频图片
 *  data: [] 图片/视频数据
 *  index: 0 当前索引
 */

import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

function PreviewPage(props) {

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
export default PreviewPage;
