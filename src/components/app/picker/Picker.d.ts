/**
 * Author: Meng
 * Date: 2023-03-23
 * Desc: 选择框
 */
import React from "react";
import { TextInputProps } from "react-native";

interface PickerProps extends TextInputProps {
  /** 标题 */
  title?: string;
  /** 取值字段，当数组值为对象可用 */
  label?: string;
  /** 默认选择第几项 */
  index?: number;
  /** 数据源 */
  items: Array<string|any>;
  /** 回调函数 */
  onPress: (item: any, number: index) => void;
}

declare class PickerBase extends React.Component<PickerProps> {}
declare const Picker: React.ReactElement<PickerProps> & typeof PickerBase;

export default Picker;
