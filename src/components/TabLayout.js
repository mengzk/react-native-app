/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc:
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';

// interface Props {
//   tabs: string[];
//   modes?: string[]; // 点击标签的标记-用于收集统计
//   index?: number;
//   useEvent?: string;
//   onTabChange?: (index: number, tab?: string) => void;
// }

const { width } = Dimensions.get('screen');

const TabLayout = (props) => {
  const [position, setPosition] = useState(props.index || 0);
  // const height = (StatusBar.currentHeight || 26) + 48;
  const tabs = props.tabs || [];
  let lastTime = 0;

  if (props.useEvent) {
    useEffect(() => {
     
      return function clear() {
      };
    });
  }

  function onPress(tab, index) {
    if (Date.now() - lastTime > 1200) {
      if (index != position) {
        if (props.onTabChange) {
          props.onTabChange(index, tab);
        }
        setPosition(index);
      }
    } else {
      return;
    }
    lastTime = Date.now();
  }

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.box}>
      <View style={styles.layout}>
        {tabs.map((tab, index) => {
          const isFocused = position == index;
          return (
            <TouchableOpacity
              key={tab}
              style={styles.view}
              activeOpacity={0.8}
              onPress={() => onPress(tab, index)}>
              <Text style={isFocused ? styles.selected : styles.select}>
                {tab}
              </Text>
              {isFocused ? <View style={styles.line} /> : <></>}
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  box: {
    width,
    maxWidth: width,
    minHeight: 44,
    maxHeight: 44,
    backgroundColor: 'white',
  },
  layout: {
    minWidth: width,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  view: {
    // minWidth: '18%',
    height: 44,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    width: '70%',
    height: 3,
    bottom: 2,
    borderRadius: 2,
    position: 'absolute',
    backgroundColor: '#1677FF',
  },
  select: {
    color: '#101010',
    fontSize: 14,
  },
  selected: {
    color: '#101010',
    fontWeight: '500',
    fontSize: 16,
  },
});

export const TabEvent = 'TabLayout_Event';
export default TabLayout;
