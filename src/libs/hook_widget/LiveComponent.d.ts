/**
 * Author: Meng
 * Date: 2022-08-23
 * Desc: 基础组件
 */

import React from "react";
import LiveModel from "./LiveModel";

interface LiveComponentProps {
  liveModel: LiveModel;
  children:
    | React.ReactNode[]
    | React.ReactNode
    | React.DetailedHTMLProps<any, any>[]
    | React.DetailedHTMLProps<any, any>;
}

declare class LiveComponent extends React.Component<LiveComponentProps> {}

export default LiveComponent;
