/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc:
 */
import React, { PureComponent } from 'react';

export default class AppComponent extends PureComponent {
  render() {
    const children = this.props.children || null;
    if (typeof children == 'function') {
      return children();
    } else {
      return { children }
    }
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
