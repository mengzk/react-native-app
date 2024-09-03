/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 拍照/录像页面
 *
 */

import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

import AudioRecord from '../utils/AudioRecord';

function TestPage(props) {
  const audioRecord = useRef(new AudioRecord());

  useEffect(() => {}, []);

  function startRecord() {
    audioRecord.current.start();
  }
  function pauseRecord() {
    audioRecord.current.pause();
  }
  function resumeRecord() {
    audioRecord.current.resume();
  }
  function stopRecord() {
    audioRecord.current.stop();
  }


  return (
    <View style={styles.page}>

      <Button onPress={startRecord} title='录音'/>
      <Button onPress={pauseRecord} title='暂停' />
      <Button onPress={resumeRecord} title='继续' />
      <Button onPress={stopRecord} title='停止' />

    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
export default TestPage;
