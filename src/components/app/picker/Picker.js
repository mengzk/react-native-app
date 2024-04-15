/**
 * Author: Meng
 * Date: 2023-03-23
 * Desc: 滑动picker
 * 
 * key    取值的key
 * index  默认选中项
 * items  数据列表
 * title  标题
 * onChange 回调函数
 */

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, StyleSheet } from 'react-native';
import SafeFooter from '../Common/SafeFooter';
import { getInset } from 'react-native-safe-area-view'

const { width } = Dimensions.get('screen');

let last_time = 0;
const item_height = 36;
export default class Picker extends React.PureComponent {
  _scrollView = null;

  constructor(props) {
    super(props);
    this.state = {
      title: props.title || '',
      curIndex: props.index || 0,
      valueKey: props.label || 'value',
      items: props.items || []
    }
    this.safeBottom = getInset('bottom');
  }

  onClose = (tag) => {
    if (Date.now() - last_time > 1200) {
      last_time = Date.now();
      if (this.props.onPress) {
        if (tag < 1) {
          this.props.onPress(null, -1);
        } else {
          const { curIndex, items } = this.state;
          this.props.onPress(items[curIndex], curIndex);
        }
      }
    }
  }

  // 点击事件
  onPressItem = (idx) => {
    if (this._scrollView) {
      this._scrollView.scrollTo({ y: idx * item_height, animated: true });
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
      }, 600);
    }
  }

  onScrolling = ({ nativeEvent }) => {
    // console.log(nativeEvent.contentOffset)
    const curIndex = Math.round(nativeEvent.contentOffset.y / item_height);
    this.setState({ curIndex })
  }

  onScrollEnd = (res) => {
    const nativeEvent = res.nativeEvent;
    // console.log(nativeEvent.contentOffset)
    const curIndex = Math.round(nativeEvent.contentOffset.y / item_height);
    this.setState({ curIndex })
  }

  render() {
    const { items, title } = this.state;
    return (
      <View style={styles.picker}>
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => this.onClose(-1)} />
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.onClose(-1)}>
              <Text style={styles.cancel}>取消</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{title || ''}</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.onClose(1)}>
              <Text style={styles.ok}>确认</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            ref={this.bindRef}
            style={styles.scroll}
            bounces={false}
            snapToInterval={item_height}
            scrollEventThrottle={18}
            onScroll={this.onScrolling}
            onMomentumScrollEnd={this.onScrollEnd}
            showsVerticalScrollIndicator={false}>
            <View style={styles.emtity} />
            {items.map(this.itemView)}
            <View style={styles.emtity} />
          </ScrollView>
          <SafeFooter />
          <View style={styles.window(this.safeBottom)} pointerEvents='none' />
        </View>
      </View>
    )
  }

  itemView = (item, index) => {
    const { curIndex, valueKey } = this.state;
    const diff = Math.pow((curIndex - index), 2);
    const style = curIndex == index ? styles.value2 : styles.value;
    // const diff2 = diff * diff;
    const transform = [{ scale: 1 - 0.03 * diff }, { rotateX: `${diff * 3}deg` }];
    let value = null;
    if (typeof item == 'string' || typeof item == 'number') {
      value = item;
    } else {
      value = item[valueKey];
    }
    return (
      <TouchableOpacity key={value} style={styles.layout} activeOpacity={0.8} onPress={this.onPressItem.bind(this, index)}>
        <Text style={{ ...style, transform }} numberOfLines={1} ellipsizeMode="clip">{value}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  picker: {
    width,
    height: '100%',
    position: 'absolute',
    zIndex: 997,
    backgroundColor: '#00000060'
  },
  content: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  header: {
    height: 48,
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'white',
    borderBottomColor: '#f3f3f3',
    borderBottomWidth: 1,

  },
  cancel: {
    color: '#323232',
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  title: {
    flex: 1,
    color: '#232323',
    fontSize: 18,
    // fontWeight: '700',
    textAlign: 'center'
  },
  ok: {
    color: '#3478F6',
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  scroll: {
    minHeight: item_height * 7,
    maxHeight: item_height * 7,
    paddingHorizontal: 16,
  },
  emtity: {
    height: item_height * 3,
    minHeight: item_height * 3
  },
  window: (safeBottom) => ({
    width,
    height: item_height + 6,
    zIndex: 9,
    bottom: item_height * 3 - 3 + safeBottom,
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
    color: '#676767',
    fontSize: 15,
    opacity: 0.6
  },
  value2: {
    textAlign: 'center',
    color: '#323232',
    fontSize: 15,
  }
});