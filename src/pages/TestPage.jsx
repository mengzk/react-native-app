/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc:
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import SelectDatePicker from '../components/SelectDatePicker'

const TestPage = () => {

  return (
    <View style={styles.page}>
      <SelectDatePicker />
    </View>
  );
};



const styles = StyleSheet.create({
  page: {
    flex: 1
  }
})
export default TestPage;