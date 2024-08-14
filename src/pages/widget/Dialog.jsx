/**
 * Author: Meng
 * Date: 2024-08-14
 * Modify: 2024-08-14
 * Desc: 
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AppDialog = () => {

  return (
    <View style={styles.layout}>
      <Text>加载中...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 0,
    height: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(255,160,0,0.7)',
    justifyContent: 'center',
  }
})
export default AppDialog;