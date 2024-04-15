/**
 * Author: Meng
 * Date: 2023-04-23
 * Desc: 选择日期picker
 * 
 * unit     显示单位
 * label    取值的key
 * index    默认选中项
 * items    数据列表
 * onChange 回调函数
 */

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const item_height = 36;
let row_num = 3; // 显示列数 -可设置在props中(赖)
export default class Picker extends React.Component {
  _scrollView = null;
  _isScroll = false;

  constructor(props) {
    super(props);

    row_num = props.column || 7; // 值为 3，5，7，9
    let curIndex = props.index || 0;
    const items = props.items || [];
    const valueKey = props.label || 'value';
    const curValue = props.value || '';
    const unit = props.unit || '';

    if (curValue?.length > 0) {
      items.forEach((e, index) => {
        if (typeof e == 'string' || typeof e == 'number') {
          if (e == curValue) {
            curIndex = index;
          }
        } else {
          if (e[valueKey] == curValue) {
            curIndex = index;
          }
        }
      });
    }

    this.state = { curIndex, valueKey, unit, items };
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    if (nextProps.items.length != nextState.items.length) {
      return nextProps;
    } else {
      return null
    }
  }

  // componentDidUpdate(prevProps, prevState) {}

  onChangeItem = (index) => {
    // console.log('onChangeItem=========>', index);
    if (this.props.onChange) {
      const item = this.state.items[index];
      this.props.onChange(item, index + 1);
    }
  }

  // 点击事件
  onPressItem = (idx) => {
    if (this._scrollView) {
      this._scrollView.scrollTo({ y: idx * item_height, animated: true });
      this.onChangeItem(idx);
    }
  }

  // 绑定
  bindRef = (view) => {
    this._scrollView = view;
    const curIndex = this.state.curIndex;
    if (view && curIndex > 0) {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        view.scrollTo({ y: curIndex * item_height, animated: true });
      }, 100);
    }
  }

  onScrolling = ({ nativeEvent }) => {
    // console.log(nativeEvent.contentOffset)
    const curIndex = Math.round(nativeEvent.contentOffset.y / item_height);
    this._isScroll = true;
    if (this.state.curIndex != curIndex) {
      this.setState({ curIndex });
      // console.log('onScrolling=========>', curIndex)
    }
  }

  onScrollEnd = (res) => {
    const nativeEvent = res.nativeEvent;
    const curIndex = Math.round(nativeEvent.contentOffset.y / item_height);
    if (this._isScroll) {
      this.setState({ curIndex });
      this.onChangeItem(curIndex);
      // console.log('onScrollEnd=========>', curIndex)
    }
    this._isScroll = false;
  }

  render() {
    const items = this.state.items;
    return (
      <View style={this.props.style || styles.picker}>
        <ScrollView
          ref={this.bindRef}
          style={styles.scroll(row_num)}
          bounces={false}
          snapToInterval={item_height}
          scrollEventThrottle={18}
          onScroll={this.onScrolling}
          onMomentumScrollEnd={this.onScrollEnd}
          showsVerticalScrollIndicator={false}>
          <View style={styles.emtity(row_num)} />
          {items.map(this.itemView)}
          <View style={styles.emtity(row_num)} />
        </ScrollView>
        <View style={styles.window(row_num)} pointerEvents='none' />
      </View>
    )
  }

  itemView = (item, index) => {
    const { curIndex, valueKey, unit } = this.state;
    const diff = Math.pow((curIndex - index) % row_num, 2);
    const style = curIndex == index ? styles.value2 : styles.value;
    // const diff2 = diff * diff;
    // const transform = [{ scale: 1 - 0.01 * diff }, { rotateX: `${diff * 3}deg` }];
    const transform = [{ rotateX: `${diff * 3}deg` }];
    const opacity = 1 - 0.1 * diff;
    const fontSize = 18 - Math.abs(curIndex - index);
    let value = null;
    if (typeof item == 'string' || typeof item == 'number') {
      value = item;
    } else {
      value = item[valueKey];
    }
    return (
      <TouchableOpacity key={value} style={styles.layout} activeOpacity={0.8} onPress={this.onPressItem.bind(this, index)}>
        <Text style={{ ...style, fontSize, opacity, transform }} numberOfLines={1} ellipsizeMode="clip">{value}{unit}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  picker: {
  },
  scroll: (num) => ({
    minHeight: item_height * num,
    maxHeight: item_height * num,
    paddingHorizontal: 16,
  }),
  emtity: (num) => ({
    height: item_height * (num - 1) / 2,
    minHeight: item_height * (num - 1) / 2
  }),
  window: (num) => ({
    width: '100%',
    height: item_height + 6,
    zIndex: 9,
    bottom: item_height * (num - 1) / 2 - 3,
    position: 'absolute',
    borderTopColor: '#efefef',
    borderBottomColor: '#efefef',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    // backgroundColor: '#ff009930'
  }),
  layout: {
    height: item_height,
    minHeight: item_height,
    justifyContent: 'center',
  },
  value: {
    textAlign: 'center',
    color: '#323232',
    fontSize: 17,
  },
  value2: {
    textAlign: 'center',
    color: '#232323',
    fontSize: 18,
  }
});