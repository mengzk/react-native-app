/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 
 */
import React from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';

const { width } = Dimensions.get('window');
// Props {
//   style?: object; //
//   value?: string; //
//   placeholder?: string; //
// }
let lastTime = 0;
const ThemeAlert = (props) => {

  function onPress(index) {
    if (Date.now() - lastTime < 1200) {
      return;
    }
    lastTime = Date.now();
    props.onPress && props.onPress(index);
  }

  return (
    <Modal transparent={true} animationType='none'>
      <View style={styles.alert} onTouchEnd={() => onPress(0)}>
        <View style={styles.content} pointerEvents='box-none'>
          <Text style={styles.title}>{props.title || '温馨提示'}</Text>

          <ScrollView nestedScrollEnabled style={styles.msgBox}>
            <Text style={styles.msg}>{props.msg || ''}</Text>
          </ScrollView>

          <View style={styles.actions}>
            {props.onlyOk ? <></> : <TouchableOpacity style={styles.action} activeOpacity={0.8} onPress={() => onPress(0)}>
              <Text style={styles.cancel}>{props.cancel || '取消'}</Text>
            </TouchableOpacity>}
            <TouchableOpacity style={styles.action} activeOpacity={0.8} onPress={() => onPress(1)}>
              <Text style={styles.btn}>{props.ok || '确定'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  alert: {
    position: 'absolute',
    bottom: 0,
    zIndex: 998,
    width,
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#00000060',
  },
  content: {
    borderRadius: 12,
    marginHorizontal: 24,
    backgroundColor: 'white',
  },
  title: {
    height: 50,
    lineHeight: 50,
    color: '#232323',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  msgBox: {
    maxHeight: 120,
    marginHorizontal: 16,
  },
  msg: {
    color: '#676767',
    fontSize: 14,
    textAlign:'center'
  },
  actions: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderTopColor: '#efefef',
    borderTopWidth: 1
  },
  action: {
    flex: 1,
    maxWidth: 160,
    height: 52,
    marginHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancel: {
    color: '#676767',
    fontSize: 16,
  },
  btn: {
    color: '#3478F6',
    fontSize: 16,
  }
});


export default ThemeAlert;