/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: SheetPicker
 * 
 * label   取值的key
 * items   数据列表
 * onPress 回调函数
 */

import React from 'react';
import { View, Text, Modal, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import SafeFooter from '../Common/SafeFooter';
import { getInset } from 'react-native-safe-area-view'

const { width } = Dimensions.get('screen');

let last_time = 0;

export default class OneSheetPicker extends React.PureComponent {

  constructor(props) {
    super(props);

    const items = props.items || [];
    const valueKey = props.label || 'value';

    this.state = {
      valueKey,
      items
    }
    this.safeBottom = getInset('bottom');
  }

  onPressItem = (idx) => {
    if (Date.now() - last_time > 1200) {
      last_time = Date.now();
      if (this.props.onPress) {
        if (idx < 0) {
          this.props.onPress(null, -1);
        } else {
          const items = this.state.items;
          this.props.onPress(items[idx], idx);
        }
      }
    }
  }


  render() {
    const items = this.state.items;
    return (
      <Modal animationType="fade" transparent={true}>
        <View style={styles.picker}>
          <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={this.onPressItem.bind(this, -1)} />
          <View style={styles.content}>
            {items.map(this.itemView)}
            <TouchableOpacity style={styles.cancelBox} activeOpacity={0.8} onPress={this.onPressItem.bind(this, -1)}>
              <Text style={styles.cancel}>取消</Text>
            </TouchableOpacity>
            <SafeFooter />
          </View>
        </View>
      </Modal>
    )
  }

  itemView = (item, index) => {
    const valueKey = this.state.valueKey;
    let value = null;
    if (typeof item == 'string' || typeof item == 'number') {
      value = item;
    } else {
      value = item[valueKey];
    }
    return (
      <TouchableOpacity key={value} style={styles.layout} activeOpacity={0.8} onPress={this.onPressItem.bind(this, index)}>
        <Text style={styles.value}>{value}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  picker: {
    width,
    height: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 997,
    backgroundColor: '#00000060'
  },
  content: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: 350,
  },
  cancelBox: {
    height: 49,
    minHeight: 49,
    borderTopWidth: 4,
    justifyContent: 'center',
    borderTopColor: '#f3f3f3',

  },
  cancel: {
    textAlign: 'center',
    color: '#3478F6',
    fontSize: 14,
  },
  layout: {
    height: 49,
    minHeight: 49,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    borderBottomColor: '#f3f3f3',
  },
  value: {
    textAlign: 'center',
    color: '#323232',
    fontSize: 14,
  },
});
