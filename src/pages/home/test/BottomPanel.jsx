/**
 * Author: Meng
 * Date: 2024-08-10
 * Modify: 2024-08-10
 * Desc:
 */

import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  View,
  Modal,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

let List3 = [
  {id: 0, value: '觉得就卡', group: '二部经理', select: false},
  {id: 1, value: '啊是放', group: '啊啥', select: false},
  {id: 2, value: '啊是', group: '二部经理', select: false},
  {id: 3, value: '啊啥的', group: '啊思考', select: false},
  {id: 4, value: '啊哦哦', group: '测试', select: false},
  {id: 5, value: '哦看看', group: '哦哎', select: false},
  {id: 5, value: '你好好', group: '开发', select: false},
  {id: 6, value: '柔软', group: '算法', select: false},
  {id: 7, value: '是的风', group: '阿斯顿', select: false},
  {id: 8, value: '是滴哦', group: '啊啥', select: false},
  {id: 9, value: '睥睨哦', group: '说的', select: false},
];

function BottomPanel(props, ref) {
  //
  useImperativeHandle(ref, refMethod, []);

  useEffect(() => {
    // 回显
  }, [props.data]);

  //
  const [visible, setVisible] = useState(false);

  function refMethod() {
    return {
      show() {
        setVisible(true);
      },
      hide() {
        setVisible(false);
      },
    };
  }

  function onCommit() {
    setVisible(false);
  }


  function itemView({item, index}) {
    const checkIc = item.select ? styles.checkIc : styles.checkIc2;
    return (
      <TouchableOpacity
        key={item.id + item.value}
        style={styles.staff}
        activeOpacity={0.8}
        onPress={() => onChooseUser(item)}>
        <View style={styles.userIc} />
        <Text style={styles.name}>{item.value}</Text>
        <Text style={styles.userRole}>{item.group}</Text>
        <View style={checkIc} />
      </TouchableOpacity>
    );
  }

  return (
    <Modal animationType="fade" visible={visible} transparent={true}>
      <View style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>助手面板</Text>
          <TouchableOpacity
            style={styles.close}
            onPress={() => setVisible(false)}>
            {/* <Image style={styles.closeIc} /> */}
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.flat}
          data={userList}
          renderItem={itemView}
          ItemSeparatorComponent={<View style={styles.flatLine} />}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  page: {
    top: 0,
    left: 0,
    zIndex: 97,
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'flex-end',
    backgroundColor: '#00000090',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: 48,
  },
  title: {
    color: '#232323',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 48,
    flex: 1,
  },
  close: {
    width: 48,
    paddingVertical: 8,
    paddingRight: 16,
    alignItems: 'flex-end',
  },
  closeIc: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F2F3F5',
  },
  
  flat: {
    maxHeight: '64%',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },

  flatLine: {
    height: 1,
    backgroundColor: '#f3f3f3',
  },
  staff: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 16,
    marginTop: 16,
  },
  userIc: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#232323',
  },
  flex: {
    flex: 1,
  },
  name: {
    color: '#1D2129',
    fontSize: 14,
    lineHeight: 20,
    marginHorizontal: 7,
  },
  userRole: {
    color: '#456899',
    fontSize: 12,
    paddingHorizontal: 4,
    lineHeight: 20,
    borderRadius: 4,
    backgroundColor: '#F5F7FF',
  },
  checkIc: {
    width: 20,
    height: 20,
    marginLeft: 'auto',
    backgroundColor: '#232323',
  },
  checkIc2: {
    width: 20,
    height: 20,
    marginLeft: 'auto',
    borderColor: '#323232',
    borderWidth: 1,
  },

});

export default forwardRef(BottomPanel);
