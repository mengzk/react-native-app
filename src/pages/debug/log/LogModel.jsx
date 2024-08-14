/**
 * Author: Meng
 * Date: 2024-08-12
 * Modify: 2024-08-12
 * Desc: 日志页面
 */
import React, {useState, useEffect} from 'react';
import {
  View,
  Modal,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

let lastTime = 0;
function LogModel(props) {
  // {method: 'GET', time: 130, url: 'http://bing.com/ewqew/qrtertwerwwe/weqweq/weqeq', params: {}, code: 200, data: {}, message: '未授权'},
  const [visible, setVisible] = useState(false);
  const [list, setList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  useEffect(() => {
    setList(props.data||[]);
  }, [props.data]);

  function onBack() {
    setVisible(false);
    props.onClose();
  }

  function onPress(item) {
    const now = Date.now();
    if (now - lastTime < 1200) {
      return;
    }
    lastTime = now;
    navigation.navigate('LogDetailPage', {item});
  }

  function renderItem({item, index}) {
    const metStyle = item.method == 'GET' ? styles.method : styles.method2;
    const staStyle =
      item.code == 0 || item.code == 200 ? styles.status : styles.status2;
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
        </View>
        <Text style={styles.url} numberOfLines={2} ellipsizeMode="tail">
          <Text style={styles.time}>{item.time}s</Text> {item.url}
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
          <View style={styles.headerBtn} />
        </View>
        <FlatList style={styles.flat} data={list} renderItem={renderItem} />
      </View>
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
    flexDirection: 'row',
  },
  staBox: {
    width: 52,
  },
  method: {
    fontSize: 14,
    color: '#3478F6',
  },
  method2: {
    fontSize: 14,
    color: '#FF7D00',
  },
  status: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#00C261',
  },
  status2: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#FF2626',
  },
  url: {
    flex: 1,
    fontSize: 14,
    color: '#323232',
    marginLeft: 6,
  },
  time: {
    fontSize: 12,
    color: '#00C261',
  },
});
export default LogModel;
