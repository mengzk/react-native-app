/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc:
 */

import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Header, CompatButton} from '../../components';
import {LiveComponent, LiveWidget} from '../../libs/hook_widget/index'
import ProjectModel from './ProjectModel'

let store = null
const NewProject = () => {
  store = new ProjectModel();
  return <LiveComponent liveModel={store} children={renderVIew}/>  
};

function renderVIew() {

  return (
    <View style={styles.page}>
      <Header />
      <LiveWidget data={store.curDate} child={dateView}/>
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

export default NewProject;
