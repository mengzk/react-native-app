/**
 * Author: Meng
 * Date: 2024-01-08
 * Modify: 2024-01-08
 * Desc:
 */
import React, { useState } from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

function ResultIndex(props) {
  const [curIndex, setCurIndex] = useState(0);
  const list = props.data || [{label: '销售额', value: 940}, {label: '完成率', value: 40}, {label: '订单数', value: 90}, {label: '支付数', value: 94}, {label: '门店扫码数', value: 30}];

  function itemView(item, index) {
    const styles3 = curIndex == item.value ? styles.itemView2:styles.itemView;
    return (
      <TouchableOpacity key={index} style={styles3} onPress={() => setCurIndex(item.value)}>
        <Text style={styles.itemLabel}>{item.label}</Text>
        <Text style={styles.itemValue}>
          {item.value} <Text style={styles.unit}>万元</Text>
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <View style={styles.point} />
        <Text style={styles.label}>结果指标</Text>
        <View style={styles.leftIcon} />
        <Text style={styles.date}>更新时间：2020200202</Text>
      </View>
      <View style={{alignItems: 'center', marginBottom: 20}}>
        <Text style={styles.itemLabel}>目标额:</Text>
        <Text style={styles.itemValue}>
          9999.99 <Text style={styles.unit}>万元</Text>
        </Text>
      </View>
      <View style={styles.itemBox}>{list.slice(0, 2).map(itemView)}</View>
      <View style={{height: 10}} />
      <View style={styles.itemBox}>{list.slice(2, 5).map(itemView)}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
    marginHorizontal: 10,
    paddingBottom: 20,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  header: {
    marginTop: 17,
    marginBottom: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },
  point: {
    width: 10,
    height: 10,
    minWidth: 10,
    borderWidth: 2,
    borderRadius: 5,
    marginRight: 8,
    borderColor: '#FF9E01',
  },
  leftIcon: {
    width: 12,
    height: 12,
    minWidth: 12,
    marginLeft: 4,
    backgroundColor: '#FF9E01',
  },
  label: {
    color: '#323232',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
  date: {
    flex: 1,
    color: '#989898',
    fontSize: 12,
    textAlign: 'right',
  },
  itemLabel: {
    color: '#86909C',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 17,
  },
  itemLabel2: {
    color: '#86909C',
    fontSize: 12,
    lineHeight: 17,
  },
  itemValue: {
    color: '#1D2129',
    fontSize: 24,
    lineHeight: 28,
    marginTop: 6,
    fontWeight: '700',
  },
  unit: {
    fontSize: 12,
    lineHeight: 28,
  },
  itemBox: {
    flexDirection: 'row',
    gap: 8,
  },
  itemView: {
    flex: 1,
    height: 76,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#F7F9FF',
  },
  itemView2: {
    flex: 1,
    height: 76,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#F7F9FF',
    borderWidth: 1.5,
    borderColor: '#3478F6'
  },
});

export default ResultIndex;
