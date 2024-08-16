/**
 * Author: Meng
 * Date: 2024-08-12
 * Modify: 2024-08-12
 * Desc: 日志页面
 */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

function LogDetail(props) {
  const detail = props.data || {};
  console.log('-----> LogDetailPage ', detail);

  useEffect(() => {
    // console.log('-----> LogDetailPage ', props.route.params);
    // const item = props.data || {};
    // return () => {};
  }, [props.data]);

  function onBack() {
    props.onClose();
  }

  // 是否请求失败 fail
  function isOk() {
    return detail.code == 0 || detail.code == 200;
  }

  const metStyle = detail.method == 'GET' ? styles.method : styles.method2;
  const staStyle = isOk() ? styles.status : styles.status2;

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <Text style={styles.btnText}>关闭</Text>
        </TouchableOpacity>
        <Text style={styles.title}>日志详情</Text>
        <View style={styles.headerBtn} />
      </View>
      <View style={styles.topBox}>
        <Text style={metStyle}>{detail.method}</Text>
        <Text style={staStyle}>{detail.code}</Text>
        <Text style={styles.date}>{detail.date}</Text>
        <Text style={styles.time}>{detail.time}s</Text>
      </View>
      <Text style={styles.url} selectable>{detail.url}</Text>
      <ScrollView style={styles.scroll}>
        <Text style={styles.text} selectable>
          Headers: {JSON.stringify(detail.headers)}
        </Text>
        <Text style={styles.params} selectable>
          Params: {JSON.stringify(detail.params)}
        </Text>
        <Text style={styles.result} selectable>
          Response: {JSON.stringify(detail.data || {})}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    zIndex: 10,
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: 'white',
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
  scroll: {
    paddingHorizontal: 12,
  },
  text: {
    marginBottom: 12,
    fontSize: 14,
    color: '#232323',
  },
  topBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
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
  date: {
    flex: 1,
    fontSize: 13,
    color: '#232323',
  },
  time: {
    fontSize: 13,
    color: '#00C261',
  },
  url: {
    fontSize: 16,
    color: '#323232',
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  text: {
    marginBottom: 12,
    fontSize: 14,
    color: '#232323',
  },
  params: {
    marginBottom: 12,
    fontSize: 16,
    color: '#00C261',
  },
  result: {
    marginBottom: 12,
    fontSize: 16,
    color: '#3478F6',
  },
});
export default LogDetail;
