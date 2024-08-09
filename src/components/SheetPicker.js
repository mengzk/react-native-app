/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 
 * 废弃使用(OneSheetPicker)  -ActionSheet鸡肋。。。
 */
import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
// Props {
//   title: string; // camera拍照；photo相册；all拍照-相册 默认
//   items: string[];
//   onPress?: (imgs) => {};
// }

function SheetPicker(props) {

  const pickerSheet = useRef(null); // 弹窗组件ref

  let items = (props.items || []).concat(['取消']);
  useEffect(() => onShow(), [props.items]);

  // 显示
  function onShow() {
    if (pickerSheet.current) {
      pickerSheet.current.show();
    }
  }

  // 选择
  function handlePress(index) {
    if (props.onPress) {
      props.onPress(index);
    }
  }

  // 跟组件
  return (
    <View/>
  )
}

export default SheetPicker;
