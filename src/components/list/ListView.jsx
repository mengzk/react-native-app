/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc:
 */
import React, {useState, useEffect} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

const ListView = props => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const hasMore = props.hasMore == null ? true : props.hasMore;

  useEffect(() => {}, [props])

  // 刷新数据
  async function onRefresh() {
    if (!loading && !refreshing) {
      setRefreshing(true);
      if (props.onRefresh) {
        await props.onRefresh();
      }
      setRefreshing(false);
    }
  }

  // 加载数据
  async function onLoad() {
    if (hasMore && !loading && !refreshing) {
      setLoading(true);
      if (props.onLoad) {
        await props.onLoad();
      }
      setLoading(false);
    }
  }

  function getEmptyView() {
    if (props.ListEmptyComponent) {
      return props.ListEmptyComponent();
    } else {
      return <EmptyView text={props.emptyText}/>;
    }
  }

  function getFooterView() {
    const isMore = hasMore || (props.data && props.data.length < 1);
    return loading ? (
      <FooterView />
    ) : isMore ? (
      <View style={styles.hintBox} />
    ) : (
      <NoMoreView />
    );
  }

  const isEmpty = loading || refreshing || !props.isInit;
  return (
    <FlatList
      ListEmptyComponent={isEmpty && getEmptyView()}
      ListFooterComponent={getFooterView()}
      ListHeaderComponent={refreshing ? <HeaderView /> : null}
      ItemSeparatorComponent={() => SeparatorView(props.noLine)}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReachedThreshold={0.1}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => item.id || index}
      {...props}
      onEndReached={onLoad}
      refreshing={refreshing}
    />
  );
};

function EmptyView(props) {
  return (
    <View style={styles.emptyBox}>
      <Image style={styles.img} source={props.emptyIcon} />
      <Text style={styles.hintText}>{props.emptyText || '空空如空'}</Text>
    </View>
  );
}

function FooterView() {
  return (
    <View style={styles.hintBox}>
      <Text style={styles.hintText}>努力加载中...</Text>
    </View>
  );
}

function NoMoreView() {
  return (
    <View style={styles.hintBox}>
      <Text style={styles.hintText}>--没有更多了--</Text>
    </View>
  );
}

function HeaderView() {
  return (
    <View style={styles.hintBox}>
      <Text style={styles.hintText}>努力加载中...</Text>
    </View>
  );
}

function SeparatorView(noLine) {
  if (noLine) {
    return <></>;
  }
  return <View style={styles.line} />;
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
    alignItems: 'center',
  },
  img: {
    width: 144,
    height: 144,
    marginBottom: 8,
  },
});

// columnWrapperStyle 如果设置了多列布局（即将numColumns值设为大于 1 的整数），则可以额外指定此样式作用在每行容器上
// extraData# 如果有除data以外的数据用在列表中（不论是用在renderItem还是头部或者尾部组件中），请在此属性中指定。同时此数据在修改时也需要先修改其引用地址（比如先复制到一个新的 Object 或者数组中），然后再修改其值，否则界面很可能不会刷新
// getItemLayout# 是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度,注意如果你指定了ItemSeparatorComponent，请把分隔线的尺寸也考虑到 offset 的计算之中
/** 行高是固定的用例
    getItemLayout={(data, index) => (
      {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
    )}
 */
// initialScrollIndex 开始时屏幕顶端的元素是列表中的第 initialScrollIndex个元素, 而不是第一个元素。如果设置了这个属性，则第一批initialNumToRender范围内的元素不会再保留在内存里，而是直接立刻渲染位于 initialScrollIndex 位置的元素
// scrollToIndex 0屏幕顶部，1屏幕底部，如果不设置getItemLayout属性的话，无法跳转到当前渲染区域以外的位置
// scrollToOffset 滚动列表到指定的偏移（以像素为单位），等同于ScrollView的scrollTo方法

export default ListView;
