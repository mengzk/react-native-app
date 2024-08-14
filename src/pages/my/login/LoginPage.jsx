/**
 * Author: Meng
 * Date: 2024-08-14
 * Modify: 2024-08-14
 * Desc: 
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import UserStore from '../../../modules/store/user';

const LoginPage = (props) => {

  useEffect(() => {
    const account = UserStore.getAccount();
    // 回显用户名, 如果自动登录, 则直接登录
  }, []);

  return (
    <View style={styles.page}>
      <Text>加载中...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  }
})
export default LoginPage;