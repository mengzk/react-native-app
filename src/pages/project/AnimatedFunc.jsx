/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc:
 */

import React, {useRef, useState} from 'react';
import {View, Text, ScrollView, Animated, StyleSheet} from 'react-native';
const Project = props => {
  const scrollAnim = useRef(new Animated.Value(0));

  return (
    <View>
      <ScrollView
        nestedScrollEnabled
        scrollEventThrottle={100}
        onScroll={Animated.event([
          {nativeEvent: {contentOffset: {y: scrollAnim}}},
        ])}></ScrollView>
    </View>
  );
};
export default Project;
