/**
 * Author: Meng
 * Date: 2022-08-23
 * Desc: 基础组件
 */

import React from "react";

export default class LiveComponent extends React.Component {

  constructor(props) {
    super(props);
    this._liveModel = props.liveModel;

    if (props.liveModel && props.liveModel.onCreate) {
      props.liveModel.onCreate(props);
    }
  }

  componentDidMount() {
    if (this._liveModel && this._liveModel.onLoad) {
      this._liveModel.onLoad();
    }
  }

  // static getDerivedStateFromProps(nextProps, preState) { 
  //   if (this._liveModel && this._liveModel.getStateFromProps) {
  //     this._liveModel.getStateFromProps(nextProps, preState);
  //   }
  //   return null;
  // }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this._liveModel && this._liveModel.shouldUpdate) {
      return this._liveModel.shouldUpdate(nextProps, nextState, nextContext);
    } else {
      return true;
    }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (this._liveModel && this._liveModel.getBeforeUpdate) {
      return this._liveModel.getBeforeUpdate(prevProps, prevState);
    }else {
      return null;
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this._liveModel && this._liveModel.onUpdate) {
      this._liveModel.onUpdate(prevProps, prevState, snapshot);
    }
  }

  componentDidCatch(error, errorInfo) {
    if (this._liveModel && this._liveModel.onCatch) {
      this._liveModel.onCatch(error, errorInfo)
    }
  }

  componentWillUnmount() {
    if (this._liveModel && this._liveModel.onDestroy) {
      this._liveModel.onDestroy();
    }
  }

  render() {
    const children = this.props.children;

    if (typeof children == 'function') {
      // 函数式组件
      return children();
    } else {
      // 类组件
      return children;
    }
  }
}