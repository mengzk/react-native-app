/**
 * Author: Meng
 * Date: 2024-08-12
 * Modify: 2024-08-12
 * Desc: 调试面板 -Model显示
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

import Configs from '../../../config/index';

let lastTime = 0;
function PanelModel(props) {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [curEnv, setCurEnv] = useState('');
  const envList = ['prod', 'uat', 'test', 'dev'];

  const list = [
    {title: '调试H5', tag: 1, path: ''},
    {title: '清除缓存', tag: 0, path: ''},
  ];

  useEffect(() => {
    setVisible(props.visible);
    setCurEnv(Configs.env);
  }, [props.visible]);

  // 返回
  function onBack() {
    setVisible(false);
    props.onClose();
  }

  // 切换环境
  function onCutEnv(env) {
    setCurEnv(env);
    Configs.setEnv(env);
    onBack();
    // 已登录,重新登录
    navigation.reset({index: 0, routes: [{name: 'Launch'}]});
  }

  // 点击事件
  function onPress(item) {
    const now = Date.now();
    if (now - lastTime < 1000) {
      return;
    }
    lastTime = now;
    if (item.path) {
      navigation.navigate(item.path);
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

  // 环境切换
  function envItem() {
    return (
      <View style={styles.item}>
        <Text style={styles.label}>点击切换环境</Text>
        {envList.map(item => {
          const select = curEnv == item;
          return (
            <TouchableOpacity
              key={item}
              activeOpacity={0.8}
              style={select ? styles.envbox : styles.envbox2}
              onPress={() => onCutEnv(item)}>
              <Text style={select ? styles.env : styles.env2}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
            <Text style={styles.btnText}>关闭</Text>
          </TouchableOpacity>
          <Text style={styles.title}>调试面板</Text>
          <View style={styles.headerBtn} />
        </View>
        {envItem()}
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
    flexDirection: 'row',
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#232323',
  },
  envbox: {
    marginLeft: 8,
    backgroundColor: '#3478F6',
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  envbox2: {
    marginLeft: 8,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  env: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  env2: {
    fontSize: 16,
    color: '#232323',
  },
});
export default PanelModel;
