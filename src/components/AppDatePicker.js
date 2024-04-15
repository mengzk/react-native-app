/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc:
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppPicker from './AppPicker'

// 获取对应月份天数
function getDayNum(year, month) {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    case 2:
      return (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) ? 29 : 28;
  }
}

// 获取年月
function getMonths() {
  const months = [];
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  for (let index = -6; index < 6; index++) {
    const mon = month + index;
    if (mon < 0) {
      months.push(`${year - 1}年${formatNum(month + index + 12)}月`);
    } else if (mon > 12) {
      months.push(`${year + 1}年${formatNum(month + index - 12)}月`);
    } else {
      months.push(`${year}年${formatNum(month + index)}月`);
    }
  }
  return months;
}

// 根据年月获取天数
function getDays(date) {
  const days = [];
  let size = 31;
  if (date) {
    const dates = date.split('年');
    size = getDayNum(parseInt(dates[0]), parseInt(dates[1]))
  }
  for (let index = 1; index <= size; index++) {
    days.push(`${formatNum(index)}日`);
  }
  return days;
}

// 获取时间
function getHours() {
  const hours = [];
  for (let index = 0; index < 24; index++) {
    hours.push(`${formatNum(index)}时`);
  }
  return hours;
}

// 获取分钟
function getMins() {
  const mins = [];
  for (let index = 0; index < 12; index++) {
    mins.push(`${formatNum(index * 5)}分`);
  }
  mins.push('59分');
  return mins;
}

// 获取当前时间位置
function getDateIndex() {
  const date = new Date();
  const day = date.getDate() - 1;
  let hour = date.getHours();
  let hour2 = date.getHours();
  const min = Math.ceil(date.getMinutes() / 5);
  hour += date.getMinutes() > 55 ? 1 : 0;
  hour2 += date.getMinutes() > 25 ? 1 : 0;
  const min2 = Math.ceil((date.getMinutes() - 30) / 5);
  return { day, hour, min, hour2, min2 };
}
//
function formatNum(num) {
  return (num > 9 ? '' : '0') + num;
}
// 
function parseData({ month, day, hour, min, hour2, min2 }) {
  SELECT_DATE.month = month;
  SELECT_DATE.day = day;
  SELECT_DATE.hour = hour;
  SELECT_DATE.hour2 = hour2;
  SELECT_DATE.min = min;
  SELECT_DATE.min2 = min2;
  let str = month.replace('年', '-');
  str = str.replace('月', '-');
  SELECT_DATE.date = `${str}${formatNum(day)} ${formatNum(hour)}:${formatNum(min)}:00`
}
// 全部替换key需要替换的字符 key1新的字符
function replaceAll(value = '', key, key2) {
  return value.replace(new RegExp(key, 'gm'), key2);
}

// 选择的时间
const SELECT_DATE = {
  month: '',
  date: '',
  day: 1,
  hour: 12,
  hour2: 12,
  min: 0,
  min2: 0,
};

export function getSelectDate() {
  return SELECT_DATE;
}

// 
class AppDatePicker extends React.PureComponent {

  constructor(props) {
    super(props);

    const { day, hour, min, hour2, min2 } = getDateIndex();

    const months = getMonths();
    const days = getDays();
    const hours = getHours();
    const mins = getMins();

    this.state = {
      curDays: days,
      day,
      hour,
      hour2,
      min,
      min2,
      months,
      hours,
      mins
    }
  }

  componentDidMount() {
    const { day, hour, min, months, curDays, hours, mins } = this.state;
    const hour1 = parseInt(hours[hour]);
    const min1 = parseInt(mins[min]);
    parseData({ month: months[6], day: parseInt(curDays[day]), hour: hour1, min: min1, hour2: hour1, min2: min1, })
  }

  onChange = () => {
    if (this.props.onChangeDate) {
      parseData(SELECT_DATE);
      this.props.onChangeDate(SELECT_DATE)
    }
  }

  // 选择的月份
  onChangeMonth = (_, date) => {
    SELECT_DATE.month = date;
    this.onChange();
    const dayList = getDays(date);
    this.setState({
      curDays: dayList
    })
  }

  // 选择的哪天
  onChangeDay = (_, day) => {
    // console.log(day)
    SELECT_DATE.day = parseInt(day);
    this.onChange();
  }

  // 选择的小时
  onChangeHour = (_, hour) => {
    // console.log(hour)
    SELECT_DATE.hour = parseInt(hour);
    this.onChange();
  }

  // 选择的分钟
  onChangeMin = (_, min) => {
    // console.log(min)
    SELECT_DATE.min = parseInt(min);
    this.onChange();
  }

  // 选择的小时
  onChangeHour2 = (_, hour) => {
    // console.log(hour)
    SELECT_DATE.hour2 = parseInt(hour);
    this.onChange();
  }

  // 选择的分钟
  onChangeMin2 = (_, min) => {
    // console.log(min)
    SELECT_DATE.min2 = parseInt(min);
    this.onChange();
  }

  render() {

    return (
      <View key={this.props.key || 'lkalkdkj12123'} style={styles.box}>
        {this.getPicker()}
      </View>
    )
  }

  getPicker = () => {
    const { day, hour, min, hour2, min2, months, curDays, hours, mins } = this.state;
    const mode = this.props.mode;
    if (mode == 0) {
      return (
        <>
          <AppPicker row={2} index={6} data={months} onChange={this.onChangeMonth} />
          <AppPicker row={2} index={day} data={curDays} onChange={this.onChangeDay} />
        </>
      );
    } else if (mode == 1) {
      return (
        <>
          <AppPicker row={5} index={hour} data={hours} onChange={this.onChangeHour} />
          <AppPicker row={5} index={min} data={mins} onChange={this.onChangeMin} />
          <Text style={styles.line}>至</Text>
          <AppPicker row={5} index={hour2} data={hours} onChange={this.onChangeHour2} />
          <AppPicker row={5} index={min2} data={mins} onChange={this.onChangeMin2} />
        </>
      );
    } else if (mode == 2) {
      return (
        <>
          <AppPicker row={3} index={6} data={months} onChange={this.onChangeMonth} />
          <AppPicker row={4} index={day} data={curDays} onChange={this.onChangeDay} />
          <AppPicker row={5} index={hour} data={hours} onChange={this.onChangeHour} />
          <AppPicker row={5} index={min} data={mins} onChange={this.onChangeMin} />
        </>
      );
    }
  }
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  line: {
    //  width: 40,
    flex: 1,
    color: '#232323',
    fontSize: 16,
    textAlign: 'center'
  }
})

export default AppDatePicker;
