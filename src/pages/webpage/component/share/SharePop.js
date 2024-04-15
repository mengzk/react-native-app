/**
 * Author: Meng
 * Date: 2023-
 * Desc: 分享弹窗, 注意视图层级 zindex
 *    onPress?: (index, tag) => void;
 */

import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const share_items = [
  { name: '微信', tag: 'wechat', icon: '' },
  { name: '图片', tag: 'photo', icon: '' },
  { name: '链接', tag: 'link', icon: '' },
];

const SharePop = props => {
  function onPress(index) {
    if (props.onPress) {
      const item = index > -1 ? share_items[index] : {};
      props.onPress(index, item.tag);
    }
  }

  function itemView(item, index) {
    return (
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.7}
        onPress={() => onPress(index)}>
        <Image style={styles.itemIc} source={item.icon} />
        <Text style={styles.itemName}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.share}>
      <TouchableOpacity
        style={styles.mark}
        activeOpacity={1}
        onPress={() => onPress(-1)}
      />
      <View style={styles.pop}>{share_items.map(itemView)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  share: {
    position: 'absolute',
    bottom: 0,
    zIndex: 997,
    width,
    height,
    backgroundColor: '#00000060',
  },
  mark: {
    flex: 1,
    width,
  },
  pop: {
    width,
    height: 200,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: 'white',
  },
  item: {
    flex: 1,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemIc: {
    width: 56,
    height: 56,
    marginBottom: 6,
    // borderRadius: 16,
    backgroundColor: '#f3f3f3',
  },
  itemName: {
    color: '#323232',
    fontSize: 14,
  },
});

export default SharePop;
