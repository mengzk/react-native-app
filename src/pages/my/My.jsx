/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc:
 */

import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { CompatButton } from '../../components';
import { LiveComponent, HooksWidget} from '../../libs/hook_widget/index'
import MyModel from './MyModel';

export default class My extends LiveComponent {
  constructor(props) {
    super(props);
    this.liveModel = new MyModel()
    this.state = {
      date: Date.now(),
    };
  }

  onChangeDate = () => {
    this.setState({date: Date.now()})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>个人中心😯</Text>
        <HooksWidget data={this.liveModel.curDate} child={this.dateView}/>
        {this.dateView()}
      </View>
    );
  }

  dateView = (date) => {
    // const date = this.state.date;
    return <CompatButton onPress={this.liveModel.onchange}>
      <Text style={styles.date}>{date}</Text>
    </CompatButton>
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  date: {

    color: '#ff0099'
  }
})
