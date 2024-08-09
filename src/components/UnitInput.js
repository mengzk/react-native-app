/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc:
 */
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const unitTexts = ['', '个', '十', '百', '千', '万', '十万', '百万', '千万', '亿', '十亿', '百亿', '千亿']
function UnitInput(props) {
  const [show, setShow] = useState(false);
  const [unit, setunit] = useState('');
  function onChangeText(e) {
    const num = parseInt(e).toString().length;
    if (num) {
      setunit(unitTexts[num]);
    }
    setShow(num > 3)
  }
  return (
    <View style={styles.box}>
      <TextInput style={styles.input} placeholder="请输入金额" onChangeText={onChangeText} />
      {show ? <View style={styles.unit}><Text style={styles.unitText}>{unit}</Text></View> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: 'row',
  },
  unit: {
    // width: 42,
    // height: 32,
    padding: 2,
    position: 'absolute',
    top: -16,
    // left: -4,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000E0',
  },
  unitText: {
    color: 'white',
    fontSize: 14,
    lineHeight: 16,
  },
  input: {
    flex: 1,
    fontSize: 34,
    // lineHeight: 38,
    margin: 0,
    padding: 0,
    color: '#101010',
  }
})

export default UnitInput;
