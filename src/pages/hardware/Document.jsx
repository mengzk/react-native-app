/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 预览文档页面
 *  mode: 1/2/3 pdf/xls/doc/ppt
 *  url: 选择数量
 */

import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

function DocumentPage(props) {

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
export default DocumentPage;
