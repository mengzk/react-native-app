/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc: 备注输入框带
 */
import React from 'react';
import {ViewProps} from 'react-native';

enum ThemeMode {
  dark = 'dark-content',
  light = 'light-content',
}

interface RightBtn {
  icon?: NodeRequire | string;
  name?: string;
  onPress: () => void;
}

interface HeaderProps extends ViewProps {
  title?: string; // 标题
  titleStyle?: string; // 标题字体样式
  // barColor?: string; // 状态栏背景色
  barTheme?: ThemeMode; // dark/light 状态栏字体(黑/白)
  translucent?: boolean; // 是否悬浮状态栏-
  backgroundColor?: string; // 标题栏背景
  rightBtns?: Array<RightBtn>; // 右边菜单栏操作键
  leftIcon: string;
  left?: React.ReactElement; // 自定义返回键
  onBack?: () => void; // 返回键操作
}

declare class HeaderBase extends React.Component<HeaderProps> {}
declare const Header: React.ReactElement<HeaderProps> & typeof HeaderBase;

export default Header;
