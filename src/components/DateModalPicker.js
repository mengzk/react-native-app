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
// 可以改成 for 当前时间 加减10 -没意义
const year_list = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];
const month_list = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const filter_dates = [{ id: 1, name: '今日', tag: 'today' }, { id: 2, name: '本周', tag: 'currentWeek' }, { id: 3, name: '本月', tag: 'currentMonth' }, { id: 4, name: '自定义', tag: 'custom' }];
export default class DateModalPicker extends React.PureComponent {
  _scrollView = null;

  constructor(props) {
    super(props);

    const date = new Date();
    const dayList = [];
    let curYear = date.getFullYear().toString();
    let curMonth = this.formatNum(date.getMonth() + 1);
    let curDay = this.formatNum(date.getDate());
    let curYear2 = curYear;
    let curMonth2 = curMonth;
    let curDay2 = curDay;

    if (props.start) {
      const dates = props.start.split('-');
      curYear = dates[0];
      curMonth = dates[1];
      curDay = dates[2];
    }

    if (props.end) {
      const dates = props.end.split('-');
      curYear2 = dates[0];
      curMonth2 = dates[1];
      curDay2 = dates[2];
    }

    const days = this.getDays(curYear, curMonth);
    for (let i = 1; i <= days; i++) {
      dayList.push(this.formatNum(i));
    }

    this.state = {
      title: props.title || '',
      chooseMode: props.mode || 1, // 
      curDate: [curYear, curMonth, curDay],
      curDate2: [curYear2, curMonth2, curDay2],
      // curYear,
      // curMonth,
      curDay,
      dayList,
    }
  }

  onClose = (tag) => {
    if (Date.now() - last_time > 1200) {
      last_time = Date.now();
      if (this.props.onChange) {
        if (tag > 0) {
          const { curDate, curDate2, chooseMode } = this.state;
          const startDate = chooseMode > 3 ? curDate.join('-') : '';
          const endDate = chooseMode > 3 ? curDate2.join('-') : '';
          const num = chooseMode > 3 ? 4 : chooseMode;
          this.props.onChange({ startDate, endDate, ...filter_dates[num-1] });
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

  onShowDialog = (chooseMode) => {
    const { curDate, curDate2, dayList } = this.state;
    const start = chooseMode == 4;
    let list = dayList;
    if (chooseMode > 3) {
      list = [];
      const days = this.getDays(start ? curDate[0] : curDate2[0], start ? curDate[1] : curDate2[1]);
      for (let i = 1; i <= days; i++) {
        list.push(this.formatNum(i));
      }
    }
    this.setState({ chooseMode, dayList: list, curDay: start ? curDate[2] : curDate2[2] });
  }

  onChangeYear = (year) => {
    const { curDate, curDate2, chooseMode } = this.state;

    const days = this.getDays(year, curDate[1]);
    const dayList = [];
    for (let i = 1; i <= days; i++) {
      dayList.push(this.formatNum(i));
    }
    let curDay = this.state.curDay;
    if (curDay >= dayList.length) {
      curDay = dayList.length;
    }
    if (chooseMode == 4) {
      curDate[0] = year;
      curDate[2] = curDay;
    } else {
      curDate2[0] = year;
      curDate2[2] = curDay;
    }
    this.setState({ dayList, curDate, curDate2, curDay });
  }

  onChangeMonth = (month) => {
    const { curDate, curDate2, chooseMode } = this.state;

    const days = this.getDays(curDate[0], month);
    const dayList = [];
    for (let i = 1; i <= days; i++) {
      dayList.push(this.formatNum(i));
    }
    let curDay = this.state.curDay;
    if (curDay >= dayList.length) {
      curDay = dayList.length;
    }
    if (chooseMode == 4) {
      curDate[1] = month;
      curDate[2] = curDay;
    } else {
      curDate2[1] = month;
      curDate2[2] = curDay;
    }
    this.setState({ dayList, curDate, curDate2, curDay });
  }

  onChangeDay = (curDay) => {
    const { curDate, curDate2, chooseMode } = this.state;
    if (chooseMode == 4) {
      curDate[2] = curDay;
    } else {
      curDate2[2] = curDay;
    }
    this.setState({ curDate, curDate2, curDay });
  }

  render() {
    const { title, curDate, curDate2, chooseMode, dayList } = this.state;
    const date1 = curDate.join('/');
    const date2 = curDate2.join('/');
    return (
      <Modal animationType="fade" transparent={true}>
        <View style={styles.picker}>
          <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => this.onClose(-1)} />
          <View style={styles.content}>
            <View style={styles.header}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => this.onClose(-1)}>
                <Text style={styles.cancel}>取消</Text>
              </TouchableOpacity>
              <Text style={styles.title}>{title || '请选择'}</Text>
              <TouchableOpacity activeOpacity={0.8} onPress={() => this.onClose(1)}>
                <Text style={styles.ok}>确认</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.colmon}>
              <Text style={styles.labelStr}>快捷筛选</Text>
              <View style={styles.row}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.onShowDialog(1)}>
                  <Text style={styles.select(chooseMode == 1)}>今日</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.onShowDialog(2)}>
                  <Text style={styles.select(chooseMode == 2)}>本周</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.onShowDialog(3)}>
                  <Text style={styles.select(chooseMode == 3)}>本月</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.labelStr}>自定义时间</Text>
              <View style={styles.row2}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.onShowDialog(4)}>
                  <Text style={styles.select2(chooseMode == 4)}>{date1}</Text>
                </TouchableOpacity>
                <View style={styles.line} />
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.onShowDialog(5)}>
                  <Text style={styles.select2(chooseMode == 5)}>{date2}</Text>
                </TouchableOpacity>
              </View>
            </View>
            {chooseMode > 3 ? <View key={`${chooseMode}`} style={styles.pickerRow}>
              <Picker style={styles.col} column={3} value={chooseMode == 4 ? curDate[0] : curDate2[0]} unit='年' items={year_list} onChange={this.onChangeYear} />
              <Picker style={styles.col} column={3} value={chooseMode == 4 ? curDate[1] : curDate2[1]} unit='月' items={month_list} onChange={this.onChangeMonth} />
              <Picker style={styles.col} column={3} value={chooseMode == 4 ? curDate[2] : curDate2[2]} unit='日' items={dayList} onChange={this.onChangeDay} />
            </View> : <></>}
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