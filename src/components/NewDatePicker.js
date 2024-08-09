/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 选择日期picker
 * 
 * chooseMode   本日本周本月自定义
 * start        开始时间
 * end          结束时间
 * title        标题
 * onChange     回调函数
 */

import React from 'react';
import { View, Text, Modal, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import SafeFooter from '../Common/SafeFooter';
import Picker from './Picker';

const { width } = Dimensions.get('screen');
let last_time = 0;
let picker_width = (width - 64) / 3;
const month_list = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

export default class NewDatePicker extends React.PureComponent {
  _scrollView = null;

  constructor(props) {
    super(props);

    const date = new Date();
    const dayList = [];
    let curYear = date.getFullYear().toString();
    let curMonth = this.formatNum(date.getMonth() + 1);
    let curDay = this.formatNum(date.getDate());

    if (props.date) {
      const dates = props.date.split('-');
      curYear = dates[0];
      curMonth = dates[1];
      curDay = dates[2];
    }
    const endYear = parseInt(curYear) + 6;
    const startYear = parseInt(curYear) - 15;
    const yearList = [];
    for (let i = startYear; i < endYear; i++) {
      yearList.push(i);
    }

    const days = this.getDays(curYear, curMonth);
    for (let i = 1; i <= days; i++) {
      dayList.push(this.formatNum(i));
    }

    this.state = {
      title: props.title || '',
      curDate: [curYear, curMonth, curDay],
      curDay,
      dayList,
      yearList
    }
  }

  onClose = (tag) => {
    if (Date.now() - last_time > 1200) {
      last_time = Date.now();
      if (this.props.onChange) {
        if (tag > 0) {
          const { curDate } = this.state;
          const dateStr = curDate.join('-');
          this.props.onChange({ dateStr, curDate });
        } else {
          this.props.onChange(null);
        }
      }
    }
  }

  getDays = (year, month) => {
    const yearInt = parseInt(year);
    switch (month) {
      case '01':
      case '03':
      case '05':
      case '07':
      case '08':
      case '10':
      case '12':
        return 31;
      case '02':
        return (yearInt % 4 == 0 && yearInt % 100 != 0 || yearInt % 400 == 0) ? 29 : 28;;
      case '04':
      case '06':
      case '09':
      case '11':
        return 30;
    }
  }

  formatNum = (num) => {
    return `${num > 9 ? '' : '0'}${num}`;
  }

  onChangeYear = (year) => {
    const { curDate } = this.state;

    const days = this.getDays(year, curDate[1]);
    const dayList = [];
    for (let i = 1; i <= days; i++) {
      dayList.push(this.formatNum(i));
    }
    let curDay = this.state.curDay;
    if (curDay >= dayList.length) {
      curDay = dayList.length;
    }
    curDate[0] = year;
    curDate[2] = curDay;
    this.setState({ dayList, curDate, curDay });
  }

  onChangeMonth = (month) => {
    const { curDate } = this.state;

    const days = this.getDays(curDate[0], month);
    const dayList = [];
    for (let i = 1; i <= days; i++) {
      dayList.push(this.formatNum(i));
    }
    let curDay = this.state.curDay;
    if (curDay >= dayList.length) {
      curDay = dayList.length;
    }
    curDate[1] = month;
    curDate[2] = curDay;
    this.setState({ dayList, curDate, curDay });
  }

  onChangeDay = (curDay) => {
    const { curDate } = this.state;
    curDate[2] = curDay;
    this.setState({ curDate, curDay });
  }

  render() {
    const { title, curDate, dayList, yearList } = this.state;
    return (
      <Modal animationType="fade" transparent={true}>
        <View style={styles.picker}>
          <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => this.onClose(-1)} />
          <View style={styles.content}>
            <View style={styles.header}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => this.onClose(-1)}>
                <Text style={styles.cancel}>取消</Text>
              </TouchableOpacity>
              <Text style={styles.title}>{title || '请选择日期'}</Text>
              <TouchableOpacity activeOpacity={0.8} onPress={() => this.onClose(1)}>
                <Text style={styles.ok}>确认</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.pickerRow}>
              <Picker style={styles.col} value={curDate[0]} unit='年' items={yearList} onChange={this.onChangeYear} />
              <Picker style={styles.col} value={curDate[1]} unit='月' items={month_list} onChange={this.onChangeMonth} />
              <Picker style={styles.col} value={curDate[2]} unit='日' items={dayList} onChange={this.onChangeDay} />
            </View>
            <SafeFooter />
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  picker: {
    width,
    height: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 997,
    backgroundColor: '#00000060'
  },
  row: {
    marginBottom: 15,
    flexDirection: 'row',
  },
  row2: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  pickerRow: {
    justifyContent: 'center',
    flexDirection: 'row'
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
  line: {
    width: 14,
    height: 2,
    backgroundColor: '#979797'
  },
  col: {
    width: picker_width,
  },
  select: (on) => ({
    height: 28,
    paddingHorizontal: 22,
    borderRadius: 3,
    marginRight: 14,

    lineHeight: 28,
    color: on ? '#3478F6' : '#676767',
    textAlign: 'center',
    backgroundColor: on ? '#F3F7FB' : 'white',
    borderColor: on ? '#3478F6' : '#e3e3e3',
    borderWidth: 1,
  }),
  select2: (on) => ({
    height: 32,
    paddingHorizontal: 28,
    borderRadius: 4,

    lineHeight: 32,
    color: on ? '#3478F6' : '#676767',
    textAlign: 'center',
    backgroundColor: on ? '#F3F7FB' : 'white',
    borderColor: on ? '#3478F6' : '#e3e3e3',
    borderWidth: 1,
  }),
  labelStr: {
    color: '#979797',
    fontSize: 14,
    marginVertical: 14
  },
  colmon: {
    marginHorizontal: 16,
  }
});