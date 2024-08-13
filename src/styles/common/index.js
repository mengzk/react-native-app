/**
 * Author: Meng
 * Date: 2024-08-12
 * Modify: 2024-08-12
 * Desc: 通用样式导出文件
 */
import {StyleSheet} from 'react-native';

const ComStyle = StyleSheet.create({
  header: {
    height: 50,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3',
    backgroundColor: 'white',
  },
  headerBtn: {
    width: 56,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerMenu: {
    fontSize: 14,
    color: '#232323',
  },
  headerTitle: {
    // 可以绝对布局居中
    fontSize: 18,
    color: '#232323',
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#232323',
  },
});

export default ComStyle;
