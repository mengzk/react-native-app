/**
 * Author: Meng
 * Date: 2024-08-12
 * Modify: 2024-08-12
 * Desc: 日志页面
 */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Modal,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
// import {useNavigation} from '@react-navigation/native';

import LogDetail from './LogDetail';

let lastTime = 0;
function LogModel(props) {
  // const navigation = useNavigation();
  // {method: 'GET', time: 130, url: 'http://test.com/qrtere/weqweq', params: {}, code: 200, data: {}, message: '未授权'},
  const [look, setLook] = useState(false);
  const [visible, setVisible] = useState(false);
  const [list, setList] = useState([]);
  const detail = useRef({});

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  useEffect(() => {
    setList(props.data || []);
  }, [props.data]);

  function onClean() {
    setList([]);
    props.onClean();
    onBack();
  }

  function onBack() {
    setVisible(false);
    props.onClose();
  }

  function onCloseLook() {
    setLook(false);
  }

  function onPress(item) {
    const now = Date.now();
    if (now - lastTime < 1200) {
      return;
    }
    lastTime = now;
    detail.current = item;
    setLook(true);
    // navigation.navigate('LogDetailPage', {item});
  }

  // 是否请求失败 fail
  function isOk(item) {
    return item.code == 0 || item.code == 200;
  }

  function renderItem({item, index}) {
    const metStyle = item.method == 'GET' ? styles.method : styles.method2;
    const staStyle = isOk(item) ? styles.status : styles.status2;
    const path = (item.url||'');
    // const paths = (item.url||'/').split('/');
    // const path = paths.slice(paths.length - 2).join('/');
    return (
      <TouchableOpacity
        key={index}
        style={styles.item}
        activeOpacity={0.8}
        onPress={() => onPress(item)}>
        <View style={styles.staBox}>
          <Text style={metStyle}>{item.method}</Text>
          <Text style={staStyle}>{item.code}</Text>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.time}>{item.time}s</Text>
        </View>
        <Text style={styles.url} numberOfLines={2} ellipsizeMode="tail">
          {path}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
            <Text style={styles.btnText}>返回</Text>
          </TouchableOpacity>
          <Text style={styles.title}>网络日志</Text>
          <TouchableOpacity style={styles.headerBtn2} onPress={onClean}>
            <Text style={styles.btnText}>清空</Text>
          </TouchableOpacity>
        </View>
        <FlatList style={styles.flat} data={list} renderItem={renderItem} />
      </View>
      {/* 日志详情 */}
      {look ? <LogDetail data={detail.current} onClose={onCloseLook} /> : <></>}
    </Modal>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  header: {
    height: 50,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3',
    backgroundColor: 'white',
  },
  headerBtn: {
    width: 56,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBtn2: {
    width: 56,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btnText: {
    fontSize: 14,
    color: '#232323',
  },
  title: {
    fontSize: 18,
    color: '#232323',
  },
  flat: {
    flex: 1,
    paddingTop: 12,
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 1,
    backgroundColor: 'white',
  },
  staBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  method: {
    fontSize: 14,
    color: '#3478F6',
  },
  method2: {
    fontSize: 14,
    color: '#FF6600',
  },
  status: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00C261',
  },
  status2: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF2626',
  },
  url: {
    fontSize: 14,
    color: '#323232',
  },
  date: {
    flex: 1,
    fontSize: 13,
    color: '#232323',
  },
  time: {
    fontSize: 13,
    color: '#00C261',
  },
});
export default LogModel;
