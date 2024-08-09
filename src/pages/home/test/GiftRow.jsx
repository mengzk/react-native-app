/**
 * Author: Meng
 * Date: 2024-08-10
 * Modify: 2024-08-10
 * Desc:
 */
import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

export default function GiftRow(props) {
  const goods = props.data || [1,2];

  function onClickGoods() {
    if (props.onClick) {
      props.onClick();
    }
  }

  function imgView(item, index) {
    if (index > 3) {
      return <></>;
    } else if (index == 3) {
      return (
        <View style={styles.count}>
          <Text>共</Text>
          <Text style={styles.num}>3</Text>
          <Text>件</Text>
        </View>
      );
    } else {
      return <Image style={styles.img} />;
    }
  }

  if (goods.length < 1) {
    return <></>;
  }

  return (
    <View style={styles.box}>
      <Text style={styles.tag}>赠</Text>
      <Text style={styles.label}>赠品</Text>
      <TouchableOpacity
        style={styles.list}
        activeOpacity={0.8}
        onPress={onClickGoods}>
        {goods.map(imgView)}
      </TouchableOpacity>
      <Image style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    minHeight: 48,
    paddingVertical: 8,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  tag: {
    width: 14,
    height: 14,
    lineHeight: 14,
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
    borderRadius: 2,
    backgroundColor: '#F53F3F',
  },
  label: {
    flex: 1,
    color: '#323232',
    fontSize: 14,
    marginLeft: 6,
  },
  list: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    minWidth: 180,
  },
  img: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginLeft: 8,
    backgroundColor: '#f3f3f3',
  },
  count: {
    color: '#323232',
    fontSize: 14,
    minHeight: 48,
    marginLeft: 8,
    lineHeight: 48,
  },
  num: {
    color: '#FF6600',
  },
  icon: {
    width: 16,
    height: 16,
    marginLeft: 4,
    backgroundColor: '#f3f3f3'
  },
});
