/**
 * Create By: Meng
 * Create Date: 2024-08-10
 * Desc: 列表组件
 */
import React, { useState, useEffect } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

// interface Prop<T> extends FlatListProps<T> {
//   showRefresh?: boolean; 
//   separator?: boolean; 
//   inited?: boolean；初始化
//   empty?: {msg: string, icon: NodeRequire; // 图片 -require('./imgs/empty.png')}
//   onLoad?: () => bool; // 使用同步函数
//   onRefresh?: () => bool; // 使用同步函数
// }

const ListView = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  // const hasMore = props.hasMore == null ? false : props.hasMore;
  const showRefresh = props.showRefresh == null ? false : props.showRefresh;

  useEffect(() => { }, [props]);

  // 刷新数据
  async function onRefresh() {
    if (!loading && !refreshing) {
      setRefreshing(true);
      if (props.onRefresh) {
        const more = await props.onRefresh();
        setHasMore(more);
      }
      setRefreshing(false);
    }
  }

  // 加载数据
  async function onLoad() {
    if (hasMore && !loading && !refreshing) {
      setLoading(true);
      if (props.onLoad) {
        const more = await props.onLoad(hasMore);
        setHasMore(more);
      }
      setLoading(false);
    }
  }

  // 头布局
  function HeaderView() {
    if (showRefresh && refreshing) {
      if (props.ListHeaderComponent == null) {
        return <DefHeaderView />;
      }
    }
    return <></>;
  }

  // 底部布局
  function FooterView() {
    if (loading) {
      if (props.ListFooterComponent == null) {
        return <DefFooterView />;
      }
    } else if (!hasMore && (props.data && props.data.length > 0)) {
      return <NoMoreView />;
    }
    return <></>;
  }
  // 空视图
  function EmptyView() {
    if (!loading && !refreshing) {
      if (props.inited && props.ListEmptyComponent == null) {
        const empty = props.empty || {};
        return <DefEmptyView icon={empty.icon} msg={empty.msg} />;
      }
    }
    return <></>;
  }

  // 分割线
  function SeparatorView() {
    const separator = props.separator || false;
    if (separator && props.ItemSeparatorComponent == null) {
      return <View style={styles.line} />;
    }
    return null;
  }

  return (
    <FlatList
      onEndReachedThreshold={0.1}
      ListEmptyComponent={<EmptyView />}
      ListFooterComponent={<FooterView />}
      ListHeaderComponent={<HeaderView />}
      // ItemSeparatorComponent={<SeparatorView />}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item && item.id}
      {...props}
      onEndReached={onLoad}
      refreshing={showRefresh && refreshing}
      refreshControl={
        <RefreshControl refreshing={showRefresh && refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

function DefEmptyView({ icon, msg }) {
  return (
    <View style={styles.emptyBox}>
      {icon ? <Image style={styles.img} source={icon} /> : <></>}
      <Text style={styles.hintText}>{msg || '空空如空是'}</Text>
    </View>
  );
}

function DefFooterView() {
  return (
    <View style={styles.hintBox}>
      <Text style={styles.hintText}>努力加载中...</Text>
    </View>
  );
}

function NoMoreView() {
  return (
    <View style={styles.hintBox}>
      <Text style={styles.hintText}>-- 没有更多了 --</Text>
    </View>
  );
}

function DefHeaderView() {
  return (
    <View style={styles.hintBox}>
      <Text style={styles.hintText}>努力加载中...</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: '#E3E3E3',
  },
  hintBox: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintText: {
    color: '#878787',
    fontSize: 14,
  },
  emptyBox: {
    marginTop: 24,
    alignItems: 'center'
  },
  img: {
    width: 144,
    height: 144,
    marginBottom: 8
  }
});

export default ListView;
