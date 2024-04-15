/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc: 备注输入框带
 */
import React from "react";
import { FlatListProps } from "react-native";

interface ListProps<ItemT = any> extends FlatListProps<ItemT> {
  hasMore?: boolean;
  noLine?: boolean;
  isInit?: boolean; // 初始化
  emptyIcon?: string;
  emptyText?: string; // 
  onLoadMore?: Promise<boolean>; // 使用同步函数
  onPullToRefresh?: Promise<boolean>; // 使用同步函数
}

declare class ListViewBase extends React.Component<ListProps<any>> {}
declare const ListView: React.ReactElement<ListProps<any>> & typeof ListViewBase;

export default ListView;
