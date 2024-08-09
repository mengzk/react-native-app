/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc:
 */

import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
} from 'react-native';

// interface Props {
//   key?: string;
//   testID?: string;
//   // style?: object;
//   width?: number; // 宽度
//   row?: number; // 宽度的百分比（列数）
//   // column?: number; // 行数
//   // height?: number; // 高度
//   value?: any; // 默认值
//   data?: any[];
//   onChange?: (index: number, e: any) => void;
//   scrollStyle?: object;
//   onPress?: any;
//   selectTextStyle?: object;
// }

const { width } = Dimensions.get('window');
let lastIndex = null;
const AppPicker = (props) => {
  let isScroll = false;
  let column = 7; // 纠正高度
  const centerNum = 3; // 设置奇数位
  const vh = 40 * (centerNum * 2 + 1); // 设置高度
  const vw = props.width || Math.round(width / (props.row || 3)); // 设置宽度
  const datas = []; // 重新组装数据
  const list = props.data || []; // 真实数据

  // 记录位置
  // let initIndex = 3;
  const [position, setPosition] = useState(centerNum);

  for (let i = 0; i < column; i++) {
    if (i === centerNum) {
      datas.push(...list);
    } else {
      datas.push(null);
    }
  }

  useEffect(() => {
    lastIndex = null;
  }, [props.data]);

  // 滑动计算
  function onScroll(e) {
    if (!isScroll) {
      isScroll = true;
    }
    const y = e.nativeEvent.contentOffset.y + centerNum * 40;
    // 一下判断避免过度渲染
    const nextIndex = Math.round(y / 40);
    if (nextIndex != position) {
      setPosition(nextIndex);
    }
  }

  // 活动结束位置
  function onScrollEnd() {
    if (props.onChange && props.data) {
      const i = position - centerNum;
      const text = datas[position];
      if (lastIndex != text) {
        // console.log('=======> AppPicker onScrollEnd ', lastIndex, text)
        lastIndex = text;
        props.onChange(i, text);

      }
    }
  }

  function scrollTo(view) {
    const value = props.value;
    if (!isScroll) {
      let num = props.index || 0;
      if (value) {
        datas.forEach((e, index) => {
          if (value === e) {
            num = index - centerNum;
          }
        });
      }
      if (num > 0) {
        const timer = setTimeout(() => {
          clearTimeout(timer);
          view?.scrollTo({ x: 0, y: num * 40, animated: true });
        }, 100);
      }
    }
  }

  function itemView() {
    return datas.map((e, index) => {
      const isd = e != null;
      return (
        <View
          key={e || index + 'k'}
          style={[index === position ? itemStyle : itemStyle2]}>
          <Text
            onPress={index === position ? props.onPress : null}
            ellipsizeMode="tail"
            numberOfLines={1}
            style={[
              textStyle,
              index === position ? props.selectTextStyle : { color: '#232323' },
            ]}>{`${isd ? e : ''}`}</Text>
        </View>
      );
    });
  }

  return (
    <View
      key={props.key}
      style={{
        ...scrollStyle,
        width: vw,
        height: vh,
        maxHeight: vh,
        ...props.scrollStyle,
      }}>
      <ScrollView
        style={{ width: '100%' }}
        // onLayout={() => scrollTo(scrollView)}
        ref={scrollTo}
        bounces={false}
        snapToInterval={40}
        // pagingEnabled={true}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={onScrollEnd}
        showsVerticalScrollIndicator={false}>
        {itemView()}
      </ScrollView>
      <View style={lineStyle} pointerEvents="none" />
    </View>
  );
};

const scrollStyle = {
  width: 128,
  height: 256,
  maxHeight: 256,
  backgroundColor: '#FFF',
  justifyContent: 'center',
  alignItems: 'center',
};
const lineStyle = {
  width: '94%',
  height: 40,
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
  borderTopColor: '#eee',
  position: 'absolute',
};
const itemStyle = {
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
};
const itemStyle2 = {
  height: 40,
  opacity: 0.7,
  transform: [{ scale: 0.8 }],
  alignItems: 'center',
  justifyContent: 'center',
};
const textStyle = {
  color: '#232323',
  width: '100%',
  fontSize: 17,
  textAlign: 'center',
  fontWeight: '600',
};

export default AppPicker;
