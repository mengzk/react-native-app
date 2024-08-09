/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 基础组件
 */

import React from "react";
import LiveModel from "./LiveModel";

interface LiveComponentProps {
  liveModel: LiveModel;
  children?: Array<React.ReactNode> | React.ReactNode;
  render?: (model: LiveModel) => Array<React.ReactNode> | React.ReactNode;
}

declare class LiveComponent extends React.Component<LiveComponentProps> {}

export default LiveComponent;
