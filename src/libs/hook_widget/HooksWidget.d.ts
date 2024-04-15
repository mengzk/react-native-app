/**
 * Author: Meng
 * Date: 2022-08-23
 * Desc:
 */
import React from "react";
import LiveData from "./LiveData";

interface HooksWidgetProps<T> {
  data: LiveData<T>;
  child: React.ReactElement | React.DetailedHTMLProps<any, T>;
}

declare class HooksWidget<T> extends React.Component<HooksWidgetProps<T>> {}

// declare const HooksWidget: React.ReactElement<HooksWidgetProps> & typeof HooksWidgetBase;
export default HooksWidget;
