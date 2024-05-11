/**
 * Author: Meng
 * Date: 2024-01-10
 * Desc: 选择日期View
 * 
 * start        开始时间
 * end          结束时间
 * title        标题
 * onChange     回调函数
 */

import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Picker from './Picker';

const { width } = Dimensions.get('screen');
let picker_width = (width - 64) / 3;
const month_list = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

export default class DateSelectView extends React.PureComponent {
  _scrollView = null;
  lastDate = '';

  constructor(props) {
    super(props);
    this.state = {
      defDate: props.date||'',
      curDate: [],
      curDay: '01',
      dayList: [],
      yearList: []
    }
  }

  componentDidMount() {
    this.onReset(this.props.date);
  }

  onReset = (defDate) => {
    const date = new Date();
    const dayList = [];
    let curYear = date.getFullYear().toString();
    let curMonth = this.formatNum(date.getMonth() + 1);
    let curDay = this.formatNum(date.getDate());

    const endYear = date.getFullYear() + 10;
    const startYear = endYear - 20;
    const yearList = [];
    for (let i = startYear; i < endYear; i++) {
      yearList.push(i);
    }

    if (defDate) {
      const dates = defDate.split('-');
      curYear = dates[0];
      curMonth = dates[1];
      curDay = dates[2];
    }
    // console.log(curYear, curMonth, curDay)

    const days = this.getDays(curYear, curMonth);
    for (let i = 1; i <= days; i++) {
      dayList.push(this.formatNum(i));
    }

    this.setState({
      curDate: [curYear, curMonth, curDay],
      defDate,
      curDay,
      dayList,
      yearList,
    });
  }

  onChange = () => {
    if (this.props.onChange) {
      const { curDate } = this.state;
      const dateStr = curDate.join('-');
      if (dateStr == this.lastDate) {
        return;
      }
      this.lastDate = dateStr;
      this.props.onChange({ dateStr, curDate });
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
    this.setState({ dayList, curDate, curDay }, this.onChange);
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
    this.setState({ dayList, curDate, curDay }, this.onChange);
  }

  onChangeDay = (curDay) => {
    const { curDate } = this.state;
    curDate[2] = curDay;
    this.setState({ curDate, curDay }, this.onChange);
  }

  render() {
    const { defDate, curDate, dayList, yearList } = this.state;
    if(yearList.length < 1) {
      return<></>;
    }else {
      return (
        <View key={defDate} style={styles.layout}>
          <Picker style={styles.col} column={5} value={curDate[0]} unit='年' items={yearList} onChange={this.onChangeYear} />
          <Picker style={styles.col} column={5} value={curDate[1]} unit='月' items={month_list} onChange={this.onChangeMonth} />
          <Picker style={styles.col} column={5} value={curDate[2]} unit='日' items={dayList} onChange={this.onChangeDay} />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  layout: {
    justifyContent: 'center',
    flexDirection: 'row',
    // maxHeight: 180,
  },
  col: {
    width: picker_width,
  },
});