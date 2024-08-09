/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc:
 */
import React, { useState } from 'react';
import {
  ScrollView,
  ScrollViewProps,
  RefreshControl
} from 'react-native';

// interface Prop<T> extends ScrollViewProps {
//   children: React.ReactElement;
//   onRefresh?: () => void; // 同步函数
// }

const ScrollViewX = (props) => {
  const [refreshing, setRefreshing] = useState(false);

  async function onRefresh() {
    if (!refreshing) {
      setRefreshing(true);
      if (props.onRefresh) {
        await props.onRefresh();
      }
      setRefreshing(false);
    }
  }

  return (
    <ScrollView
      nestedScrollEnabled={true}
      {...props}
      refreshControl={
        props.onRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : null
      }>
      {props.children}
    </ScrollView>
  );
};

export default ScrollViewX;
