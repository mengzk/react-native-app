/**
 * Author: Meng
 * Date: 2024-08-12
 * Modify: 2024-08-12
 * Desc: 日志页面
 */
import React from 'react';
import {View, FlatList, TouchableOpacity, Text, StyleSheet} from 'react-native';

let lastTime = 0;
const LogPage = props => {
  const list = [
    {method: 'GET', status: 0, time: 0, url: 'http://bing.com/erwe/weq/ewqew/qrtertwerwwe/q/ewq/we/q/weq/we/qe/q', params: {}},
    {method: 'POST', status: 1, time: 0, url: 'http://bing.com/eqwrqweqweqe/we/qwerwerwerw/weq/we/qe/q', params: {}},
    {method: 'GET', status: 0, time: 0, url: 'http://bing.com/ererqerqweqweqewq/wewwerwrqrwerwe/q/weq/we/qe/q', params: {}},
    {method: 'GET', status: 0, time: 0, url: 'http://bing.com/asdasdaq/ewqew/qasasdwe/ewrwetq/ewq/we/q/weq/we/qe/q', params: {}},
  ];

  function onBack() {
    props.navigation.goBack();
  }

  function onPress(item) {
    const now = Date.now();
    if (now - lastTime < 1200) {
      return;
    }
    lastTime = now;
    console.log('onPress', item);
  }

  function renderItem({item, index}) {
    const metStyle = item.method === 'GET' ? styles.method : styles.method2;
    return (
      <TouchableOpacity
        key={index}
        style={styles.item}
        activeOpacity={0.7}
        onPress={() => onPress(item)}>
        <View style={styles.staBox}>
          <Text style={metStyle}>{item.method}</Text>
          <Text style={styles.status}>{item.status}</Text>
        </View>
        <Text style={styles.url} numberOfLines={2} ellipsizeMode="tail"><Text style={styles.time}>{item.time}S</Text> {item.url}</Text>
      </TouchableOpacity>
    );
  }

  return (
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
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  header: {
    height: 56,
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  staBox: {
    width: 60,
    alignItems: 'center',
  },
  method: {
    fontSize: 16,
    color: '#232323',
    fontWeight: 'bold',
  },
  method2: {
    fontSize: 16,
    color: '#FF6600',
    fontWeight: 'bold',
  },
  status: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FF0099',
  },
  url: {
    flex: 1,
    fontSize: 16,
    color: '#232323',
    marginLeft: 6,
  },
  time: {
    fontSize: 16,
    color: '#006699',
  },
});
export default LogPage;
