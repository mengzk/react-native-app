/**
 * Author: Meng
 * Date: 2022-09-27
 * Desc:
 */

import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Header, CompatButton} from '../../components';
import {LiveComponent, HooksWidget} from '../../libs/hook_widget/index'
import ProjectModel from './ProjectModel'

let store = null
const Project = () => {
  store = new ProjectModel();
  return <LiveComponent liveModel={store} children={renderVIew}/>  
};

function renderVIew() {

  return (
    <View style={styles.page}>
      <Header />
      <HooksWidget data={store.curDate} child={dateView}/>
      {dateView()}
    </View>
  );
}

function dateView(date) {
  return (
    <CompatButton onPress={store.onChangeDate}>
      <Text style={styles.date}>{date}</Text>
    </CompatButton>
  );
}


const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  itemText: {
    lineHeight: 48,
  },
  date: {
    color: '#ff0099',
  },
});

export default Project;
