/**
 * Author: Meng
 * Date: 2024-08-10
 * Modify: 2024-08-10
 * Desc: 品类购买情况
 */

import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

// import RetailImages from '../../../Assets/Retail/index';
import {CompatButton} from '../../../components/index';

const {width} = Dimensions.get('window');
const boxWidth = width - 64 - 84;
const ScaleList = [100000000, 10000000, 1000000, 100000, 10000, 1000, 100];

function CategoryBuy(props) {
  const itemList = props.items || [
    {
      categoryName: '深的',
      avgAmountPerson: 182,
      thresholdAmount: 300,
      finishRate: 50,
    },
    {
      categoryName: '阿三开的卡',
      avgAmountPerson: 754,
      thresholdAmount: 350,
      finishRate: 120,
    },
    {
      categoryName: '阿四大队撒',
      avgAmountPerson: 631,
      thresholdAmount: 530,
      finishRate: 110,
    },
    {
      categoryName: '深的2',
      avgAmountPerson: 326,
      thresholdAmount: 300,
      finishRate: 102,
    },
    {
      categoryName: '阿三开的',
      avgAmountPerson: 283,
      thresholdAmount: 350,
      finishRate: 82,
    },
    {
      categoryName: '阿四大队',
      avgAmountPerson: 502,
      thresholdAmount: 530,
      finishRate: 97,
    },
    {
      categoryName: '深的3',
      avgAmountPerson: 543,
      thresholdAmount: 300,
      finishRate: 150,
    },
    {
      categoryName: '阿三开',
      avgAmountPerson: 342,
      thresholdAmount: 350,
      finishRate: 97,
    },
    {
      categoryName: '阿四sd',
      avgAmountPerson: 167,
      thresholdAmount: 530,
      finishRate: 46,
    },
  ];
  const [pressItem, setPressItem] = useState(null);
  const [aixList, setAixList] = useState([0, 20, 40, 60, 80, 100]);
  // const [tagValue, setTagValue] = useState({tag: 1, value: 1});
  const timer = useRef(0);
  const maxNum = useRef(0);
  const defTitle = props.title || '品类购买情况';

  useEffect(() => {
    let max = 0;
    itemList.forEach(e => {
      max = Math.max(max, e.avgAmountPerson, e.thresholdAmount);
    });
    maxNum.current = max;
    const scale = getScale(max / 5);
    setAixList(aixList.map((_, index) => index * scale));
  }, [props.items]);

  // 获取刻度尺
  function getScale(num) {
    for (let index = 0; index < ScaleList.length; index++) {
      const scale = ScaleList[index];
      if (num > scale) {
        let isEnd = false;
        for (let inx = 2; inx < 10; inx++) {
          if (num < inx * scale) {
            isEnd = true;
            return inx * scale;
          }
        }
      }
    }
    return num;
  }

  // 查看诊断详情
  function gotoDiagnose() {}

  // 点击显示数据
  function onPressItem(item, index) {
    if (timer.current > 0) {
      clearTimeout(timer.current);
    }
    let top = (Math.min(index, itemList.length - 2) - 1) * 30;
    item.top = top > 0 ? top : 0;
    setPressItem(item);
    timer.current = setTimeout(() => {
      clearTimeout(timer.current);
      setPressItem(null);
    }, 3000);
  }

  // 行项目
  function rankView(item, index) {
    let value = item.thresholdAmount || 0;
    const finishRate = item.finishRate > 100 ? 100 : item.finishRate;
    if (value > 0) {
      value = Math.round((value * 100) / maxNum.current) || 1;
    }
    const isSelect = pressItem?.categoryName === item.categoryName;
    return (
      <TouchableOpacity
        key={item.categoryName + index}
        style={styles.item}
        activeOpacity={0.9}
        onPress={() => onPressItem(item, index)}>
        <View style={styles.nameBox}>
          {item.tag ? <Text style={styles.lowTag}>{item.tag}</Text> : <></>}
          <Text style={styles.itemName} numberOfLines={1} ellipsizeMode="tail">
            {item.categoryName}
          </Text>
        </View>

        <View style={isSelect ? styles.lineWidth2 : styles.lineWidth}>
          <View style={{...styles.tagBg, width: `${value}%`}} />
          <View style={{...styles.lineBg, width: `${finishRate}%`}} />
        </View>
      </TouchableOpacity>
    );
  }

  function aixView(num, index) {
    return (
      <Text key={num} style={styles.aixStr}>
        {num}
      </Text>
    );
  }

  function yLineView(num, index) {
    return <View key={index} style={styles.yLineView} />;
  }

  function PressItemView() {
    const top = pressItem.top || 0;
    return (
      <View style={{...styles.press, top}}>
        <Text style={styles.pressTitle}>{pressItem.categoryName}</Text>
        <Text style={styles.pressStr}>个人: {pressItem.avgAmountPerson}</Text>
        <Text style={styles.pressStr}>目标: {pressItem.thresholdAmount}</Text>
        <Text style={styles.pressStr}>完成度: {pressItem.finishRate}%</Text>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>{defTitle}</Text>
        <CompatButton style={styles.selectBox} onPress={gotoDiagnose}>
          <Text style={styles.select}>诊断详情</Text>
          {/* <Image style={styles.nextIc} source={RetailImages.right_arrow} /> */}
        </CompatButton>
      </View>

      <View style={styles.chart}>
        {/* 指引线 */}
        <View style={styles.yLine}>
          <View style={styles.nameBox} />
          {aixList.map(yLineView)}
          <View style={styles.yLineRight} />
        </View>

        {itemList.map(rankView)}

        {/* 坐标轴 */}
        <View style={styles.row}>
          <View style={styles.nameBox} />
          {aixList.map(aixView)}
        </View>

        {pressItem ? <PressItemView /> : <></>}
      </View>

      <View style={styles.diagnose}>
        <Text style={styles.diagnoseTitle}>诊断建议：</Text>
        <Text style={styles.diagnoseDesc}>
          <Text style={styles.diagnoseAlert}>装饰建材、卫浴</Text>
          ，在品类购买完成度中偏低，需重点关注
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    borderRadius: 12,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  row: {
    marginBottom: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
  titleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 8,
    marginTop: 6,
  },
  title: {
    flex: 1,
    lineHeight: 20,
    fontSize: 16,
    fontWeight: '700',
    color: '#232323',
  },
  chart: {
    marginTop: 10,
  },
  item: {
    zIndex: 1,
    height: 30,
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectBox: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
    marginLeft: 12,
  },
  select: {
    fontSize: 14,
    color: '#676767',
  },
  nextIc: {
    width: 16,
    height: 16,
  },
  nameBox: {
    width: 84,
    maxWidth: 84,
    paddingRight: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // backgroundColor: '#f3f3f3',
  },
  lowTag: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 2,
    marginRight: 2,
    backgroundColor: '#F53F3F',

    color: '#F2453A',
    fontSize: 10,
  },
  itemName: {
    color: '#323232',
    fontSize: 12,
    maxWidth: 60,
  },
  lineWidth: {
    opacity: 0.7,
    // width: 200,
    width: boxWidth,
    maxWidth: boxWidth,
    // paddingVertical: 6,
    // backgroundColor: '#F3F3F3',
  },
  lineWidth2: {
    opacity: 1,
    // width: 200,
    width: boxWidth,
    maxWidth: boxWidth,
    // paddingVertical: 6,
    backgroundColor: '#FFF8EC',
  },
  tagBg: {
    width: boxWidth * 0.6,
    height: 10,
    top: 0,
    left: 0,
    marginVertical: 6,
    position: 'absolute',
    backgroundColor: '#E3E3E3',
  },
  lineBg: {
    width: 100,
    height: 10,
    marginVertical: 6,
    backgroundColor: '#3478F6',
  },
  aixStr: {
    flex: 1,
    color: '#232323',
    fontSize: 12,
    textAlign: 'left',
  },
  yLine: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    paddingBottom: 30,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: '#ff660060'
  },
  yLineView: {
    flex: 1,
    height: '100%',
    borderLeftWidth: 1,
    borderLeftColor: '#f3f3f3',
    // backgroundColor: '#f3f3f3'
  },
  yLineRight: {
    width: 1,
    height: '100%',
    backgroundColor: '#f3f3f3',
  },
  press: {
    top: 0,
    left: 120,
    zIndex: 9,
    minWidth: 78,
    minHeight: 72,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    position: 'absolute',
    backgroundColor: '#000000B0',
  },
  pressTitle: {
    color: 'white',
    fontSize: 14,
    lineHeight: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  pressStr: {
    color: 'white',
    fontSize: 12,
    lineHeight: 16,
  },
  diagnose: {
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginBottom: 14,
    backgroundColor: '#FFF6F5',
  },
  diagnoseTitle: {
    color: '#232323',
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 20,
  },
  diagnoseDesc: {
    color: '#676767',
    fontSize: 12,
    lineHeight: 20,
  },
  diagnoseAlert: {
    color: '#F53F3F',
    // backgroundColor: '#ff0066'
  },
});

export default CategoryBuy;
