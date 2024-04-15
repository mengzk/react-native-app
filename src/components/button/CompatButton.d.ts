/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc: 全局点击事件包装
 */
import React from 'react';
import {TouchableOpacityProps} from 'react-native';

interface ButProps extends TouchableOpacityProps {
  key?: string | number;
  style?: object;
  /** 埋点事件类型 */
  tag?: string;
  /** 埋点参数 */
  params?: object;
  /** 自动化测试ID */
  testId?: string;
  /** 防重间隔 */
  interval?: number;
  /** 点击效果程度 */
  activeOpacity?: number;
  /** 自组件 */
  children?: React.ReactNode[] | React.ReactNode;
}

// const CompatButton = function (props: Readonly<ButProps>): JSX.Element{return <></>};

declare class CompatButtonBase extends React.Component<ButProps> {}
declare const CompatButton: React.ReactElement<ButProps> & typeof CompatButtonBase;

export default CompatButton;
