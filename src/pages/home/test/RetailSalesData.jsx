/**
 * Author: Meng
 * Date: 2024-01-08
 * Modify: 2024-01-08
 * Desc:
 */

import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

import ResultIndex from './ResultIndex';
import ChooseCity from './ChooseCity';

export default class RetailSalesDataNew extends React.Component {
  render() {
    return (
      <View style={styles.page}>
        <ScrollView nestedScrollEnabled>
          {this.topSelectView()}
          <ResultIndex />
        </ScrollView>
        <ChooseCity />
      </View>
    );
  }

  topSelectView = () => {
    return (
      <View style={styles.topSelect}>
        <View style={styles.topView}>
          <Text>全部区域</Text>
        </View>

        <View style={styles.topView}>
          <Text>本月</Text>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  topSelect: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  topView: {
    flex: 1,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});
