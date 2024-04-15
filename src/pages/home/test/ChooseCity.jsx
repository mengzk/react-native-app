/**
 * Author: Meng
 * Date: 2023-11-02
 * Modify: 2023-11-02
 * Desc:
 */

import React from 'react';
import {
  View,
  Modal,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';

const {width, height} = Dimensions.get('screen');

export default class ChooseCity extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      cityId: 0,
      shopId: 0,
      visible: true,
      tabList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      cityList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13],
      shopList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 11, 12, 13, 14, 15, 16],
    };
  }

  componentDidMount() {
    // 获取默认值
  }

  show = () => {
    this.setState({visible: true});
  };

  hide = () => {
    this.setState({visible: false});
  };

  onChangeTab = tabIndex => {
    if (this.state.tabIndex != tabIndex) {
      this.setState({tabIndex});
    }
  };

  onChooseCity = city => {
    const cityId = this.state.cityId == city ? -1 : city;
    this.setState({cityId});
  };

  onChooseShop = shop => {
    const shopId = this.state.shopId == shop ? -1 : shop;
    this.setState({shopId});
  };

  onReset = () => {
    this.setState({tabIndex: 0, cityId: 0, shopId: 0});
  };

  onCommit = () => {
    const {tabIndex, cityId, shopId} = this.state;
    console.log(tabIndex, cityId, shopId);
  };

  render() {
    const {tabList, cityList, shopList, visible} = this.state;

    return (
      <Modal animationType="slide" visible={visible} transparent={true}>
        <View style={styles.page}>
          <View style={styles.box}>
            <FlatList
              style={styles.tabList}
              data={tabList}
              renderItem={this.tabView}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={styles.flatLine} />}
            />
            <FlatList
              style={styles.flat}
              data={cityList}
              renderItem={this.cityView}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={styles.flatLine} />}
            />
            <FlatList
              style={styles.flat2}
              data={shopList}
              renderItem={this.shopView}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={styles.flatLine} />}
            />
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.reset}
              activeOpacity={0.8}
              onPress={this.onReset}>
              <Text style={styles.resetStr}>重置</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ok}
              activeOpacity={0.9}
              onPress={this.onCommit}>
              <Text style={styles.okStr}>确定</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  tabView = ({item, index}) => {
    const select = this.state.tabIndex == index;
    const tabStyle = select ? styles.tab2 : styles.tab;
    const textStyle = select ? styles.tabText2 : styles.tabText;
    return (
      <TouchableOpacity
        key={index}
        style={tabStyle}
        onPress={this.onChangeTab.bind(this, index)}
        activeOpacity={0.8}>
        {select ? <View style={styles.tabInd} /> : <></>}
        <Text style={textStyle}>上海一起</Text>
      </TouchableOpacity>
    );
  };

  cityView = ({item, index}) => {
    const select = this.state.cityId == index;
    const tabStyle = select ? styles.city : styles.shop;
    const textStyle = select ? styles.tabText3 : styles.tabText;
    return (
      <TouchableOpacity
        key={index}
        style={tabStyle}
        activeOpacity={0.8}
        onPress={this.onChooseCity.bind(this, index)}>
        <Text style={textStyle}>换届选举啊</Text>
      </TouchableOpacity>
    );
  };

  shopView = ({item, index}) => {
    const select = this.state.shopId == index;
    const textStyle = select ? styles.tabText3 : styles.tabText;
    return (
      <TouchableOpacity
        key={index}
        style={styles.shop}
        activeOpacity={0.8}
        onPress={this.onChooseShop.bind(this, index)}>
        <Text style={textStyle}>换届选举啊</Text>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  page: {
    top: 0,
    left: 0,
    zIndex: 97,
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'flex-start',
    backgroundColor: '#00000090',
  },
  box: {
    width,
    height: '70%',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  tabList: {
    width: 103,
    minWidth: 103,
    maxWidth: 103,
    backgroundColor: '#EEF1FD',
  },
  tab: {
    height: 56,
    paddingRight: 9,
    alignItems: 'center',
    flexDirection: 'row',
  },
  tab2: {
    height: 56,
    paddingRight: 9,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#F5F7FF',
  },
  tabInd: {
    width: 3,
    height: 14,
    backgroundColor: '#3478F6',
  },

  tabText: {color: '#1D2129', fontSize: 16, marginLeft: 16},
  tabText2: {color: '#3478F6', fontSize: 16, fontWeight: '700', marginLeft: 13},
  tabText3: {color: '#3478F6', fontSize: 16, fontWeight: '700', marginLeft: 16},

  flat: {
    width: 103,
    minWidth: 103,
    maxWidth: 103,
    backgroundColor: '#F5F7FF',
  },
  flat2: {
    flex: 1,
    backgroundColor: 'white',
  },
  city: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
    minHeight: 56,
    backgroundColor: '#ffffff',
  },
  shop: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
    minHeight: 56,
  },
  value: {
    color: '#232323',
    fontSize: 16,
    fontWeight: '700',
  },
  checkIc: {
    width: 20,
    height: 20,
    minWidth: 20,
    backgroundColor: '#232323',
  },
  checkIc2: {
    width: 20,
    height: 20,
    minWidth: 20,
    borderColor: '#323232',
    borderWidth: 1,
  },
  footer: {
    width,
    height: 72,
    gap: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  reset: {
    flex: 1,
    height: 40,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F7FF',
  },
  ok: {
    flex: 1,
    height: 40,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3478F6',
  },
  resetStr: {
    color: '#3478F6',
    fontSize: 16,
  },
  okStr: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
