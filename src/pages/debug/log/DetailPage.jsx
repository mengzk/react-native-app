/**
 * Author: Meng
 * Date: 2024-08-12
 * Modify: 2024-08-12
 * Desc: 日志页面
 */
import React, {useEffect, useState} from 'react';
import { View, Text , ScrollView,TouchableOpacity, StyleSheet } from 'react-native';

const LogDetailPage = (props) => {

  const [detail, setDetail] = useState({});

  useEffect(() => {
    console.log('-----> LogDetailPage ', props.route.params);
    const params = props.route.params;
    if(params && params.item) {
      setDetail(params.item);
    }
    // return () => {};
  }, []);

  function onBack() {
    props.navigation.goBack();
  }

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <Text style={styles.btnText}>返回</Text>
        </TouchableOpacity>
        <Text style={styles.title}>日志详情</Text>
        <View style={styles.headerBtn} />
      </View>

      <ScrollView style={styles.scroll}>
        <Text selectable>{JSON.stringify(detail)}</Text>
      </ScrollView>
    </View>
  );
};



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
  scroll: {

  }
})
export default LogDetailPage;