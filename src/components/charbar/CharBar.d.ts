/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc: 备注输入框带
 */
import React from 'react';
import {ViewProps} from 'react-native';

interface CharBarProps extends ViewProps {
  index?: number;
  duration?: number;
  /** 回调函数 */
  onChange?: (index: number) => void;
}

declare class CharBarBase extends React.Component<CharBarProps> {}
declare const CharBar: React.ReactElement<CharBarProps> & typeof CharBarBase;

export default CharBar;
