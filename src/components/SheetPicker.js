/**
 * Author: Meng
 * Date: 2023-03-27
 * Desc: 
 * 废弃使用(OneSheetPicker)  -ActionSheet鸡肋。。。
 */
import React, { useEffect, useRef } from 'react';
import ActionSheet from 'react-native-actionsheet';
// Props {
//   title: string; // camera拍照；photo相册；all拍照-相册 默认
//   items: string[];
//   onPress?: (imgs) => {};
// }

const SheetPicker = (props) => {

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
    <ActionSheet
      ref={pickerSheet}
      title={props.title || '请选择'}
      options={items}
      cancelButtonIndex={items.length - 1}
      onPress={handlePress}
    />
  )
}

export default SheetPicker;
