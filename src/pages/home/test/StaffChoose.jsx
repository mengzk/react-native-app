/**
 * Author: Meng
 * Date: 2023-11-02
 * Modify: 2023-11-02
 * Desc:
 */

import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

export default class StaffChoose extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      staffId: 0,
      tabList: [1, 2, 3, 4, 5, 6],
      staffList: [1, 2, 3, 4, 5, 6],
    };
  }

  componentDidMount() {
    // 获取默认值
  }

  onChangeTab = tabIndex => {
    this.setState({tabIndex});
  };

  onChooseUser = staff => {
    const staffId = this.state.staffId == staff ? -1 : staff;

    this.setState({staffId});
  };

  render() {
    const {tabList, staffList} = this.state;

    return (
      <View style={styles.page}>
        <View style={styles.tabList}>{tabList.map(this.tabView)}</View>
        <FlatList
          style={styles.flat}
          data={staffList}
          renderItem={this.staffView}
          ItemSeparatorComponent={<View style={styles.flatLine} />}
        />
      </View>
    );
  }

  tabView = (item, index) => {
    const tabStyle = this.state.tabIndex == index ? styles.tab2 : styles.tab;
    const textStyle =
      this.state.tabIndex == index ? styles.tabText2 : styles.tabText;
    return (
      <TouchableOpacity
        key={index}
        style={tabStyle}
        onPress={this.onChangeTab.bind(this, index)}
        activeOpacity={0.8}>
        <Text style={textStyle}>hdksj1</Text>
      </TouchableOpacity>
    );
  };

  staffView = ({item, index}) => {
    if (index % 4 == 0) {
      return (
        <View key={index} style={styles.staff}>
          <Text style={styles.label}>换届选举啊</Text>
        </View>
      );
    } else {
      const checkIc =
        this.state.staffId == item ? styles.checkIc2 : styles.checkIc;
      return (
        <TouchableOpacity
          key={index}
          style={styles.staff}
          activeOpacity={0.8}
          onPress={this.onChooseUser.bind(this, item)}>
          <View style={styles.userIc} />
          <View style={styles.flex}>
            <Text style={styles.name}>啥地方</Text>
            <Text>10001231</Text>
          </View>
          <View style={checkIc} />
        </TouchableOpacity>
      );
    }
  };
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'row',
  },
  tabList: {
    width: 96,
    minWidth: 96,
    backgroundColor: '#F2F3F5',
  },
  tab: {
    height: 48,
    paddingHorizontal: 9,
    alignItems: 'center',
    flexDirection: 'row',
  },
  tab2: {
    height: 48,
    paddingHorizontal: 6,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderLeftColor: '#4A45FF',
    borderLeftWidth: 3,
  },
  tabText: {color: '#676767', fontSize: 14},
  tabText2: {color: '#4A45FF', fontSize: 16, fontWeight: '700'},
  flat: {
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  flatLine: {
    height: 1,
    backgroundColor: '#f3f3f3',
  },
  staff: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 16,
  },
  label: {
    color: '#232323',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 24,
  },
  userIc: {
    width: 32,
    height: 32,
    minWidth: 32,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: '#232323',
  },
  flex: {
    flex: 1,
  },
  name: {
    color: '#1e1e1e',
    fontSize: 15,
    lineHeight: 20,
  },
  staffNo: {
    color: '#979797',
    fontSize: 12,
    lineHeight: 14,
    marginTop: 3,
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
});
