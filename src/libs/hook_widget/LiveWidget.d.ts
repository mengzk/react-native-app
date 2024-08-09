/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc:
 */
import React from "react";
import LiveData from "./LiveData";

interface LiveWidgetProps<T> {
  data: LiveData<T>;
  child: Array<React.ReactNode> | React.ReactNode;
}

declare class LiveWidget<T> extends React.Component<LiveWidgetProps<T>> {}

// declare const LiveWidget: React.ReactElement<LiveWidgetProps> & typeof LiveWidgetBase;
export default LiveWidget;
