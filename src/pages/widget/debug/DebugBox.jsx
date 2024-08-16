/**
 * Author: Meng
 * Date: 2024-08-12
 * Modify: 2024-08-12
 * Desc: 调试页面
 * 注意：!!! 这只是一个开发调试入口，项目上线要关闭 !!!
 */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  DeviceEventEmitter,
} from 'react-native';
// import {useNavigation} from '@react-navigation/native';

import Configs from '../../../config/index';

import LogModel from './LogModel';
import PanelModel from './PanelModel';

function DebugBox() {
  // const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const maxLog = Configs.maxLog;
    const emitter = DeviceEventEmitter.addListener('app-debug', data => {
      setVisible(data);
    });
    const emitter2 = DeviceEventEmitter.addListener('app-request-log', data => {
      addLog(data, maxLog);
    });

    return () => {
      emitter.remove();
      emitter2.remove();
    };
  }, []);

  // 清空日志
  function clearLogs() {
    setLogs([]);
  }

  // 添加日志
  function addLog(data, maxLog) {
    // console.log('-----> DebugBox addLog:', logs.length, data);
    const endDate = Date.now();
    data.date = new Date(data.startDate).toLocaleString();
    data.time = Math.round((endDate - data.startDate) / 1000);
    // 
    logs.push(data);
    const num3 = logs.length - maxLog;
    let list = num3 > 0 ? logs.slice(num3, logs.length) : [].concat(logs);
    setLogs(list);
  }

  function onPress() {
    setVisible1(true);
  }

  function onLongPress() {
    setVisible2(true);
  }

  if (Configs.debug || visible) {
    return (
      <View style={styles.page}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPress}
          onLongPress={onLongPress}>
          <Text style={styles.debug}>Debug</Text>
        </TouchableOpacity>
        <LogModel
          visible={visible1}
          data={logs}
          onClose={() => {
            setVisible1(false);
          }}
          onClean={clearLogs}
        />
        <PanelModel
          visible={visible2}
          onClose={() => {
            setVisible2(false);
          }}
        />
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
    zIndex: 99999,
    transform: [{rotate: '45deg'}, {translateX: 16}, {translateY: -10}],
    backgroundColor: 'rgba(255,0,0,0.8)',
  },
  debug: {
    lineHeight: 20,
    fontSize: 13,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default React.memo(DebugBox);
