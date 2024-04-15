/**
 * Author: Meng
 * Date: 2023-11-02
 * Modify: 2023-11-02
 * Desc:
 */

import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  View,
  Modal,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

function ChooseUser(props, ref) {
  //
  useImperativeHandle(ref, refMethod, []);

  useEffect(() => {}, []);

  //
  const [visible, setVisible] = useState(false);
  const [userList, setUserList] = useState([]);

  const callRef = useRef(null);
  const listRef = useRef([]);

  function refMethod() {
    return {
      show(list, callback) {
        setUserList(list);
        setVisible(true);
        listRef.current = list;
        callRef.current = callback;
      },
      hide() {
        setVisible(false);
      },
    };
  }

  function onCommit() {
    const list = userList.filter(e => e.select);
    console.log(list);
    if (props.onChange) {
      props.onChange(list);
    }
    if (callRef.current) {
      callRef.current(list);
    }
    setVisible(false);
  }

  // 选择人员
  function onChooseUser(item) {
    item.select = !item.select;
    setUserList(userList.concat([]));
  }

  function onSearchName(key) {
    console.log(key);
    const propsData = listRef.current || [];
    const list = propsData.filter(e => e.value.indexOf(key) > -1);
    setUserList(list);
  }

  function staffView({item, index}) {
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
    <Modal animationType="slide" visible={visible} transparent={true}>
      <View style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>选择需要@的人</Text>
          <TouchableOpacity
            style={styles.close}
            onPress={() => setVisible(false)}>
            <Image style={styles.closeIc} />
          </TouchableOpacity>
        </View>
        <View style={styles.search}>
          <View style={styles.input}>
            <Image style={styles.searchIc} />
            <TextInput
              style={styles.inputStr}
              maxLength={20}
              placeholderTextColor="#979797"
              placeholder="输入姓名模糊搜索"
              onChangeText={onSearchName}
            />
          </View>
        </View>
        <FlatList
          style={styles.flat}
          data={userList}
          renderItem={staffView}
          ItemSeparatorComponent={<View style={styles.flatLine} />}
        />
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={() => setVisible(false)}>
            <Text style={styles.cancel}>取消</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={onCommit}>
            <Text style={styles.ok}>提交</Text>
          </TouchableOpacity>
        </View>
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
  search: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  searchIc: {
    width: 16,
    height: 16,
    marginLeft: 12,
    marginRight: 8,
    backgroundColor: '#e3e3e3',
  },
  input: {
    height: 44,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F3F5',
  },
  inputStr: {
    color: '#232323',
    fontSize: 14,
    flex: 1,
  },
  flat: {
    maxHeight: '60%',
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

  footer: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  btn: {
    flex: 1,
    marginHorizontal: 6,
  },
  cancel: {
    height: 38,
    lineHeight: 38,
    textAlign: 'center',
    color: '#3478F6',
    fontSize: 15,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#3478F6',
  },
  ok: {
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    borderRadius: 4,
    backgroundColor: '#3478F6',
  },
});

export default forwardRef(ChooseUser);
