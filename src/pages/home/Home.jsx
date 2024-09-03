/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc:
 */

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Header, CompatButton, ListView} from '../../components/index';
import {example} from '../../modules/apis/index';

const list = [
  '调试面板',
  'WebPage',
  '拍照/录像',
  'MoveView',
  'Search',
  'TabLayout',
  'SafeFooter',
];
const rightBtns = [{name: '菜单', onPress: () => {}}];

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  onItemPress = (item, index) => {
    let path = '';

    switch (index) {
      case 0:
        path = 'TestPage';
        break;
      case 1:
        path = 'WebPage';
        break;
      case 2:
        path = 'CameraPage';
        break;
      case 3:
        path = '';
        break;
      default:
        break;
    }
    if (path) {
      this.props.navigation.navigate({
        name: path,
        params: {item},
      });
    } else {
      this.openPicker();
    }
  };

  openPicker = () => {
    console.log('openPicker');
    example();
  };

  render() {
    return (
      <View style={styles.page}>
        <Header title="很长很长很长的标题" rightBtns={rightBtns} />
        <ListView style={styles.list} data={list} renderItem={this.itemView} />
        {/* <CategoryBuy /> */}
      </View>
    );
  }

  itemView = ({item, index}) => {
    return (
      <CompatButton
        style={styles.item}
        onPress={() => this.onItemPress(item, index)}>
        <Text style={styles.text}>{item}</Text>
      </CompatButton>
    );
  };
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    // paddingHorizontal: 16,
  },
  alertBox: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#00000030',
  },
  numBg: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  countText: {
    color: '#232323',
    fontSize: 120,
    lineHeight: 126,
    fontWeight: 'bold',
  },
  list: {
    height: '100%',
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  text: {
    color: '#232323',
    fontSize: 16,
  },
  date: {
    color: '#FF0099',
    textAlign: 'center',
  },
});

export default Home;
