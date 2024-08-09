/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 备注输入框带
 */
import React from "react";
import { TextInputProps } from "react-native";


interface MemoProps extends TextInputProps {
  /** 输入框样式 */
  inputStyle?: object;
  /** 输入框高度 */
  height?: number;
}

declare class MemoInputBase extends React.Component<MemoProps> {}
declare const MemoInput: React.ReactElement<MemoProps> & typeof MemoInputBase;

export default MemoInput;
