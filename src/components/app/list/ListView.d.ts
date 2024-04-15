/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc: 备注输入框带
 */
import React from "react";
import { FlatListProps } from "react-native";

interface ListProps extends FlatListProps<any> {

  hasMore?: boolean;
  noLine?: boolean;
  isInit?: boolean; // 初始化
  emptyIcon?: string;
  emptyText?: string; // 
  onLoad?: Promise<boolean>; // 使用同步函数
  onRefresh?: Promise<boolean>; // 使用同步函数
}

declare class ListViewBase extends React.Component<ListProps> {}
declare const ListView: React.ReactElement<ListProps> & typeof ListViewBase;

export default ListView;
