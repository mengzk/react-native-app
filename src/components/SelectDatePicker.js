/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc:
 */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import AppDatePicker from './AppDatePicker'

function getDateDay() {
  const date = new Date();
  const year = date.getFullYear();
  const month = formatNum(date.getMonth() + 1);
  const day = formatNum(date.getDate());
  let hour = date.getHours();
  let hour2 = date.getHours();
  const minu = date.getMinutes();
  let min = Math.ceil(minu / 5) * 5;
  let min2 = min;

  const str = `${year}年${month}月${day}日`;

  if (min > 54) {
    min = 0;
    min2 = 30;
    hour += 1;
    hour2 += 1;
  } else if (min > 24) {
    // min += 5;
    min2 = min2 - 30;
    hour2 += 1;
  } else {
    min += 5;
    min2 += 35;
  }

  return {
    date: str,
    startTime: `${formatNum(hour)}:${formatNum(min)}`,
    endTime: `${formatNum(hour2)}:${formatNum(min2)}`,
    value: ''
  }
}

function formatNum(num) {
  return (num > 9 ? '' : '0') + num;
}

// ===-=-=-=-=-=-=-=-=-=-==-=-
const {width} = Dimensions.get('window')

const SelectDatePicker = (props) => {

  const [mode, setMode] = useState(0);
  const [selectDate, setSelectDate] = useState(getDateDay());

  // 选择的日期
  function onChangeDate({ month, day, hour, min, hour2, min2 }) {
    const data = { ...selectDate };
    if (mode == 0) {
      data.date = month + formatNum(day) + '日';
    } else {
      data.startTime = formatNum(hour) + ':' + formatNum(min);
      data.endTime = formatNum(hour2) + ':' + formatNum(min2);
    }
    setSelectDate(data);
  }

  function onChangeMode() {
    setMode(0);
  }

  function onChangeMode2() {
    setMode(1);
  }

  function onPressAction(mode = 0) {
   
    const start = selectDate.startTime.replace(':', '');
    const end = selectDate.endTime.replace(':', '');
    if (parseInt(start) >= parseInt(end)) {
      // 开始时间大于结束时间

      return;
    }
    if (props.onChange) {
      selectDate.value = `${selectDate.date} ${selectDate.startTime} - ${selectDate.endTime}`;
      props.onChange(mode, selectDate);
    }
    console.log(selectDate)
  }

  function labelView(tag) {
    const isEnd = tag == 1;
    //  const color = curTag == tag ? { color: '#FFFFFF' } : {};
    const { startTime, endTime } = selectDate;

    return (
      <View style={styles.label}>
        <Text style={styles.labelText}>{isEnd ? '结束时间' : '开始时间'}</Text>
        <Text style={styles.timeText}> {isEnd ? endTime : startTime}</Text>
      </View>
    )
  }

  return (
    <View style={styles.box}>
      <View style={styles.flex} />
      <View style={styles.topbox}>
        <TouchableOpacity style={styles.action} onPress={() => onPressAction(0)}>
          <Text style={styles.cancelbtn}>取消</Text>
        </TouchableOpacity>
        <Text style={styles.title}>选择日期</Text>
        <TouchableOpacity style={styles.action} onPress={() => onPressAction(1)}>
          <Text style={styles.okbtn}>确定</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity activeOpacity={1} onPress={onChangeMode}>
        <Text style={styles.date}>{selectDate.date}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row} activeOpacity={1} onPress={onChangeMode2}>
        {labelView(0)}
        <View style={styles.line} />
        {labelView(1)}
      </TouchableOpacity>
      <AppDatePicker key={mode+'ksj'} mode={mode} onChangeDate={onChangeDate} />
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  flex: {
    flex: 1,
    backgroundColor: '#00000030'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  topbox: {
    // paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  action: {
    height: 48,
    paddingHorizontal: 16,
    // alignItems: 'center',
    justifyContent: 'center'
  },
  okbtn: {
    color: '#ED782F',
    fontSize: 16,
    fontWeight: '500'
  },
  title: {
    color: '#232323',
    fontSize: 18,
    // fontWeight: '500'
  },
  cancelbtn: {
    color: '#323232',
    fontSize: 16,
  },
  date: {
    color: '#232323',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 50,
    textAlign: 'center',
    backgroundColor: 'white'
  },
  label: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    //  backgroundColor: '#ED782F'
  },
  labelText: {
    color: '#636363',
    fontSize: 14,
  },
  timeText: {
    //  width: 96,
    color: '#232323',
    fontSize: 22,
    fontWeight: '600',
    paddingRight: 4,
    // backgroundColor: 'red'
  },
  line: {
    width: width/5,
    height: 1.5,
    backgroundColor: '#acacac'
  }
})

export default SelectDatePicker;
