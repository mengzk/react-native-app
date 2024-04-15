/**
 * Author: Meng
 * Date: 2023-12-19
 * Modify: 2023-12-19
 * Desc: 
 */
import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { Header } from '../../../components/index';
import ChooseUser from "./ChooseUser";

export default class AddRecord extends React.PureComponent {

  chooseRef = null;

  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      imgList: [],
      selectUser: [],
      userList: [
        { id: 0, value: '觉得就卡', group: '二部经理', select: false },
        { id: 1, value: '啊是放', group: '啊啥', select: false },
        { id: 2, value: '啊是', group: '二部经理', select: false },
        { id: 3, value: '啊啥的', group: '啊思考', select: false },
        { id: 4, value: '啊哦哦', group: '测试', select: false },
        { id: 5, value: '哦看看', group: '哦哎', select: false },
        { id: 5, value: '你好好', group: '开发', select: false },
        { id: 6, value: '柔软', group: '算法', select: false },
        { id: 7, value: '是的风', group: '阿斯顿', select: false },
        { id: 8, value: '是滴哦', group: '啊啥', select: false },
        { id: 9, value: '睥睨哦', group: '说的', select: false },
      ]
    };
  }

  componentDidMount() {
    // 获取默认值
  }

  onChangeInput = (inputText) => {
    console.log(inputText)
    this.setState({ inputText });
  }

  onShowPanel = () => {
    const list = this.state.userList;
    const selects = this.state.selectUser;
    list.forEach(e => {
      e.select = selects.some(s => s.id == e.id);
    });
    this.chooseRef.show(list, (selectUser) => {
      // console.log(selectUser);
      this.setState({ selectUser });
    });
  }

  onCommit = () => {
    const {selectUser, imgList, inputText} = this.state; 
    console.log(inputText, imgList, selectUser)
  }


  render() {
    const { inputText, selectUser } = this.state;
    return (
      <View style={styles.page}>
        <Header title="知之学吧" />
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            multiline
            maxLength={300}
            value={inputText}
            textAlignVertical='top'
            placeholderTextColor='#979797'
            placeholder="请填写复盘小结以及下一步计划"
            onChangeText={this.onChangeInput} />
          <Text style={styles.inputCount}>{inputText.length}/300</Text>
        </View>
        <View style={styles.upload}>

        </View>
        <View style={styles.linkFlow}>
          {selectUser.map(this.linkView)}
          {selectUser.length > 0 ? <></> : this.linkView({ value: '关联人' })}
        </View>
        
        <TouchableOpacity activeOpacity={0.8} style={styles.footer} onPress={this.onCommit}>
          <Text style={styles.commitBtn}>提交</Text>
        </TouchableOpacity>

        <ChooseUser ref={view => this.chooseRef = view}/>
      </View>
    )
  }

  linkView = (item, index) => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={this.onShowPanel}>
        <Text style={styles.linkBtn}>@{item.value}</Text>
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white'
  },
  inputBox: {
    minHeight: 158,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: '#f3f3f3',
  },
  input: {
    color: '#232323',
    flex: 1,
  },
  inputCount: {
    color: '#979797',
    fontSize: 12,
    textAlign: 'right'
  },
  upload: {
    width: 72,
    height: 72,
    borderRadius: 4,
    backgroundColor: '#F5F5F5',
    marginVertical: 16,
  },
  linkFlow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    gap: 12,
  },
  linkBtn: {
    // width: 75,
    color: '#3478F6',
    fontSize: 14,
    lineHeight: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 2,
    backgroundColor: '#EFF4FD',
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 8
  },
  commitBtn: {
    height: 40,
    lineHeight: 40,
    borderRadius: 4,
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: '#3478F6'
  }
});
