/**
 * Author: Meng
 * Date: 2024-08-12
 * Modify: 2024-08-12
 * Desc: 调试面板 -Model显示
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Modal,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

let lastTime = 0;
function PanelModel(props) {
  const [visible, setVisible] = useState(false);

  const list = [
    {title: '切换环境', tag: 0, path: ''},
    {title: '调试H5', tag: 1, path: ''},
    {title: '打开日志', tag: 0, path: 'LogPage'},
    {title: '清除缓存', tag: 0, path: ''},
  ];

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  function onBack() {
    setVisible(false);
    props.onClose();
  }

  function onPress(item) {
    const now = Date.now();
    if (now - lastTime < 1000) {
      return;
    }
    lastTime = now;
    if (item.path) {
      props.navigation.navigate(item.path);
    }
  }

  function renderItem({item, index}) {
    return (
      <TouchableOpacity
        key={index}
        style={styles.item}
        activeOpacity={0.7}
        onPress={() => onPress(item)}>
        <Text style={styles.label}>{item.title}</Text>
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
          <Text style={styles.title}>调试面板</Text>
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
    paddingTop: 8,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 1,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
    color: '#232323',
  },
});
export default PanelModel;
