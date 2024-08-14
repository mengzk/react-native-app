/**
 * Author: Meng
 * Date: 2024-08-12
 * Modify: 2024-08-12
 * Desc: 定位
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

class Location {

  /**
   * 获取当前定位信息
   */
  static getCurLocation() {

  }

  /**
   * 获取定位信息
   */
  static getLocation() {
    return AsyncStorage.getItem('location');
  }

  /**
   * 设置定位信息
   * @param {*} account 
   */
  static setLocation(account) {
    return AsyncStorage.setItem('location', account);
  }

  /**
   * 清空定位数据
   */
  static remove() {
    return AsyncStorage.removeItem('location');
  }
}

export default Location;