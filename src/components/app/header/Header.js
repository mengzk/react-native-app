/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc:
 * 注意：这里顶部返回键未做返回上一页
 * 下面有实现方式但注释了
 */

import React from 'react';
import {
  View,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
// import { useNavigation } from '@react-navigation/native';

let last_time = 0;
const { width } = Dimensions.get('window');

const Header = props => {
  let barHeight = props.translucent ? (StatusBar.currentHeight || 26) : 0;

  const style = {
    ...styles.box,
    height: styles.box.height + barHeight,
    paddingTop: barHeight,
    backgroundColor: props.backgroundColor || styles.box.backgroundColor,
  };

  const rightBtns = props.rightBtns || [];

  const backStyle = { ...styles.action };
  const btnsStyle = { ...styles.action, justifyContent: 'flex-end' };
  let titleStyle = { ...styles.title };
  if (props.titleStyle) {
    titleStyle == props.titleStyle;
  }
  if (rightBtns.length > 1) {
    const btnsWidth = width - 110 * rightBtns.length;
    titleStyle.maxWidth = btnsWidth;
    titleStyle.minWidth = btnsWidth;
    btnsStyle.flex = 1;
    backStyle.flex = 1;
  } else {
    titleStyle.flex = 1;
    btnsStyle.width = 64;
    backStyle.width = 64;
    btnsStyle.minWidth = 64;
  }

  return (
    <>
      <StatusBar
        barStyle={props.barTheme || 'dark-content'}
        backgroundColor={props.backgroundColor || '#FFFFFF'}
        translucent={props.translucent}
      />
      <View style={style}>
        <View style={backStyle}>
          {props.left || LeftBack(props)}
        </View>
        <Text style={titleStyle} numberOfLines={1} ellipsizeMode="tail">
          {props.title || 'React Native App'}
        </Text>
        <View style={btnsStyle}>{rightBtns.map(rightBtnView)}</View>
      </View>
    </>
  );
};

// 返回键
const LeftBack = (props) => {
  // const navigate = useNavigation();
  return (
    <TouchableOpacity
      style={styles.back}
      onPress={() => {
        if (Date.now - last_time > 1200) {
          // navigate.goBack();
          last_time = Date.now();
          if(props.onBack) {
            props.onBack();
          }
        }
      }}>
      <Image
        style={styles.img}
        source={props.leftIcon}
      />
    </TouchableOpacity>
  );
};

// 右边菜单
const rightBtnView = (item, index) => {
  let image = item.icon;
  let style = null;
  if (!image) {
    style = item.style ? item.style : styles.text;
  }

  return (
    <TouchableOpacity key={index} style={styles.rightBtn} activeOpacity={0.7} onPress={item.onPress}>
      {!image && <Text style={style}>{item.name}</Text>}
      {image != null && <Image style={styles.btnIc} source={image} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    width: '100%',
    maxWidth: '100%',
    height: 48,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    color: '#101010',
    fontWeight: '500',
    textAlign: 'center',
    backfaceVisibility: '#ff0099'
  },
  action: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 16,
  },
  back: {
    height: 48,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightBtn: {
    paddingHorizontal: 6,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 26,
    height: 26,
  },
  text: {
    color: '#323232',
    fontSize: 14
  },
  btnIc: {
    width: 26,
    height: 26,
  }
});

export default Header;
