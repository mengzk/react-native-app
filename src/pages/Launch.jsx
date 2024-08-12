/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc:
 */

import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
const Launch = () => {
  return (
    <View style={styles.container}>
      {/* <Image source={require('../../assets/launch.jpg')} /> */}
    </View>
  );
};
export default Launch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});